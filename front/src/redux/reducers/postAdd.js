import { POST_ADD_SET_EDITOR_STATE, POST_ADD_SET_HTML_CONTENT, POST_ADD_SET_REDIRECT, POST_ADD_SET_TITLE } from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case POST_ADD_SET_TITLE: {
            const title = action.payload;
            return Object.assign({}, state, {
                title
            });
        }
        case POST_ADD_SET_HTML_CONTENT: {
            const htmlContent = action.payload;
            return Object.assign({}, state, {
                htmlContent
            });
        }
        case POST_ADD_SET_EDITOR_STATE: {
            const editorState = action.payload;
            return Object.assign({}, state, {
                editorState
            });
        }
        case POST_ADD_SET_REDIRECT: {
            const redirect = action.payload;
            return Object.assign({}, state, {
                redirect
            });
        }
        default:
            return state;
    }
}
