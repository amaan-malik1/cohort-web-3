import { ExtensionType, getMinimumBalanceForRentExemptMint, getMintLen, LENGTH_SIZE, TYPE_SIZE } from '@solana/spl-token'
import { createInitializeMint2Instruction, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";


function TokenLaunchpad() {
    const wallet = useWallet();

    async function createToken() {
        const tokenName = document.getElementById("tokenName").value;
        const symbol = document.getElementById("symbol").value;
        const supply = document.getElementById("supply").value;
        const imgUrl = document.getElementById("imgUrl").value;
        console.log(tokenName, symbol, supply, imgUrl);

        const connection = new Connection(import.meta.env.VITE_SOLANA_RPC)

        //generating keypair for the account that will hold the token
        const mintKeypair = Keypair.generate();

        //definiing the meatdata
        const metadata = {
            mint: mintKeypair.publicKey,
            name: tokenName,
            symbol: symbol,
            uri: imgUrl,
            addtionalmetadata: [],
        };

        //get the mintLength
        // const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        // const metaDataLen = TYPE_SIZE + LENGTH_SIZE + pac(metadata).length;



        //connect to solana devnet
        const lamports = await getMinimumBalanceForRentExemptMint(connection);

        //create transaction
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),

            createInitializeMint2Instruction(mintKeypair.publicKey, 9, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
        );


        // TODO: what these cmds do?
        transaction.feePayer = wallet.publicKey;
        const recentBlockhash = await connection.getRecentBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;

        //sign transaction with keypair and  here the keypair value is that we have generated in the createToken function
        transaction.partialSign(mintKeypair);



        //pop-up modal for sign transaction
        await wallet.sendTransaction(transaction, connection);

        ///printing the hash that has been generated 
        // console.log(res);

    }
    return (
        <div
            className="flex justify-center items-center flex-col h-screen w-screen">
            <div
                className="text-center">
                <h1
                    className="text-4xl font-bold mb-4">Welcome to the Token Launchpad</h1>
                <p
                    className="text-lg mb-8">Create and manage your own tokens on the Solana blockchain.</p>
            </div>
            <div
                className="flex flex-col space-y-4 w-1/3">
                <input
                    id="tokenName"
                    type="text"
                    required
                    placeholder="Token Name"
                    className="px-2 py-4 border border-gray-300 bg-gray-950 rounded" />
                <input
                    id="symbol"
                    type="text"
                    required
                    placeholder="Token Symbol: BTC, ETH, SOL, etc"
                    className="px-2 py-4 border border-gray-300 bg-gray-950 rounded" />
                <input
                    id="supply"
                    type="text"
                    required
                    placeholder="Total Supply"
                    className="px-2 py-4 border border-gray-300 bg-gray-950 rounded" />
                <input
                    id="imgUrl"
                    type="url"
                    required
                    placeholder="Image `URL`"
                    className="px-2 py-4 border border-gray-300 bg-gray-950 rounded" />
                <div className="flex justify-center items-center">
                    <button
                        onClick={createToken}
                        className="bg-gray-900  text-white py-2 px-4 rounded 
                    transition-transform duration-150 ease-in-out
                    hover:bg-gray-800 active:scale-90"
                    >
                        Create Token
                    </button>
                </div>
            </div>
        </div>
    )
}
export default TokenLaunchpad;