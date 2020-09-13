import { CLEAR_ADD_USER, SET_USER_ADD_EMAIL, SET_USER_ADD_INVALID_EMAIL, SET_USER_ADD_NAME, SET_USER_ADD_PASSWORD, SET_USER_ADD_SHOW_PASSWORD } from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case CLEAR_ADD_USER: {
            return Object.assign({}, state, {
                name: '',
                email: '',
                password: ''
            });
        }
        case SET_USER_ADD_EMAIL: {
            const { email } = action.payload;
            return Object.assign({}, state, {
                email
            });
        }
        case SET_USER_ADD_NAME: {
            const { name } = action.payload;
            return Object.assign({}, state, {
                name
            });
        }
        case SET_USER_ADD_PASSWORD: {
            const { password } = action.payload;
            return Object.assign({}, state, {
                password
            });
        }
        case SET_USER_ADD_SHOW_PASSWORD: {
            const { showPassword } = action.payload;
            return Object.assign({}, state, {
                showPassword
            });
        }
        case SET_USER_ADD_INVALID_EMAIL: {
            const { invalidEmail } = action.payload;
            return Object.assign({}, state, {
                invalidEmail
            });
        }
        default:
            return state;
    }
}
