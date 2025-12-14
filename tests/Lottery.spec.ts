import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Lottery } from '../build/lottery/lottery_Lottery';
import '@ton/test-utils';

describe('Lottery', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let lottery: SandboxContract<Lottery>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');

        lottery = blockchain.openContract(await Lottery.fromInit(deployer.address));

        const deployResult = await lottery.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lottery.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and lottery are ready to use
    });

    it('should accept buy ticket', async () => {
        const player = await blockchain.treasury('player');
        const buyResult = await lottery.send(
            player.getSender(),
            {
                value: toNano('1.1'), // ticket price is 1 TON, + gas
            },
            'buy'
        );

        expect(buyResult.transactions).toHaveTransaction({
            from: player.address,
            to: lottery.address,
            success: true,
        });

        // Check ticket count
        const count = await lottery.getUserTickets(player.address);
        expect(count).toBe(1n);
    });

    it('should draw winner after time passes', async () => {
        const player1 = await blockchain.treasury('player1');
        const player2 = await blockchain.treasury('player2');
        const player3 = await blockchain.treasury('player3');

        await lottery.send(player1.getSender(), { value: toNano('1.1') }, 'buy');
        await lottery.send(player2.getSender(), { value: toNano('1.1') }, 'buy');
        await lottery.send(player3.getSender(), { value: toNano('1.1') }, 'buy');

        // Increase time
        const params = await lottery.getParams();
        const endTime = params;

        // Force time forward
        blockchain.now = Number(endTime) + 1200; // +20 mins

        const drawResult = await lottery.send(
            deployer.getSender(),
            { value: toNano('0.1') },
            'draw'
        );

        expect(drawResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lottery.address,
            success: true,
        });

        // One of the players should have received funds 
        // We check if lottery balance decreased.
        const lotteryBalance = await lottery.getBalance();
        expect(lotteryBalance).toBeLessThan(toNano('0.5'));
    });

});
