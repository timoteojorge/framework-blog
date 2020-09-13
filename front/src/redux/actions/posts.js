import config from "../../config";
import { FETCH_POSTS_ERROR, FETCH_POSTS_SUCCESS } from "./actionTypes";
import { openAlert, setBackdropClosed, setBackdropOpen } from "./common";

const fetchPostsSuccess = (data, currentPage, isLastPage) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: { data, currentPage, isLastPage }
});

const fetchPostsError = (error) => ({
    type: FETCH_POSTS_ERROR,
    payload: error
});

export const fetchPosts = (currentPage) => {
    return (dispatch) => {
        dispatch(setBackdropOpen());
        config.axiosInstance.get(`/posts?page=${currentPage}`)
            .then(res => {
                dispatch(fetchPostsSuccess(res.data.content, res.data.pageable.pageNumber, res.data.last));
            }, err => {
                dispatch(fetchPostsError(err));
            }).finally(() => dispatch(setBackdropClosed()));
    }
};
export const removePost = (postId) => {
    return (dispatch) => {
        dispatch(setBackdropOpen());
        config.axiosInstance.delete(`/posts/${postId}`)
            .then(() => {
                dispatch(openAlert('success', 'Post removido com sucesso'));
                dispatch(fetchPosts(0));
            })
            .catch(error => {
                console.log(error);
                dispatch(openAlert('error', 'Um erro ocorreu ao tentar remover o post'));
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
};