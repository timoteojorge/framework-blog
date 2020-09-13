import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers";

const initialState = {
    posts: {
        data: [],
        currentPage: 0,
        isLastPage: false,
        error: '',
        noPostsFound: false
    },
    common: {
        backdropOpen: false,
        alert: {
            open: false,
            type: null,
            message: null
        }
    },
    postDetails: {
        currentPost: {},
        comments: [],
        newCommentContent: ''
    },
    userAdd: {
        name: '',
        email: '',
        password: '',
        showPassword: false,
        invalidEmail: false
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

