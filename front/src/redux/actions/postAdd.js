
import config from '../../config';
import { POST_ADD_SET_EDITOR_STATE, POST_ADD_SET_TITLE, POST_ADD_SET_REDIRECT, POST_ADD_SET_HTML_CONTENT } from './actionTypes';
import { openAlert, setBackdropClosed, setBackdropOpen } from './common';

export const setTitle = (title) => ({
    type: POST_ADD_SET_TITLE,
    payload: title
});

export const setHtmlContent = (htmlContent) => ({
    type: POST_ADD_SET_HTML_CONTENT,
    payload: htmlContent
});

export const setEditorState = (editorState) => ({
    type: POST_ADD_SET_EDITOR_STATE,
    payload: editorState
});

export const setRedirect = (redirect) => ({
    type: POST_ADD_SET_REDIRECT,
    payload: redirect
});

export const addNewPost = (authorId, htmlContent, title) => {
    return dispatch => {
        dispatch(setBackdropOpen());
        config.axiosInstance.post('/posts', {
            authorId,
            htmlContent,
            title
        })
            .then(response => {
                if (response.status === 201) {
                    dispatch(setRedirect(true));
                }
            })
            .catch((err) => {
                console.log(err);
                dispatch(openAlert('error', 'Ocorreu um erro ao salvar o post'));
            })
            .finally(() => dispatch(setBackdropClosed()))
    }
}
