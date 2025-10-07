import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import { useRef } from "react";

function SignMSG() {
    const msgRef = useRef();
    const { publicKey, signMessage } = useWallet()

    const style = {
        backgroundColor: 'black',
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        hover: { backgroundColor: 'red' }
    }

    async function doSign() {
        if (!publicKey) {
            return alert("Connect Wallet First!");
        }
        if (!signMessage) {
            return alert("Wallet does not support message signing!");
        }

        const msg = msgRef.current.value;
        const msgEncoded = new TextEncoder().encode(msg);
        const signature = await signMessage(msgEncoded);
        const isValid = ed25519.verify(signature, msgEncoded, publicKey.toBytes());

        if (!isValid) {
            alert("Invalid Message Signature");
        } else {
            alert(`Message signed! Signature: ${bs58.encode(signature)}`);
        }

    }


    return (
        <div style={{ backgroundColor: 'pink', marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
            <input type="text" placeholder="enter MSG" ref={msgRef} />
            <button disabled={!publicKey} style={style} onClick={doSign}>Sign</button>
        </div>
    )
}

export default SignMSG;