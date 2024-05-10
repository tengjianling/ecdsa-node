import server from "./server";

function Wallet({
    address,
    setAddress,
    balance,
    setBalance,
    privateKey,
    setPrivateKey,
}) {
    async function onChange(evt) {
        const privateKey = evt.target.value;
        setPrivateKey(privateKey);
        if (privateKey) {
            const {
                data: { balance },
            } = await server.get(`balance/${privateKey}`);
            setBalance(balance);
        } else {
            setBalance(0);
        }
    }

    return (
        <div className="container wallet">
            <h1>Your Wallet</h1>
            <label>
                Private Key (Change to signature later)
                <input
                    placeholder="Type account's private key"
                    value={privateKey}
                    onChange={onChange}
                ></input>
            </label>

            <div className="balance">Balance: {balance}</div>
        </div>
    );
}

export default Wallet;
