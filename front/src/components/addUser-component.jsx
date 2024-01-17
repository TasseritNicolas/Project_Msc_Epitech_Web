import React, { useState } from "react";
import axios from "axios";

export default function Adduser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorusername, setErrorusername] = useState(false);
    const [errorpass, setErrorpass] = useState(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState("");

    const HandleSubmit = (e) => {
        e.preventDefault();
        const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;

        if (username.length >= 13 || username.length <= 4) {
            setErrorusername(true);
            setError(false);
        } else if (!PASSWORD_REGEX.test(password)) {
            setErrorpass(true);
            setError(false);
        } else {
            axios
                .post("http://localhost:3001/api/user/register", {
                    email,
                    password,
                    username,
                })
                .then((res) => {
                    setErrorusername(false);
                    setEmail("");
                    setPassword("");
                    setUsername("");
                    setErrorpass(false);
                    setError(false); // Set error to false on successful submission
                    setResponse("Vous êtes bien enregistré " + res.data.username);
                })
                .catch((error) => {
                    console.log(error.response.data.error);
                    setError(true); // Set error to true on API request error
                    setResponse(error.response.data.error);
                });
        }
    };

    return (
        <div className="formm">
            <form onSubmit={(e) => HandleSubmit(e)}>
                <div className="form-group">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ border: errorusername ? "1px solid red" : "" }}
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="username"
                        value={username}
                    />
                    <span style={{ color: errorusername ? "red" : "black" }}>
                {errorusername && <p>Veillez écrire un username entre 4 et 12 caractères</p>}
            </span>
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder="email"
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ border: errorpass ? "1px solid red" : "" }}
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="password"
                        value={password}
                    />
                    <span style={{ color: errorpass ? "red" : "black" }}>
                {errorpass && <p>Veillez écrire un mot de passe entre 4 et 12 caractères avec au moins 1 chiffre</p>}
            </span>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </div>
            </form>
            <span style={{ color: error ? "red" : "green" }}>{response}</span>
        </div>
    );
}
