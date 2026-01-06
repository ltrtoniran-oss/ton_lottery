import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from '@ton/crypto';
import { WalletContractV4, WalletContractV3R2, WalletContractV5R1, TonClient, fromNano } from '@ton/ton';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

async function main() {
    const mnemonic = process.env.TON_MNEMONIC;
    if (!mnemonic) {
        console.log("No TON_MNEMONIC found.");
        return;
    }
    console.log(mnemonic);

    const key = await mnemonicToWalletKey(mnemonic.split(' '));

    // Check v4R2 (Standard)
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

    const network = process.env.NETWORK === 'mainnet' ? 'mainnet' : 'testnet';
    const endpoint = await getHttpEndpoint({ network });
    const client = new TonClient({ endpoint });

    const balance = await client.getBalance(wallet.address);
    console.log("Checking balance for V4R2...");
    console.log(`Address: ${wallet.address.toString({ testOnly: network === 'testnet' })}`);
    console.log(`Balance: ${fromNano(balance)} TON`);
}

main();
