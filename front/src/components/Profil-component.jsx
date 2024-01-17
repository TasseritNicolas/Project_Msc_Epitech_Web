import React, { useState } from 'react';
import axios from 'axios';
import {UserHistory} from "./userHistory-component";

export default function UpdateUser() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');

    const handleDelete = async () => {
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        try {
            await axios.delete(`http://localhost:3001/api/user/${userId}/delete/`, { headers });
            alert('User deleted successfully');
            logout();
        } catch (error) {
            alert('Failed to delete user. Please try again.');
        }
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userId');
        window.location.href = '/login';
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const headers = {
            'Authorization': `Bearer ${token}`
        };
        let updateData = {};

        if (email) updateData.email = email;
        if (username) updateData.username = username;
        if (password) updateData.password = password;

        try {
            const response = await axios.put(`http://localhost:3001/api/user/${userId}/update`, updateData, { headers });

            console.log(response.data);
            alert('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Update User</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="row">
                                    <div className="button-container">
                                        <button type="submit" className="btn btn-primary">Update User</button>
                                        <div className="button-spacer"></div>
                                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete User</button>
                                    </div>

                                </div>

                            </form>
                        </div>
                        <div className="mt-5">
                            <h3>User Application History</h3>
                            <UserHistory username={username} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
