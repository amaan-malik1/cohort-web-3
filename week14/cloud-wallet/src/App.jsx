import { Connection, Transaction } from '@solana/web3.js'


function App() {
  const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/XdDmmiqi8Z1fyMtwOhqwJ")

  async function sendSol() {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    )

  }

  return (
    <div>
      <input type="text" placeholder='Amount' />
      <input type="text" placeholder='Address' />
      <button onClick={sendSol}>Send</button>
    </div>
  )
}

export default App
