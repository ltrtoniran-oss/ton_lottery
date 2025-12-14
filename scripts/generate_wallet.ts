import { mnemonicNew } from '@ton/crypto';

async function main() {
    const mnemonic = await mnemonicNew(24);
    console.log("Here is your new Testnet Wallet Mnemonic:");
    console.log("----------------------------------------------------------------");
    console.log(mnemonic.join(" "));
    console.log("----------------------------------------------------------------");
    console.log("IMPORTANT: Save this to your .env file as TON_MNEMONIC.");
    console.log("Next step: Use a TON Testnet Faucet to get some test TON.");
    console.log("Faucet Bot: @testgiver_ton_bot on Telegram");
}

main();
