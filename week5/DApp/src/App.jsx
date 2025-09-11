import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./components/Airdrop";
import ShowBalance from "./components/Showbalance";
import { Toaster } from "react-hot-toast";
import SignMessage from "./components/SignMessage";

function App() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white w-screen min-h-screen flex justify-center items-center px-4 py-6">
      <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/XdDmmiqi8Z1fyMtwOhqwJ"}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-700 flex flex-col gap-6 sm:gap-8">

              {/* Header */}
              <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-400">
                Solana Faucet (Devnet)
              </h1>

              {/* Wallet Actions */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 rounded-xl shadow-md w-full sm:w-auto" />
                <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 rounded-xl shadow-md w-full sm:w-auto" />
              </div>

              {/* Balance */}
              <div className="flex justify-center">
                <ShowBalance />
              </div>

              {/* Airdrop Section */}
              <Airdrop />

              <SignMessage />
            </div>

            {/* Toast Notifications */}
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
