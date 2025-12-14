import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from '@ton/crypto';
import { TonClient, WalletContractV4, toNano } from '@ton/ton';
import { Lottery } from '../build/lottery/lottery_Lottery';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function main() {
    const mnemonic = process.env.TON_MNEMONIC;
    if (!mnemonic) {
        console.error('Error: TON_MNEMONIC not found in .env');
        process.exit(1);
    }

    const key = await mnemonicToWalletKey(mnemonic.split(' '));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    const endpoint = await getHttpEndpoint({ network: 'testnet' });
    const client = new TonClient({ endpoint });
    const balance = await client.getBalance(wallet.address);
    if (balance === 0n) {
        console.log("----------------------------------------------------------------");
        console.log("Wallet has 0 balance:", wallet.address.toString());
        console.log("Please fund it via Testnet Faucet: https://t.me/testgiver_ton_bot");
        console.log("----------------------------------------------------------------");
        process.exit(1);
    }
    console.log("Wallet Balance:", balance);

    // Deploy
    const lottery = await Lottery.fromInit(wallet.address);
    const contract = client.open(lottery);

    console.log("Deploying contract to ID:", lottery.address.toString());

    // const seqno = await contract.getSeqno(); // Lottery doesn't have seqno
    const walletContract = client.open(wallet);
    const walletSeqno = await walletContract.getSeqno();

    await contract.send(
        walletContract.sender(key.secretKey),
        {
            value: toNano('0.05'),
            bounce: false,
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    console.log("Deploy transaction sent. Waiting for deployment...");

    // polling
    let currentSeqno = walletSeqno;
    while (currentSeqno === walletSeqno) {
        console.log("Waiting for confirm...");
        await new Promise(r => setTimeout(r, 1500));
        currentSeqno = await walletContract.getSeqno();
    }

    console.log("Deployed Successfully!");
    console.log("Address:", lottery.address.toString());
}

main().catch(console.error);
