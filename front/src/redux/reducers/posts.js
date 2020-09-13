import { FETCH_POSTS_STARTED, FETCH_POSTS_ERROR, FETCH_POSTS_SUCCESS } from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS_STARTED: {
            return Object.assign({}, state);
        }
        case FETCH_POSTS_ERROR: {
            const error = action.payload;
            return Object.assign({}, state, {
                error
            });
        }
        case FETCH_POSTS_SUCCESS: {
            const { data, currentPage, isLastPage } = action.payload;
            return Object.assign({}, state, {
                data: currentPage === 0 ? [...data] : [...state.data, ...data],
                currentPage,
                isLastPage,
                error: '',
                noPostsFound: state.data.length === 0
            });
        }
        default:
            return state;
    }
}
