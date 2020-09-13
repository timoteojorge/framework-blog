import config from "../../config"
import { openAlert, setBackdropClosed, setBackdropOpen } from "./common"
import { ALBUM_ADD_SET_FILES, ALBUM_ADD_SET_ALBUM_PHOTOS, ALBUM_ADD_SET_TITLE, ALBUM_ADD_SET_REDIRECT } from './actionTypes'

export const setFiles = (files) => ({
    type: ALBUM_ADD_SET_FILES,
    payload: files
});

export const setAlbumPhotos = (albumPhotos) => ({
    type: ALBUM_ADD_SET_ALBUM_PHOTOS,
    payload: albumPhotos
});

export const setTitle = (title) => ({
    type: ALBUM_ADD_SET_TITLE,
    payload: title
});

export const setRedirect = (redirect) => ({
    type: ALBUM_ADD_SET_REDIRECT,
    payload: redirect
});

export const saveAlbum = (title, photos) => {
    return dispatch => {
        dispatch(setBackdropOpen());
        config.axiosInstance.post('/albums', {
            title,
            albumPhotos: photos
        })
            .then(response => {
                if (response.status === 201) {
                    dispatch(setRedirect(true));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(openAlert('error', 'Ocorreu um erro ao salvar o album.'));
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
}

export const handleDropzoneChangeStatus = (_, status, allFiles, title, albumPhotos) => {
    return dispatch => {
        if (status === 'ready') {
            dispatch(setFiles(allFiles));
        }
        if (status === 'done') {
            let photos = [...albumPhotos];
            photos.push(JSON.parse(_.xhr.response));
            dispatch(setAlbumPhotos(photos));
            const allFilesUploaded = allFiles.every(fileWithMeta => fileWithMeta.meta.status === 'done')
            if (allFilesUploaded) {
                dispatch(saveAlbum(title, photos));
            }
        }
    }

}
