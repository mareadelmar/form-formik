import { auth } from "../firebaseconfig";

export const registerService = ({ email, password }) => {
    return auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            console.log("usuarix registradx");
            //historial.push("/");
            return res;
        })
        .catch((error) => {
            // CAPTURANDO ERRORES:
            console.log(error);
            console.error(error);
            return error;
            // if (e.code === "auth/invalid-email") {
            //     //setMnsError("El formate del email es incorrecto");
            //     return "El formate del email es incorrecto";
            // }
            // if (e.code === "auth/weak-password") {
            //     // setMnsError(
            //     //     "La contraseña debe tener al menos seis caracteres."
            //     // );
            //     return "La contraseña debe tener al menos seis caracteres.";
            // }
        });
};
