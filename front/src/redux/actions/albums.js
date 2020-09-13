import config from "../../config"
import { openAlert, setBackdropClosed, setBackdropOpen } from "./common"
import { ALBUMS_FETCH_ALBUMS_SUCCESS, ALBUMS_NO_ALBUMS_FOUND } from './actionTypes'

export const fetchAlbumsSuccess = (currentPage, isLastPage, data) => ({
    type: ALBUMS_FETCH_ALBUMS_SUCCESS,
    payload: {
        currentPage,
        isLastPage,
        data
    }
})

export const setNoAlbumsFound = () => ({
    type: ALBUMS_NO_ALBUMS_FOUND
})

export const fetchAlbums = (page) => {
    return dispatch => {
        dispatch(setBackdropOpen())
        config.axiosInstance.get(`/albums?page=${page}`)
            .then(res => {
                if (res.status === 200) {
                    dispatch(fetchAlbumsSuccess(res.data.pageable.pageNumber, res.data.last, res.data.content));
                    if (res.data.content.length === 0) {
                        dispatch(setNoAlbumsFound());
                    }
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(openAlert('error', 'Ocorreu um erro ao recuperar a lista de albums'))
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
}

export const removeAlbum = (albumId) => {
    return dispatch => {
        dispatch(setBackdropOpen());
        config.axiosInstance.delete(`/albums/${albumId}`)
            .then(() => {
                dispatch(openAlert('success', 'Album removido com sucesso'));
                dispatch(fetchAlbums(0));
            })
            .catch(err => {
                console.log(err);
                dispatch(openAlert('error', 'Ocorreu um erro ao remover o album'));
            })
            .finally(() => dispatch(setBackdropClosed()));
    }
}