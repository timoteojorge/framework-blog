import { ALBUMS_FETCH_ALBUMS_SUCCESS, ALBUMS_NO_ALBUMS_FOUND } from "../actions/actionTypes";


export default function (state = {}, action) {
    switch (action.type) {
        case ALBUMS_FETCH_ALBUMS_SUCCESS: {
            const { currentPage, isLastPage, data } = action.payload;
            return {
                ...state,
                currentPage,
                isLastPage,
                data: currentPage === 0 ? [...data] : [...state.data, ...data]
            }
        }
        case ALBUMS_NO_ALBUMS_FOUND: {
            return {
                ...state,
                noAlbumsFound: true
            }
        }
        default:
            return state;
    }
}
