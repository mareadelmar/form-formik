import React from "react";
import { auth } from "../firebaseconfig.js";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const historial = useHistory();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [mnsError, setMnsError] = useState(null);
    const [validar, setValidar] = useState(null);

    const registrarUsuario = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setValidar("Debes ingresar un email.");
            console.log("Debes ingresar un email.");
            return;
        }
        if (!pass.trim()) {
            setValidar("Debes ingresar una contraseña.");
            console.log("Debes ingresar una contraseña.");
            return;
        }

        auth.createUserWithEmailAndPassword(email, pass)
            .then((r) => {
                console.log("usuarix registradx");
                historial.push("/");
            })
            .catch((e) => {
                // CAPTURANDO ERRORES:
                if (e.code === "auth/invalid-email") {
                    setMnsError("El formate del email es incorrecto");
                }
                if (e.code === "auth/weak-password") {
                    setMnsError(
                        "La contraseña debe tener al menos seis caracteres."
                    );
                }
            });
    };

    const loginUsuario = () => {
        auth.signInWithEmailAndPassword(email, pass)
            .then((r) => {
                console.log("usuarix logueado");
                historial.push("/");
            })
            .catch((err) => {
                console.log(err);
                if (err.code == "auth/wrong-password") {
                    setMnsError("La contraseña es incorrecta.");
                }
                if (err.code == "auth/invalid-email") {
                    setMnsError("El email es incorrecto o no está registrado.");
                }
            });
    };
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={registrarUsuario} className="form-group">
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
                    <input
                        type="submit"
                        value="Registrar"
                        className="btn btn-block btn-dark mt-4"
                    />
                </form>
                <button
                    onClick={loginUsuario}
                    className="btn btn-block btn-primary mt-4"
                >
                    Iniciar sesión
                </button>
                {mnsError ? (
                    <div className="alert alert-danger mt-4">{mnsError}</div>
                ) : (
                    <span></span>
                )}
                {validar ? (
                    <div className="alert alert-danger mt-4">{validar}</div>
                ) : (
                    <span></span>
                )}
            </div>
            <div className="col"></div>
        </div>
    );
};

export default Login;
