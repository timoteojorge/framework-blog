import { ALBUM_ADD_SET_ALBUM_PHOTOS, ALBUM_ADD_SET_FILES, ALBUM_ADD_SET_REDIRECT, ALBUM_ADD_SET_TITLE } from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case ALBUM_ADD_SET_FILES: {
            const files = action.payload;
            return {
                ...state,
                files
            }
        }
        case ALBUM_ADD_SET_ALBUM_PHOTOS: {
            const albumPhotos = action.payload;
            return {
                ...state,
                albumPhotos
            }
        }
        case ALBUM_ADD_SET_TITLE: {
            const title = action.payload;
            return {
                ...state,
                title
            }
        }
        case ALBUM_ADD_SET_REDIRECT: {
            const redirect = action.payload;
            return {
                ...state,
                redirect
            }
        }
        default:
            return state;
    }
}
