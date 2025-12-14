import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from '@ton/crypto';
import { TonClient, WalletContractV4, toNano, Address } from '@ton/ton';
import { Lottery } from '../build/lottery/lottery_Lottery';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Address from deployment
// Address from deployment
const LOTTERY_ADDRESS = 'EQBG41X_XYSc_pev3Ol4qXqTmaleD3m3jwmO5xRMy7zI1eT8';

async function main() {
    console.log(`Checking Draw status for ${LOTTERY_ADDRESS}...`);

    const mnemonic = process.env.TON_MNEMONIC;
    if (!mnemonic) {
        throw new Error('TON_MNEMONIC not found');
    }

    const network = (process.env.TON_NETWORK === 'mainnet') ? 'mainnet' : 'testnet';
    console.log(`Network: ${network}`);

    const key = await mnemonicToWalletKey(mnemonic.split(' '));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    const endpoint = await getHttpEndpoint({ network });
    const client = new TonClient({ endpoint });

    if (await client.getBalance(wallet.address) === 0n) {
        console.log("Wallet empty!");
        return;
    }

    // Initialize contract
    const lotteryAddress = Address.parse(LOTTERY_ADDRESS);
    const lottery = client.open(Lottery.fromAddress(lotteryAddress));

    try {
        const endTime = await lottery.getParams();
        const now = BigInt(Math.floor(Date.now() / 1000));

        console.log(`Current Time: ${now}`);
        console.log(`Draw Time:    ${endTime}`);

        if (now >= endTime) {
            console.log(">>> Draw is eligible! Attempting to trigger draw...");

            const walletContract = client.open(wallet);
            const seqno = await walletContract.getSeqno();

            await lottery.send(
                walletContract.sender(key.secretKey),
                {
                    value: toNano('0.05'),
                },
                'draw'
            );

            console.log("Draw transaction sent! Waiting for confirmation...");

            let currentSeqno = seqno;
            while (currentSeqno === seqno) {
                console.log("Waiting...");
                await new Promise(r => setTimeout(r, 1500));
                currentSeqno = await walletContract.getSeqno();
            }
            console.log("Transaction confirmed.");
        } else {
            console.log(">>> Draw is NOT eligible yet.");
            const diff = Number(endTime - now);
            console.log(`Wait ${Math.floor(diff / 60)} minutes (${diff} seconds).`);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

main().catch(console.error);
