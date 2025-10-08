const express = require('express');
const { userModel } = require('./model');
const { Keypair, Transaction, Connection } = require('@solana/web3.js');
const jwt = require('jsonwebtoken')
const bs58 = require('bs58');

const app = express();
app.use(express.json());
app.use(cors());
const JWT_SECRET = "sjfnuie328888**FHhds"


const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/XdDmmiqi8Z1fyMtwOhqwJ");

app.post('/api/v1/signup', (req, res) => {
    const { username, password } = req.body;
    const keypair = new Keypair()
    if (!username || !password || !publicKey || !privateKey) {
        return console.log("All fields are required!");
    }


    userModel.create({
        username: username,
        password: password,
        publicKey: keypair.publicKey.toString(),
        privateKey: keypair.secretKey.toString()
    })
    res.json({
        message: keypair.publicKey.toString()
    })
});

app.post('/api/v1/signin', (req, res) => {
    const { username, password } = req.body;

    const user = userModel.findOne({
        username,
        password
    });

    if (user) {
        const token = jwt.sign({ id: user }, JWT_SECRET);
        res.json({
            token
        });
    } else {
        res.json({ message: "Invalid credentials!" })
    }
});

app.post('/api/v1/txn/sign', async (req, res) => {
    const serializedTxn = req.body;
    console.log("before serializedTxn");
    console.log(serializedTxn);

    const txn = Transaction.from(Buffer.from(serializedTxn))
    console.log("after serialise")


    const keyPair = new Keypair.fromSecretKey(bs58.default.decode(process.env.PRIVATE_KEY));

    const { blockhash } = await connection.getRecentBlockhash();

    txn.blockhash = blockhash;
    txn.feePayer = keyPair.publicKey;

    txn.sign(keyPair)

    const signature = await connection.sendTransaction(txn, [keyPair]);

    console.log(signature);
});

app.post('/api/v1/txn', (req, res) => {
    res.json({
        message: "txn"
    })
});



app.listen(3000);
