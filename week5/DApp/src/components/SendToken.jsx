import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, SystemProgram, PublicKey } from '@solana/web3.js'
import { useState } from 'react'

export function SendToken() {
    const wallet = useWallet();
    const { connection } = useConnection();

    const [loading, setLoading] = useState(false);

    async function sendToken() {
        try {
            setLoading(true);
            const recipientAdd = document.getElementById("toSend").value.trim();
            const amount = document.getElementById("amount").value.trim();

            if (!recipientAdd || !amount) {
                alert("All fields are required!");
                return;
            }

            const transaction = new Transaction();

            transaction.add(
                SystemProgram.transfer({
                    toPubkey: new PublicKey(recipientAdd),
                    fromPubkey: wallet.publicKey,
                    lamports: parseFloat(amount) * 1e9, // convert SOL to lamports
                })
            );

            //show the pop-up modal in the wallet
            await wallet.sendTransaction(transaction, connection);

            alert("Token has been sent!");
        } catch (error) {
            console.error(error);
            alert("Transaction failed: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-700 p-6 mt-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center text-blue-400">Send SOL</h2>

            <input
                id="toSend"
                type="text"
                placeholder="Recipient address"
                className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
                id="amount"
                type="number"
                placeholder="Amount (SOL)"
                className="w-full px-4 py-2 rounded-xl bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
                onClick={sendToken}
                disabled={loading}
                className={`w-full py-2 rounded-xl font-semibold text-white shadow-md transition 
                ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
                {loading ? "Sending..." : "Send SOL"}
            </button>
        </div>
    )
}
