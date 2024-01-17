import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonUpdate from './updateButton-component';

export default function GetUser() {
    const [state, setState] = useState([]);
    const [showButtonUpdate, setShowButtonUpdate] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/api/user/user")
            .then((res) => {
                console.log(res.data.user);
                setState(res.data.user);
            });
    }, []);

    const toggleButtonUpdate = () => {
        setShowButtonUpdate(!showButtonUpdate);
    };

    return (
        <div style={{ padding: '20px' }}>
            {state.map((user, index) => (
                <div key={index} style={styles.card}>
                    <ul style={styles.list}>
                        <li><strong>Username:</strong> {user.username}</li>
                        <li><strong>Email:</strong> {user.email}</li>
                        <li><strong>Password:</strong> {user.password}</li>
                    </ul>
                    {showButtonUpdate && <ButtonUpdate />}
                    <button onClick={toggleButtonUpdate} style={styles.updateButton}>Update</button>
                    <button style={styles.deleteButton}>Delete</button>
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
    },
    updateButton: {
        marginRight: '10px'
    },
    deleteButton: {
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer'
    }
};
