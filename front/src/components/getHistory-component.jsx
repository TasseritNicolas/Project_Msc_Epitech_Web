import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetHistory() {
    const [state, setState] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/user/history")
            .then((res) => {
                console.log(res.data.historique);
                setState(res.data.historique);
            });
    }, []);

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
