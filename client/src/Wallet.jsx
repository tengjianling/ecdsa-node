import { toHex } from "ethereum-cryptography/utils";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

function Wallet({
    address,
    setAddress,
    balance,
    setBalance,
    privateKey,
    setPrivateKey,
}) {
    async function updateBalance(address) {
        if (address) {
            const {
                data: { balance },
            } = await server.get(`balance/${address}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    const handleChange = (e) => {
        if (e.target.value.length == 64) {
            setPrivateKey(e.target.value);
            const publicKey = toHex(secp256k1.getPublicKey(e.target.value));
            publicKey && setAddress(publicKey);
            updateBalance(publicKey);
        } else {
            setAddress("Invalid private key");
            setBalance(0);
        }
    };

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>
            <label>
                Private Key (Change to signature later)
                <input
                    placeholder="Type account's private key"
                    onChange={handleChange}
                ></input>
            </label>
            <label>
                Address (Public Key):
                <input disabled value={address}></input>
            </label>

            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
