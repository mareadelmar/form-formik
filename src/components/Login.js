import React from "react";
import { auth } from "../firebaseconfig.js";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
    const historial = useHistory();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [mnsError, setMnsError] = useState(null);

    const loginUsuario = () => {
        auth.signInWithEmailAndPassword(email, pass)
            .then((r) => {
                console.log("usuarix logueado");
                historial.push("/");
            })
            .catch((err) => {
                console.log(err);
                if (err.code === "auth/wrong-password") {
                    setMnsError("La contraseña es incorrecta.");
                }
                if (err.code === "auth/invalid-email") {
                    setMnsError("El email es incorrecto o no está registrado.");
                }
            });
    };
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form className="form-group" onSubmit={loginUsuario}>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="form-control"
                        type="email"
                        placeholder="Introduce tu nombre"
                    />
                    <input
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                        className="form-control mt-4"
                        type="password"
                        placeholder="Introduce tu contraseña"
                    />
                    <p>
                        ¿Aún no tienes cuenta?{" "}
                        <Link to="/register">Crea una aquí</Link>
                    </p>
                    <button className="btn btn-block btn-primary mt-4">
                        Iniciar sesión
                    </button>
                    {mnsError ? (
                        <div className="alert alert-danger mt-4">
                            {mnsError}
                        </div>
                    ) : null}
                </form>
            </div>
            <div className="col"></div>
        </div>
    );
};

export default Login;
