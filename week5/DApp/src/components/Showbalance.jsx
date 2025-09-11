import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


function ShowBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();


    async function getBalance() {
        if (wallet.publicKey) {
            const balance = await connection.getBalance(wallet.publicKey);
            document.getElementById("getBalance").innerHTML = balance / LAMPORTS_PER_SOL + " SOL";
        }
    }
    getBalance();

    return (
        <div>
            Your Balance:
            <div id="getBalance"></div>
        </div>
    )
}

export default ShowBalance;