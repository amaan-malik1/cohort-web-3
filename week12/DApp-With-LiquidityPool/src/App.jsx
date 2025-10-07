import './App.css';

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import './App.css'
import SendToken from "./components/SendToken";
import SignMSG from "./components/SignMSG";

function App() {
  const endpoint = 'https://solana-devnet.g.alchemy.com/v2/XdDmmiqi8Z1fyMtwOhqwJ'


  return (

    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {/* Wallet Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 rounded-xl shadow-md w-full sm:w-auto" />
            <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 rounded-xl shadow-md w-full sm:w-auto" />
          </div>

          <div className='w-full h-full'>
            <SendToken />
            <SignMSG />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>

  )
}

export default App
