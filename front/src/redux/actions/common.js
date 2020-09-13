const { SET_BACKDROP_OPEN, SET_BACKDROP_CLOSED, SET_ALERT_OPEN, SET_ALERT_CLOSED } = require("./actionTypes")

export const setBackdropOpen = () => ({
    type: SET_BACKDROP_OPEN
})

export const setBackdropClosed = () => ({
    type: SET_BACKDROP_CLOSED
})

const setAlertOpen = (type, message) => ({
    type: SET_ALERT_OPEN,
    payload: {
        type,
        message
    }
})

const setAlertClosed = () => ({
    type: SET_ALERT_CLOSED
})

export const openAlert = (type, message) => {
    return (dispatch) => {
        dispatch(setAlertOpen(type, message));
        setTimeout(() => dispatch(setAlertClosed()), 4000);
    }
}