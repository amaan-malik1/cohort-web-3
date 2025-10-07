import { Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js";


export const mintToken = async() => {
    const wallet = useWallet()
    const connection = new Connection(import.meta.env.RPC_URI)
    const mintKeypair = Keypair.generate();

    const lamport = await connection.getMinimumBalanceForRentExemption()


 }