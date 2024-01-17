import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from './view/Register';
import Login from './view/Login';
import Home from './view/Home';
import { Helmet } from "react-helmet";
import Footer from "./components/Footer-component";
import NavBarHome from "./components/NavBar-Home-component";
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from "./view/Admin";
import Profil from "./view/Profil"
import Poste from "./view/Poste";
import ProtectedRoute from "./service/ProtectedRoute";
import {AuthProvider} from "./service/authContext";

export default function App() {
    return (
            <AuthProvider>
                <BrowserRouter>
                    <div className="App">
                        <Helmet>
                            <title>MyJob</title>
                            <meta name="description" content="JobBoard" />
                            <link rel="stylesheet" href="Style/style.css" />
                            <link
                                rel="stylesheet"
                                href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css"
                                integrity="sha384-pzjw8f+ua7Kw1TIq0v8FqFjcJ6pajs/rfdfs3SO+kFvf5nE+0wTEfoKof5msw6fsj"
                                crossOrigin="anonymous"
                            /><link
                            rel="stylesheet"
                            href="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                            crossOrigin="anonymous"
                        />
                            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"/>

                            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
                            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
                        </Helmet>
                        <NavBarHome />
                        <Switch>
                            <Route path="/register" exact component={Register} />
                            <Route path="/login" exact component={Login} />
                            <ProtectedRoute path="/admin" exact requiredStatus="admin" component={Admin} />
                            <ProtectedRoute path="/Poste" exact requiredStatus="companie" component={Poste} />
                            <Route path="/" exact component={Home} />
                            <Route path="/Profil" exact component={Profil}/>

                        </Switch>
                        <Footer />
                    </div>
                </BrowserRouter>
            </AuthProvider>

    );
}


