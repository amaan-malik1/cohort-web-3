const express = require('express');
const { userModel } = require('./model');
const { Keypair } = require('@solana/web3.js');
const jwt = require('jsonwebtoken')
const JWT_SECRET = "sjfnuie328888**FHhds"


const app = express();
app.use(express.json());

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

app.post('/api/v1/txn/sign', (req, res) => {
    res.json({
        message: "txn"
    })
});

app.post('/api/v1/txn', (req, res) => {
    res.json({
        message: "txn"
    })
})