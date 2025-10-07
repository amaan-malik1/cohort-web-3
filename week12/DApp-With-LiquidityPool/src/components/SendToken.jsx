import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction } from "@solana/web3.js";
import { useRef, useState } from "react";

function SendToken() {
    const addRef = useRef();
    const amountRef = useRef();
    const wallet = useWallet();
    const {connection} = useConnection()


    async function handleSentToken() {
        const recipientAdd = addRef.current.value;
        const amount = amountRef.current.value;

        if (!recipientAdd || !amount) {
            return alert("All fields are required!");
        }
        try {
            const transation = new Transaction();

            transation.add(
                SystemProgram.transfer({
                    toPubkey: recipientAdd,
                    fromPubkey: wallet.publicKey,
                    lamports: amount * 1000000000
                })
            );

            await wallet.sendTransaction(transation, connection);

            alert(`Successfully sent ${amount}SOL at ${recipientAdd} address`);
        } catch (error) {
            console.log("Error while sending: ", error);
        }
    }



    return (
        <div className="bg-red-100 mx-auto my-4 p-10">

            <Balance />
            <input
                className="border-2 border-black px-2 py-3 m-2 bg-red-100 rounded-md"
                ref={addRef} type="text" placeholder="Recipient Add..." />
            <input
                className="border-2 border-black px-2 py-3 m-2 bg-red-100 rounded-md"
                ref={amountRef} type="number" placeholder="amount of SOL (on-chain)" />
            <button
                className="border-2 border-black rounded-md px-3 py-3"
                onClick={handleSentToken}>Send Token</button>
        </div>
    )

}


function Balance() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState("0");

    async function getBalance() {
        if (wallet.publicKey) {
            const amountInLamp = await connection.getBalance(wallet.publicKey);
            setBalance(amountInLamp / 1000000000);
        }

    }

    getBalance();
    return (
        <div>
            {`Balance: ${balance} SOL`}
        </div>
    )
}

export default SendToken;