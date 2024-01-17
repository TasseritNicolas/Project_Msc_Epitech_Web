import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cardannonce() {
    const [state, setState] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/user/offer")
            .then((res) => {
                console.log(res.data.announces);
                setState(res.data.announces);
            });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            {state.map((announces, index) => (
                <div key={index} style={styles.card}>
                    <h2>{announces.intitule}</h2>
                    <ul style={styles.list}>
                        <li><strong>Compétence:</strong> {announces.competence}</li>
                        <li><strong>Salaire:</strong> {announces.salaire}</li>
                        <li><strong>Description:</strong> {announces.description}</li>
                        <li><strong>Adresse:</strong> {announces.adresse}</li>
                        <li><strong>Contrat:</strong> {announces.contrat}</li>
                        <li><strong>Référent:</strong> {announces.referent}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
        transition: 'box-shadow 0.3s ease',
        ':hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
        }
    },
    list: {
        listStyleType: 'none',
        padding: 0
    }
};
