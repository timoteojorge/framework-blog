import { SET_COMMENTS, SET_CURRENT_POST, SET_NEW_COMMENT_CONTENT } from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_POST: {
            const { currentPost } = action.payload;
            return Object.assign({}, state, {
                currentPost
            });
        }
        case SET_COMMENTS: {
            const { comments } = action.payload;
            return Object.assign({}, state, {
                comments
            });
        }
        case SET_NEW_COMMENT_CONTENT: {
            const { newCommentContent } = action.payload;
            return Object.assign({}, state, {
                newCommentContent
            });
        }
        default:
            return state;
    }
}
