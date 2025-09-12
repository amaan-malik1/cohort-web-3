import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import TokenLaunchpad from "./components/TokenLaunchpad";

//RPC url 
const RPC_ENDPOINT = import.meta.env.VITE_SOLANA_RPC;

function App() {
    return (
        <div className="flex justify-center items-center h-screen w-screen flex-col bg-black text-white">

            <ConnectionProvider endpoint={RPC_ENDPOINT}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <div className="flex justify-between w-full p-4">
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                        </div>
                        <TokenLaunchpad />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    )
}
export default App;