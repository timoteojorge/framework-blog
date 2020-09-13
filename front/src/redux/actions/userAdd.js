import config from "../../config";
import { CLEAR_ADD_USER, SET_USER_ADD_EMAIL, SET_USER_ADD_INVALID_EMAIL, SET_USER_ADD_PASSWORD, SET_USER_ADD_SHOW_PASSWORD, SET_USER_ADD_NAME } from "./actionTypes";
import { openAlert, setBackdropClosed, setBackdropOpen } from "./common";

const clearNewUser = () => ({
    type: CLEAR_ADD_USER
});
export const setEmail = (email) => ({
    type: SET_USER_ADD_EMAIL,
    payload: { email }
});
export const setName = (name) => ({
    type: SET_USER_ADD_NAME,
    payload: { name }
});

export const setPassword = (password) => ({
    type: SET_USER_ADD_PASSWORD,
    payload: { password }
});
export const setShowPassword = (showPassword) => ({
    type: SET_USER_ADD_SHOW_PASSWORD,
    payload: { showPassword }
});

export const setInvalidEmail = (invalidEmail) => ({
    type: SET_USER_ADD_INVALID_EMAIL,
    payload: { invalidEmail }
});


export const saveNewUser = (email, name, password) => {
    return dispatch => {
        dispatch(setBackdropOpen())
        config.axiosInstance.post('/users', {
            email,
            name,
            password
        })
            .then(response => {
                if (response.status === 201) {
                    dispatch(openAlert('success', 'Usuário foi adicionado com sucesso!'))
                    dispatch(clearNewUser());
                }
            })
            .catch(_ => {
                dispatch(openAlert('error', 'Ocorreu uma falha ao tentar salvar o usuário!'))
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
}