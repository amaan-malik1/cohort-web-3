import './App.css';
import { generateMnemonic } from 'bip39';
import { useState } from "react";
// import SolanaWallet from './components/SolanaWallet';

function App() {
  const [mnemonics, setMnemonics] = useState('');
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <div className='flex flex-row gap-5'>

        <label htmlFor="solSeed" className="text-2xl font-bold p-10">your sol seed phrase: </label>
        <input className="flex flex-col justify-center text-center items-center px-2 py-2  min-w-[40rem] rounded-md" id='solSeed' type="text" value={mnemonics} />
      </div>
      <button onClick={async () => {
        const seedPhrase = await generateMnemonic();
        setMnemonics(seedPhrase)
      }}>Generate seed</button>

      {/* <SolanaWallet mnemonics={mnemonics} /> */}
    </div>
  )

}

export default App
