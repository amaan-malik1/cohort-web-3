import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";


function Airdrop() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const airdropInput = useRef();
    const [loading, setLoading] = useState(false);

    const handleAirdrop = async () => {
        if (!wallet.publicKey) {
            toast.error("Please connect your wallet first!");
            return;
        }

        const value = airdropInput.current.value;
        if (!value || value <= 0) {
            toast.error("Enter a valid SOL amount!");
            return;
        }

        try {
            setLoading(true);
            const publicKey = wallet.publicKey;
            const res = await connection.requestAirdrop(
                publicKey,
                value * 1000000000
            );
            // console.log(res);
            toast.success(`Airdrop requested! Tx: ${res.slice(0, 10)}...`);
            
        } catch (err) {
            console.error(err);
            toast.error("Airdrop failed. Try again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="w-full bg-gray-900 rounded-xl shadow-lg p-5 sm:p-6 flex flex-col gap-5 border border-gray-700">

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-400">
                    Solana Devnet Airdrop
                </h2>

                {/* Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-400">Enter SOL amount</label>
                    <input
                        type="number"
                        ref={airdropInput}
                        placeholder="e.g. 1"
                        className="px-3 sm:px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 w-full"
                        min="0.01"
                        step="0.01"
                    />
                </div>

                {/* Button */}
                <button
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-lg font-medium shadow-md transition-colors 
                        ${loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-yellow-400"
                        }`}

                    onClick={handleAirdrop}
                >
                    {loading ? "Requesting..." : "Get Airdrop"}
                </button>


            </div>

            {/* sign messaage */}

        </div>
    );
}

export default Airdrop;
