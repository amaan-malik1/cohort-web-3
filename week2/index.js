const keypair = require('@solana/web3.js');
const nacl = require('tweetnacl');

// generaiting new keypairs
const keypair = Keypair.generate();

//extract the public and private keys
const publicKey = keypair.publicKey.toBase58();         // base 58 is human more readale
const privateKey = keypair.privateKey.toBase58();

//loging both
console.log("Public key:", publicKey);
console.log("Private key:", privateKey);




