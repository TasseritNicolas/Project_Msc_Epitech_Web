import React from 'react';
import '../Style/style.css';
import GetUser from "./getUser-component";
import GetHistory from "./getHistory-component";


export default function ProfilComponent() {
    // const handleNavigation = (path) => {
    //     window.location.href = path;
    // };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">List of all users</h1>
                            <GetUser />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">List of history</h1>
                            <GetHistory/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
