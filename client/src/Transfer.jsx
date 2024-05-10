import { useState } from "react";
import server from "./server";
import { keccak256 } from "ethereum-cryptography/keccak.js";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";
import hashMessage from "./hashMessage";

function Transfer({ privateKey, setBalance }) {
    const [sendAmount, setSendAmount] = useState("");
    const [recipient, setRecipient] = useState("");

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        try {
            const msg = {
                sender: privateKey,
                amount: parseInt(sendAmount),
                recipient,
            };
            const msgHash = hashMessage(msg);
            const signature = secp256k1.sign(msgHash, privateKey);
            const {
                data: { balance },
            } = await server.post(`send`, {
                msg,
                r: signature.r.toString(),
                s: signature.s.toString(),
                recovery: signature.recovery,
            });
            setBalance(balance);
        } catch (ex) {
            alert(ex.response.data.message);
            // alert(ex);
        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Send Amount
                <input
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>

            <label>
                Recipient
                <input
                    placeholder="Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <input type="submit" className="button" value="Transfer" />
        </form>
    );
}

export default Transfer;
