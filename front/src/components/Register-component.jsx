import React, {  useState } from "react";


import axios from "axios";

export default function FormRegister() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [errorusername, setErrorusername] = useState(false);
  const [error, setError] = useState(false);


  const HandleSubmit = (e) => {
    e.preventDefault();

    const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;

    if (username.length >= 13 || username.length <= 4) {
      setErrorusername(true);
    } else if (!PASSWORD_REGEX.test(password)) {
      setErrorusername(true);
    } else {
      axios
          .post("http://localhost:3001/api/user/register", {
            email,
            password,
            username,
          })
          .then((res) => {
            setErrorusername(false);
            setEmail("");
            setPassword("");
            setUsername("");
            if (res.data && res.data.username) {
              setMessage("Vous êtes bien enregistré " + res.data.username);
            } else {
              setMessage("Vous êtes bien enregistré.");
            }
            window.location.href = "/login";
            console.log(res);
          })
          .catch((error) => {
            console.log(error.response.data.error);
            setError(true);
            setMessage(error.response.data.error);
          });
    }
  };



  return (

      <div>
        <span style={{ color: error ? "red" : "green" }}>{message}</span>
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ border: "25px" }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Register</p>

                        <form className="mx-1 mx-md-4" onSubmit={(e) => HandleSubmit(e)}>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="text" id="form3Example1c" className="form-control" placeholder="Username"  onChange={(e) => setUsername(e.target.value)}  value={username}/>
                              <span style={{color: errorusername ? "red": "black"}}>{errorusername && <p>veuiller ecrire un username entre 5 et 12 caractere</p>}</span>

                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="email" id="form3Example3c" className="form-control" placeholder="exemple@email.fr" onChange={(e) => setEmail(e.target.value)}     value={email}/>
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                              <input type="password" id="form3Example4c" className="form-control"   placeholder="Password"    onChange={(e) => setPassword(e.target.value)}  value={password}/>
                              <span style={{color: errorusername ? "red": "black"}}>{errorusername && <p>veuiller ecrire un username entre 5 et 12 caractere</p>}</span>

                            </div>
                          </div>


                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <input className="btn btn-primary btn-lg" type="submit" value="Envoyer" />
                          </div>

                        </form>

                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            className="img-fluid"
                            alt="Illustration of the registration process"
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
};

