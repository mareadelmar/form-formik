import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerService } from "../services/registerService";
import { useHistory } from "react-router-dom";

const validateFields = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Introduce un email";
    } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
    ) {
        errors.email = "Ingresa un email válido";
    }

    if (!values.password) {
        errors.password = "Introduce una contraseña";
    }
    return errors;
};

const Register = () => {
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
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
                                setSubmitted(true);
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
                                        ? "form-control mt-4 mb-3 input-error"
                                        : "form-control mt-4 mb-3"
                                }
                                type="password"
                                name="password"
                                placeholder="Introduce tu contraseña"
                            />
                            <Field
                                name="pais"
                                as="select"
                                className="form-select mb-3"
                            >
                                <option value="argentina">Argentina</option>
                                <option value="uruguay">Uruguay</option>
                                <option value="chile">Chile</option>
                            </Field>
                            <div>
                                <label className="form-check-label mb-3">
                                    <Field
                                        className="form-check-input"
                                        type="radio"
                                        name="novedades"
                                        value="novedades"
                                    />
                                    Recibir novedades
                                </label>
                            </div>
                            <div>
                                <Field
                                    className="form-control"
                                    name="mensaje"
                                    as="textarea"
                                    placeholder="Cuéntanos de ti"
                                />
                            </div>
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

                            {submitted && <p>¡Formulario enviado con éxito!</p>}
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="col"></div>
        </div>
    );
};

/* 
podemos utilizar otros tipos de campos del formulario tmb con Field: por ej, un select


*/

export default Register;
