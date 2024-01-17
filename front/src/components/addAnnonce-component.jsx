import React, {  useState } from "react";


import axios from "axios";


export default function AddAnnonce() {

    const [societe, setsociete] = useState("");
    const [competence, setcompetence] = useState("");
    const [intitule, setIntitule] = useState("");
    const [salaire, setSalaire] = useState("");
    const [description, setDescription] = useState("");
    const [adresse, setadresse] = useState("");
    const [referent, setReferent] = useState("");
    const [contrat, setContrat] = useState("");
    const [response, setResponse] = useState("");



    const HandleSubmit = (e) => {
        e.preventDefault();





        axios
            .post("http://localhost:3001/api/user/annonce", {
                societe,
                competence,
                intitule,
                salaire,
                description,
                adresse,
                referent,
                contrat,

            })
            .then((res) => {
                setsociete("");
                setcompetence("");
                setIntitule("");
                setSalaire("");
                setDescription("");
                setadresse("");
                setReferent("");
                setContrat("");
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
            <form onSubmit={(e) => HandleSubmit(e)} className="form">
                <div className="form-group">
                    <input
                        onChange={(e) => setsociete(e.target.value)}
                        type="text" name="societe" className="form-control" placeholder="Nom de la société"
                        value={societe} />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setcompetence(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="compétences"
                        value={competence} />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setIntitule(e.target.value)}
                        type="text" name="intitule" className="form-control" placeholder="Intitulé"
                        value={intitule} />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setSalaire(e.target.value)}
                        type="text" name="salaire" className="form-control" placeholder="Salaire"
                        value={salaire} />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setDescription(e.target.value)}
                        type="text" name="description" className="form-control" placeholder="Description"
                        value={description} />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setadresse(e.target.value)}
                        type="text" name="adresse" className="form-control" placeholder="Adresse"
                        value={adresse} />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setReferent(e.target.value)}
                        type="text" name="referent" className="form-control" placeholder="Référent"
                        value={referent} />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setContrat(e.target.value)}
                        type="text" name="contrat" className="form-control" placeholder="Contrat"
                        value={contrat} />
                </div>
                <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>
            <span style={{ color: "green" }}>{response}</span>
        </div>

    );
};

