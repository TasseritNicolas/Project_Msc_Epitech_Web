
import React, { useState } from "react";
import axios from "axios";

export default function FormLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = () => {
        axios
            .post("http://localhost:3001/api/user/login", {
                email,
                password,
            })
            .then((res) => {
                setMessage("Bienvenue " + res.data.username);
                setEmail("");
                setPassword("");
                console.log(res);

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("username", res.data.username);


                if (res.data.status === "admin") {
                    window.location.href = "/admin";
                } else if (res.data.status === "companie") {
                    window.location.href = "/companie";
                } else {
                    window.location.href = "/";
                }
                setError(false);
            })
            .catch((error) => {
                console.log(error.response.data.error);
                setError(true);
                setMessage(error.response.data.error);
            });
    };
    const handleNavigation = (path) => {
         window.location.href = path;
     };

    return (
        <div>
            <span style={{ color: error ? "red" : "green" }}>{message}</span>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ border: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                                            <div className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            id="form3Example3c"
                                                            className="form-control"
                                                            placeholder="example@email.fr"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            value={email}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            id="form3Example4c"
                                                            className="form-control"
                                                            placeholder="Password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            value={password}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 gap-4">
                                                    <button className="btn btn-primary btn-lg" onClick={handleLogin}>Login</button>
                                                    <button className="btn btn-primary btn-lg" onClick={() => handleNavigation('/register')}>Register</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                                className="img-fluid"
                                                alt="Sample"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <span style={{ color: error ? "red" : "green" }}>{message}</span>
        </div>
    );
}
