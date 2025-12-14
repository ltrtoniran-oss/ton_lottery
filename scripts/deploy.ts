import { getHttpEndpoint } from '@orbs-network/ton-access';
import { mnemonicToWalletKey } from '@ton/crypto';
import { TonClient, WalletContractV4, toNano } from '@ton/ton';
import { Lottery } from '../build/lottery/lottery_Lottery';
import dotenv from 'dotenv';

dotenv.config();

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

    if (!await client.isContractDeployed(wallet.address)) {
        console.log("Wallet not deployed or unfunded:", wallet.address.toString());
        console.log("Please fund it via Testnet Faucet.");
        // proceed anyway? No, need seqno
    }

    const balance = await client.getBalance(wallet.address);
    console.log("Wallet Balance:", balance);

    // Deploy
    const lottery = await Lottery.fromInit(wallet.address);
    console.log("Lottery Address:", lottery.address.toString());

    // contract wrapper
    const contract = client.open(lottery);

    console.log("Deploying contract to address:", lottery.address.toString());

    // NOTE: Lottery contract does NOT have getSeqno, so we skip that check for the lottery itself.
    // We only check wallet seqno to confirm transaction sending.
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
