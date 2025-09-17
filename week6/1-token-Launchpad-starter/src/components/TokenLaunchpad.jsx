import {
    createAssociatedTokenAccountInstruction,
    createInitializeInstruction,
    createInitializeMetadataPointerInstruction,
    createMintToInstruction,
    ExtensionType,
    getAssociatedTokenAddress,
    getMintLen,
    LENGTH_SIZE,
    TOKEN_2022_PROGRAM_ID,
    TYPE_SIZE
} from '@solana/spl-token'
import { createInitializeMintInstruction } from "@solana/spl-token";
import { Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { pack } from "@solana/spl-token-metadata";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';



function TokenLaunchpad() {
    const wallet = useWallet();

    const [mintAddress, setMintAddress] = useState();
    const [associatedTokenAddress, setAssociatedTokenAddress] = useState();

    async function createToken() {
        const tokenName = document.getElementById("tokenName").value;
        const symbol = document.getElementById("symbol").value;
        const supply = document.getElementById("supply").value;
        const imgUrl = document.getElementById("imgUrl").value;
        if (!tokenName || !symbol || !supply || !imgUrl) {
            toast("Please fill all the fields");
            return;
        }
        // console.log(tokenName, symbol, supply, imgUrl);

        try {
            const connection = new Connection(import.meta.env.VITE_SOLANA_RPC)

            // generating keypair for the account that will hold the token
            const mintKeypair = Keypair.generate();

            // defining the metadata
            const metadata = {
                mint: mintKeypair.publicKey,
                name: tokenName,
                symbol: symbol,
                uri: imgUrl,
                additionalMetadata: [],
            };

            // get the mintLength
            const mintLen = getMintLen([ExtensionType.MetadataPointer]);
            const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).byteLength;

            // connect to solana devnet
            const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

            // create transaction
            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    space: mintLen,
                    lamports,
                    programId: TOKEN_2022_PROGRAM_ID,
                }),

                // initialize meta data pointer
                createInitializeMetadataPointerInstruction(
                    mintKeypair.publicKey,
                    wallet.publicKey,
                    mintKeypair.publicKey,
                    TOKEN_2022_PROGRAM_ID
                ),

                // initialize the mint instructions
                createInitializeMintInstruction(
                    mintKeypair.publicKey,
                    9,
                    wallet.publicKey,
                    wallet.publicKey,
                    TOKEN_2022_PROGRAM_ID
                ),

                createInitializeInstruction({
                    programId: TOKEN_2022_PROGRAM_ID,
                    mint: mintKeypair.publicKey,
                    metadata: mintKeypair.publicKey,
                    name: metadata.name,
                    symbol: metadata.symbol,
                    uri: metadata.uri,
                    mintAuthority: wallet.publicKey,
                    updateAuthority: wallet.publicKey,
                }),
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            transaction.partialSign(mintKeypair);

            await wallet.sendTransaction(transaction, connection);

            // console.log(`Mint created at ${mintKeypair.publicKey.toBase58()}`);

            // associated account token
            const associatedToken = await getAssociatedTokenAddress(
                mintKeypair.publicKey,
                wallet.publicKey,
                false,
                TOKEN_2022_PROGRAM_ID
            );
            // console.log(`Associated token: ${associatedToken.toBase58()}`);

            const transaction2 = new Transaction().add(
                createAssociatedTokenAccountInstruction(
                    wallet.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    mintKeypair.publicKey,
                    TOKEN_2022_PROGRAM_ID
                ),
            );
            await wallet.sendTransaction(transaction2, connection);

            // third transaction
            const transaction3 = new Transaction().add(
                createMintToInstruction(
                    mintKeypair.publicKey,
                    associatedToken,
                    wallet.publicKey,
                    10000000000,
                    [],
                    TOKEN_2022_PROGRAM_ID
                ),
            );
            await wallet.sendTransaction(transaction3, connection);
            // console.log("Token minted!");

            const mintAdd = mintKeypair.publicKey.toBase58();
            const createdTokenAdd = associatedToken.toBase58();

            setMintAddress(mintAdd);
            setAssociatedTokenAddress(createdTokenAdd);

            toast.success(`✅ Mint address: ${mintAdd}`);
            toast.success(`📌 Token address: ${createdTokenAdd}`);

        } catch (err) {
            console.error("❌ Error creating token:", err);
            toast.error("Transaction failed. Check console for details.");
        }
    }

    return (
        <div className="flex justify-center items-center flex-col h-screen w-screen">
            {mintAddress && associatedTokenAddress && (
                <div className="mt-6 text-center">
                    <p className="text-green-400">✅ Mint Address: {mintAddress}</p>
                    <p className="text-blue-400">📌 Token Address: {associatedTokenAddress}</p>
                </div>
            )}
            {/* ✅ Required Toaster */}
            <Toaster position="top-right" />

            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to the Token Launchpad</h1>
                <p className="text-lg mb-8">Create and manage your own tokens on the Solana blockchain.</p>
            </div>
            <div className="flex flex-col space-y-4 w-1/3">
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
                    value={"10000000"}
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
