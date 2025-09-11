import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { ed25519 } from "@noble/curves/ed25519";

function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    const handleSignMsg = async () => {
        if (!publicKey) {
            alert("Connect Wallet First!");
            return;
        }
        if (!signMessage) {
            alert("Wallet does not support message signing!");
            return;
        }

        try {
            const msg = document.getElementById("message").value;
            const encodedMsg = new TextEncoder().encode(msg);

            // Sign message
            const signature = await signMessage(encodedMsg);

            // Verify
            const isValid = ed25519.verify(signature, encodedMsg, publicKey.toBytes());

            if (!isValid) {
                alert("Invalid Message Signature");
            } else {
                alert(`Message signed!\nSignature: ${bs58.encode(signature)}`);
            }
        } catch (err) {
            console.error(err);
            alert("Signing failed!");
        }
    };

    return (
        <div className="flex flex-col gap-3 p-4 bg-gray-900 rounded-xl shadow-md text-white">
            <input
                type="text"
                placeholder="Enter message"
                id="message"
                className="px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSignMsg}
                disabled={!publicKey || !signMessage}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:bg-gray-600"
            >
                Sign Message
            </button>
        </div>
    );
}

export default SignMessage;
