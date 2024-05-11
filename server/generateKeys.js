const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");
const { toHex } = require("ethereum-cryptography/utils");
const hashMessage = require("./hashMessage");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = toHex(secp256k1.utils.randomPrivateKey());
const publicKey = toHex(secp256k1.getPublicKey(privateKey));
console.log("compare:", privateKey.length, publicKey.length);

const privateKey_2 = toHex(secp256k1.utils.randomPrivateKey());
const publicKey_2 = toHex(secp256k1.getPublicKey(privateKey_2));

// const derivedPubKey = toHex(secp256k1.getPublicKey(privateKey));
console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);
console.log("Private Key 2:", privateKey_2);
console.log("Public Key 2:", publicKey_2);
console.log(
    "length",
    "69d1cdb1045a8d7431062c9921c9ba2d88755d1a82291c67b215b1e6931226d0".length
);
// Client
// const msg = {
//     sender: privateKey,
//     amount: 10,
//     recipient: publicKey_2,
// };
// // console.log(msg);
// const msgHash = hashMessage(msg);
// console.log("hi", msgHash);
// const signature = secp256k1.sign(msgHash, privateKey);

// const reqBody = {
//     msg,
//     signature,
// };

// // Send reqBody to Server
// // const { msgServer, signatureServer } = reqBody;
// // console.log("hhh", msgServer);
// const msgServerHash = hashMessage(msg);
// // console.log("hey", msgServerHash);
// const a = toHex(signature.recoverPublicKey(msgServerHash).toRawBytes());
// console.log("aaa", a);
// // const sender = toHex(keccak256(signature.recoverPublicKey(msgServerHash)));
// // console.log("Derived Sender:", sender);
