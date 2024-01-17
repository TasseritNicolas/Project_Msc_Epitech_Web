import React, { useState } from 'react';
import axios from 'axios';

export default function Applybouton(props) {
    const { announces } = props;

    const [cacher, setOuvert] = useState(true);
    const [societe, setsociete] = useState('');
    const [postulant, setpostulant] = useState('');
    const [Message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const [response, setResponse] = useState('');

    const Openform = () => {
        if (token == null) {
            setOuvert(!cacher);
        } else {
            let username = localStorage.getItem('username');
            let societe = announces.societe;
            console.log(username);
            console.log(societe);

            axios
                .post('http://localhost:3001/api/user/apply', {
                    postulant: username,
                    societe: societe,
                    Message: 'A postulé à votre annonce',
                })
                .then((res) => {
                    setResponse(res.data.message);
                });
        }
    };

    const HandleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:3001/api/user/apply', {
                societe,
                postulant,
                Message,
            })
            .then((res) => {
                setsociete('');
                setpostulant('');
                setMessage('');
                console.log(res);
                setResponse(res.data.message);
            });
    };

    return (
        <div>
            <button
                className="btn btn-primary open-button monbouton mb-3"
                onClick={Openform}
            >
                Postuler
            </button>


            {cacher ? (
                ''
            ) : (

                <div className="applyform">

                    <form onSubmit={(e) => HandleSubmit(e)}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                onChange={(e) => setsociete(e.target.value)}
                                type="text"
                                placeholder="Nom de societe"
                                value={societe}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                onChange={(e) => setpostulant(e.target.value)}
                                type="text"
                                placeholder="nom postulant"
                                value={postulant}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                onChange={(e) => setMessage(e.target.value)}
                                type="text"
                                placeholder="Message"
                                value={Message}
                                required
                            />
                        </div>
                        <button className="btn btn-success" type="submit">
                            Envoyer
                        </button>
                    </form>
                </div>
            )}

            <div style={{ color: 'green' }}>{response}</div>
        </div>
    );
};

