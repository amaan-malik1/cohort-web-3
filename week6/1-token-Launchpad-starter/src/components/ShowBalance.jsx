import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

function ShowBalance() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(null);


    useEffect(() => {
        async function fetchBalance() {
            if (wallet.publicKey) {
                const lamports = await connection.getBalance(wallet.publicKey);
                setBalance((lamports / LAMPORTS_PER_SOL));
            } else {
                setBalance(null); // reset if wallet disconnected
            }
        }
        fetchBalance();
    }, [wallet.publicKey, connection]);

    return (

        <div>
            <div className="text-yellow-300" id="getBalance">
                {balance !== null ? `${balance} SOL` : "wallet not connected"}
            </div>
        </div>
    )
}
export default ShowBalance;