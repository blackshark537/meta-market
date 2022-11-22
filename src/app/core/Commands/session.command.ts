import { createAction, props } from "@ngrx/store";
import { iUser } from "../Domain/Interfaces";

const Login = createAction("[Session Login] login de usuario", props<{username: string, password: string}>());
const Logout = createAction("[Session LogOut] Salir de la app");
const Signup = createAction("[Session Signup] crear nueva cuenta de usuario", props<{user: iUser}>());
const Error = createAction("[Session Error] error con cuenta de usuario", props<{error: any}>());
const loginSuccess = createAction("[Session Success] cuenta de usuario", props<{user: iUser}>())
const signupSuccess = createAction("[Session Success] cuenta de usuario creada con exito", props<{user: iUser}>())

export const SessionCmd = {
    loginSuccess,
    signupSuccess,
    Signup,
    Login,
    Logout,
    Error
}