const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const hashMessage = (msg) => {
    const str = JSON.stringify(msg);
    // console.log(msg);
    // console.log(str);
    const bytes = utf8ToBytes(str);
    // console.log(bytes);
    const hash = keccak256(bytes);
    return toHex(hash);
};

// export default hashMessage;
module.exports = hashMessage;
