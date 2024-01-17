import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function UserHistory() {
    const [state, setState] = useState([]);
    const username = localStorage.getItem("username");

    useEffect(() => {
        axios.get(`http://localhost:3001/api/user/history?username=${username}`)
            .then((res) => {
                setState(res.data.historique);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération de l'historique:", error);
            });
    }, [username]);

    const styles = {
        card: {
            border: '1px solid #eee',
            padding: '10px',
            marginBottom: '10px'
        },
        list: {
            listStyle: 'none',
            paddingLeft: 0
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {state.map((historique, index) => (
                <div key={index} style={styles.card}>
                    <ul style={styles.list}>
                        <li><strong>Societe:</strong> {historique.societe}</li>
                        <li><strong>Postulant:</strong> {historique.postulant}</li>
                        <li><strong>Message:</strong> {historique.message}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}
