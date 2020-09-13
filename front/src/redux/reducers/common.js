import { SET_BACKDROP_OPEN, SET_BACKDROP_CLOSED, SET_ALERT_OPEN, SET_ALERT_CLOSED } from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case SET_BACKDROP_OPEN: {
            return {
                ...state,
                backdropOpen: true
            }
        }
        case SET_BACKDROP_CLOSED: {
            return {
                ...state,
                backdropOpen: false
            }
        }
        case SET_ALERT_OPEN: {
            const { message, type } = action.payload;
            return {
                ...state,
                alert: {
                    open: true,
                    message,
                    type
                }
            }
        }
        case SET_ALERT_CLOSED: {
            return {
                ...state,
                backdropOpen: false,
                alert: {
                    open: false,
                    message: null,
                    type: null
                }
            }
        }
        default:
            return state;
    }
}
