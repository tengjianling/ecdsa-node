const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const express = require("express");
const app = express();
const cors = require("cors");
const hashMessage = require("./hashMessage");
const port = 3042;

const checkValid = (signature, msgHash, sender, msg) => {
    const isSigned = secp256k1.verify(signature, msgHash, sender);
    const isValidSender = sender === msg.sender;
    return isSigned && isValidSender;
};
app.use(cors());
app.use(express.json());

const balances = {
    "031e4a5e7fd802b2323da30835ef34d1cc168fb497bf495117e7f6445c76959a2a": 100, // priv: 69d1cdb1045a8d7431062c9921c9ba2d88755d1a82291c67b215b1e6931226d0
    "03dae62dfbd776d48bbdf123115143bfa3e949a5d4162e4543e151a4d524173fde": 50, // priv: 6936601cc7f56b09c6f58e937825a6a51b44a75b69f297f6f3a95cb481c47cac
    "020f012e35479ff15054b9fa3a01977ca3b2644fef862386301ee3708b8150ea1f": 75, // priv: bf2fe914bab702869df334d189cc2a9e12c5114b5a95b49c37c2830376fa1471
};

app.get("/balance/:address", (req, res) => {
    const { address } = req.params;
    const balance = balances[address] || 0;
    res.send({ balance });
});

app.post("/send", (req, res) => {
    const { msg, r, s, recovery } = req.body;
    const signature = new secp256k1.Signature(BigInt(r), BigInt(s), recovery);
    const msgHash = hashMessage(msg);
    const sender = toHex(signature.recoverPublicKey(msgHash).toRawBytes());
    const recipient = msg.recipient;
    const amount = msg.amount;

    const isValid = checkValid(signature, msgHash, sender, msg);
    if (!isValid) {
        res.status(400).send({ message: "Invalid transaction" });
    }
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
        res.status(400).send({ message: "Not enough funds!" });
    } else {
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0;
    }
}
