import React from "react";
import { Formik } from "formik";
import { registerService } from "../services/registerService";

const Register = () => {
    /*
        - valores iniciales
        - qué va a ocurrir cuando haga submit: pasamos funciones
        - devolvemos una promesa en la función onSubmit
        - validate va a impedir que se haga submit si no pasa
    */
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = "Introduce un email";
                        }
                        if (!values.password) {
                            errors.password = "Introduce una contraseña";
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setFieldError }) => {
                        console.log(values);
                        return registerService(values).then((err) => {
                            console.log(err, err.code, err.message);
                            if (
                                err.code === "auth/invalid-email" ||
                                "auth/email-already-in-use"
                            ) {
                                setFieldError("email", err.message);
                            }
                            if (err.code === "auth/weak-password") {
                                setFieldError("password", err.message);
                            }
                        });
                    }}
                >
                    {({ handleChange, handleSubmit, isSubmitting, errors }) => (
                        <form onSubmit={handleSubmit} className="form-group">
                            <input
                                onChange={handleChange}
                                className={
                                    errors.email
                                        ? "form-control input-error"
                                        : "form-control"
                                }
                                type="email"
                                name="email"
                                placeholder="Introduce tu nombre"
                            />
                            <input
                                onChange={handleChange}
                                className={
                                    errors.password
                                        ? "form-control mt-4 input-error"
                                        : "form-control mt-4"
                                }
                                type="password"
                                name="password"
                                placeholder="Introduce tu contraseña"
                            />
                            <button
                                type="submit"
                                className="btn btn-block btn-dark mt-4"
                                disabled={isSubmitting}
                            >
                                Registrarse
                            </button>
                            {errors.email && (
                                <div className="alert alert-danger mt-4">
                                    {errors.email}
                                </div>
                            )}
                            {errors.password && (
                                <div className="alert alert-danger mt-4">
                                    {errors.password}
                                </div>
                            )}
                        </form>
                    )}
                </Formik>
            </div>
            <div className="col"></div>
        </div>
    );
};

export default Register;
