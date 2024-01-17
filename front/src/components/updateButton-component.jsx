import React from 'react';

export default function UpdateUserComponent ({
                                                 newUsername,
                                                 setNewUsername,
                                                 newPassword,
                                                 setNewPassword,
                                                 newEmail,
                                                 setNewEmail,
                                                 handleUpdate,
                                                 message,
                                                 id,
                                                 token,
                                             }) {
    return (
        <div>
            <h2>Update User Information</h2>
            <div>
                <label htmlFor="newUsername">New Username:</label>
                <input
                    type="text"
                    id="newUsername"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="newEmail">New Email:</label>
                <input
                    type="email"
                    id="newEmail"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
            </div>
            <button onClick={handleUpdate}>Update User</button>
            {message && <p>{message}</p>}
        </div>
    );
};
