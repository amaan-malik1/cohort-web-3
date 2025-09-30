import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, createConfig, WagmiProvider } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});



const App = () => {
  const style = {
    // "background": "red",
    "display": "flex",
    "justify-content": "center",
    "height": "100vh",
    "width": "100vw",
    "align-items": "center"
  }
  return (
    <div style={style}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={QueryClient}>
          <WalletConnector />
          <EthSend />
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  )
}



function EthSend() {

  return (
    <div>
      <input type="text" />
      <button>Send ETH</button>
    </div>
  )
}

function WalletConnector() {

  return (
    <div>
      <input type="text" />
      <button>Send ETH</button>
    </div>
  )
}

export default App
