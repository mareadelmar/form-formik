import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebaseconfig.js";

const Menu = () => {
    const historial = useHistory();
    const [usuario, setUsuario] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email);
                console.log(user.email);
            }
        });
    }, []);

    const cerrarSesion = () => {
        auth.signOut();
        setUsuario(null);
        historial.push("/login");
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>
                    </li>

                    <li className="nav-item">
                        {!usuario ? (
                            <Link className="nav-link" to="/Login">
                                Login
                            </Link>
                        ) : (
                            <span></span>
                        )}
                    </li>

                    <li className="nav-item">
                        {usuario ? (
                            <Link className="nav-link" to="/Admin">
                                Admin
                            </Link>
                        ) : (
                            <span></span>
                        )}
                    </li>
                </ul>
                {usuario ? (
                    <button onClick={cerrarSesion} className="btn btn-danger">
                        Cerrar sesión
                    </button>
                ) : (
                    <span></span>
                )}
            </nav>
            <h2>MENU</h2>
        </div>
    );
};

export default Menu;
