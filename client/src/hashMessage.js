import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

const hashMessage = (msg) => {
    const str = JSON.stringify(msg);
    const bytes = utf8ToBytes(str);
    const hash = keccak256(bytes);
    return toHex(hash);
};

export default hashMessage;
