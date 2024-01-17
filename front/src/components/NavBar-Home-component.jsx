import React, {useState, useEffect} from 'react';
import '../Style/style.css';
import {NavLink} from "react-router-dom";

export default function NavBarHome() {
    const [loggin, setLogin] = useState(false);

    useEffect(() => {
        let con = localStorage.getItem('token')
        if(con){setLogin(true)}
    },[]);
    const Loggout = () => {
        localStorage.clear();
        window.location.href="/";

    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink exact to="/" className="navbar-brand" onClick={() => window.location.href="/"}>
                    MyJob
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {loggin ? (
                            <>
                                <li className="nav-item">
                                    <NavLink exact to="/" className="nav-link" onClick={Loggout}>
                                        Deconnexion
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-button" onClick={() => window.location.href="/profil"}>
                                        {localStorage.getItem("username")}
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink exact to="/login" className="btn btn-primary nav-button" onClick={() => window.location.href="/login"}>
                                        Connexion
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink exact to="/register" className="btn btn-primary nav-button" onClick={() => window.location.href="/register"}>
                                        Inscription
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
