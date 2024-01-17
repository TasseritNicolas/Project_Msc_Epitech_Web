import React, {  useState } from "react";


import axios from "axios";

 export default function AddHistory() {

    const [societe, setsociete] = useState("");
    const [postulant, setpostulant] = useState("");
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");



    const HandleSubmit = (e) => {
        e.preventDefault();











        axios
            .post("http://localhost:3001/api/user/history", {
                societe,
                postulant,
                message

            })
            .then((res) => {
                setsociete("");
                setpostulant("");
                setMessage("");
                setResponse(res.data.message)



                console.log(res)
                //alert(res.data.message)
            })
            .catch((error) => {
                console.log(error.response.data.error);

            })

    }



    return (
        <div className="formm">
            <form onSubmit={(e) => HandleSubmit(e)}>
                <div className="form-group">
                    <input
                        onChange={(e) => setsociete(e.target.value)}
                        type="text"
                        name="societe"
                        className="form-control"
                        placeholder="Nom de la société"
                        value={societe}
                    />
                </div>

                <div className="form-group">
                    <input
                        onChange={(e) => setpostulant(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="postulant"
                        value={postulant}
                    />
                </div>

                <div className="form-group">
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        name="message"
                        className="form-control"
                        placeholder="message"
                        value={message}
                    />
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </div>
            </form>
            <span style={{ color: "green" }}>{response}</span>
        </div>

    );
};


