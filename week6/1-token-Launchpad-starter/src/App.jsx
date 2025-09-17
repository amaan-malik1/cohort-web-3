import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import TokenLaunchpad from "./components/TokenLaunchpad";
import { GiToken } from "react-icons/gi";
import ShowBalance from "./components/ShowBalance";


//RPC url 
const RPC_ENDPOINT = import.meta.env.VITE_SOLANA_RPC;

function App() {
    return (
        <div className="flex justify-center items-center h-screen w-screen flex-col bg-black text-white">

            <ConnectionProvider endpoint={RPC_ENDPOINT}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <div className="flex justify-evenly gap-4 items-center w-full p-4">
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                            <div className="flex justify-center items-center gap-2 bg-gray-800 px-4 py-2 rounded-md">
                                <GiToken />
                                <ShowBalance />
                            </div>
                        </div>
                        <TokenLaunchpad />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    )
}
export default App;

// import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
// import {
//     WalletDisconnectButton,
//     WalletModalProvider,
//     WalletMultiButton,
// } from "@solana/wallet-adapter-react-ui";
// import "@solana/wallet-adapter-react-ui/styles.css";

// import TokenLaunchpad from "./components/TokenLaunchpad";
// import { GiToken } from "react-icons/gi";
// import ShowBalance from "./components/ShowBalance";

// // RPC url
// const RPC_ENDPOINT = import.meta.env.VITE_SOLANA_RPC;

// function App() {
//     return (
//         <div className="flex flex-col min-h-screen w-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
//             <ConnectionProvider endpoint={RPC_ENDPOINT}>
//                 <WalletProvider wallets={[]} autoConnect>
//                     <WalletModalProvider>
//                         {/* Navbar */}
//                         <div className="flex justify-evenly items-center gap-4">
//                             <WalletMultiButton className="!bg-yellow-500 hover:!bg-yellow-400 !text-black font-semibold transition-all duration-200" />
//                             <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-500 font-semibold transition-all duration-200" />

//                             <ShowBalance />
//                         </div>

//                         {/* Main Content */}
//                         <div className="flex flex-1 justify-center items-center w-full p-6">
//                             <TokenLaunchpad />
//                         </div>
//                     </WalletModalProvider>
//                 </WalletProvider>
//             </ConnectionProvider>
//         </div>
//     );
// }
// export default App;
