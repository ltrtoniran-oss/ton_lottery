import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from '@ton/crypto';
import { WalletContractV4, TonClient, Address, toNano } from '@ton/ton';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const LOTTERY_ADDRESS = 'EQDck5ZMLoOaN2qkHLfNBodcKRAYClRYTKT2mMPa-dp887uD'; // Mainnet Address

async function main() {
    const mnemonic = process.env.TON_MNEMONIC;
    if (!mnemonic) {
        console.error('Error: TON_MNEMONIC not found');
        process.exit(1);
    }

    const network = process.env.NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
    console.log(`Triggering draw on ${network.toUpperCase()}...`);

    const key = await mnemonicToWalletKey(mnemonic.split(' '));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    const endpoint = await getHttpEndpoint({ network });
    const client = new TonClient({ endpoint });

    // Check balance
    const balance = await client.getBalance(wallet.address);
    if (balance < toNano('0.1')) {
        console.error("Insufficient balance to trigger draw.");
        return;
    }

    // Send Draw Message
    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    await walletContract.sendTransfer({
        secretKey: key.secretKey,
        seqno: seqno,
        messages: [
            {
                address: Address.parse(LOTTERY_ADDRESS),
                amount: toNano('0.05'), // Small fee for gas
                payload: 'draw', // Text message payload
                bounce: true
            }
        ]
    });

    console.log("Draw transaction sent!");
    console.log("Check explorer: https://tonviewer.com/" + LOTTERY_ADDRESS);
}

main();
