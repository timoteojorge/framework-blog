
import { SET_CURRENT_POST, SET_NEW_COMMENT_CONTENT, SET_COMMENTS } from './actionTypes';
import { setBackdropOpen, setBackdropClosed } from './common';
import config from '../../config';

export const setCurrentPost = (currentPost) => ({
    type: SET_CURRENT_POST,
    payload: { currentPost }
});

export const setComments = (comments) => ({
    type: SET_COMMENTS,
    payload: { comments }
});

export const setNewCommentContent = (newCommentContent) => ({
    type: SET_NEW_COMMENT_CONTENT,
    payload: { newCommentContent }
});

export const fetchBlogPost = (id) => {
    return dispatch => {
        dispatch(setBackdropOpen());
        config.axiosInstance.get(`/posts/${id}`)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setCurrentPost(res.data));
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
}

export const fetchComments = (id) => {
    return dispatch => {
        dispatch(setBackdropOpen());
        config.axiosInstance.get(`/posts/${id}/comments`)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setComments(res.data.content));
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
}

export const removeComment = (postId, commentId) => {
    return dispatch => {
        dispatch(setBackdropOpen());
        config.axiosInstance.delete(`/posts/${postId}/comments/${commentId}`)
            .then(() => {
                dispatch(fetchComments(postId));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
}

export const saveNewComment = (newComment, postId, authorId) => {
    return dispatch => {
        dispatch(setBackdropOpen());
        config.axiosInstance.post(`/posts/${postId}/comments`, {
            content: newComment,
            postId,
            authorId
        })
            .then(() => {
                dispatch(setNewCommentContent(''))
                dispatch(fetchComments(postId));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
}