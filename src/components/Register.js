import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerService } from "../services/registerService";
import { useHistory } from "react-router-dom";

const validateFields = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Introduce un email";
    }
    if (!values.password) {
        errors.password = "Introduce una contraseña";
    }
    return errors;
};

const Register = () => {
    const history = useHistory();
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
                    validate={validateFields}
                    onSubmit={(values, { setFieldError }) => {
                        console.log(values);
                        return registerService(values).then((res) => {
                            console.log(res);
                            if (res.user) {
                                history.push("/");
                                return;
                            }
                            if (
                                res.code === "auth/invalid-email" ||
                                "auth/email-already-in-use"
                            ) {
                                setFieldError("email", res.message);
                                return;
                            }
                            if (res.code === "auth/weak-password") {
                                setFieldError("password", res.message);
                                return;
                            }
                        });
                    }}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="form-group">
                            <Field
                                className={
                                    errors.email
                                        ? "form-control input-error"
                                        : "form-control"
                                }
                                type="email"
                                name="email"
                                placeholder="Introduce tu nombre"
                            />
                            <Field
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

                            <ErrorMessage
                                className="alert alert-danger mt-4"
                                name="email"
                                component="div"
                            />
                            <ErrorMessage
                                className="alert alert-danger mt-4"
                                name="password"
                                component="div"
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="col"></div>
        </div>
    );
};

export default Register;
