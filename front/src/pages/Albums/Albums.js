import { Grid, IconButton, Paper, Typography, Button } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import config from '../../config';
import SessionService from '../../services/SessionService';
import './Albums.css';

export default function Albums({ setBackdropOpen }) {
    const [noAlbumsFound, setNoAlbumsFound] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);

    const fetchAlbums = (page) => {
        config.axiosInstance.get(`/albums?page=${page}`)
            .then(res => {
                if (res.status === 200) {
                    setCurrentPage(res.data.pageable.pageNumber);
                    setIsLastPage(res.data.last);
                    if (res.data.content.length > 0) {
                        setAlbums([...albums, ...res.data.content]);
                    } else {
                        setNoAlbumsFound(true);
                    }
                }
            });
    }

    useEffect(() => {
        fetchAlbums(0);
        return () => null;
    }, [])


    const removePost = (post) => {
        setBackdropOpen(true);
        config.axiosInstance.delete(`/albums/${post.id}`)
            .then(_ => {
                setBackdropOpen(false);
                fetchAlbums();
            })
            .catch(_ => setBackdropOpen(false));
    }

    const user = SessionService.getLoggedUser().user;

    const renderRemoveAlbum = (album) => {
        if (user.id === album.authorId) {
            return (
                <Grid item xs={1}>
                    <IconButton
                        onClick={() => removePost(album)}>
                        <Delete />
                    </IconButton>
                </Grid>
            )
        };
    }

    const renderAlbumGallery = (album) => {
        let images = [];
        album.albumPhotos.forEach(photo => {
            let image = new Image();
            image.src = `data:${photo.fileType};base64,${photo.data}`;
            images.push(
                {
                    original: image.src,
                    thumbnail: image.src,
                }
            )
        });
        return (
            <ImageGallery items={images} />
        );
    }

    const renderMoreButton = () => {
        if (!isLastPage) {
            return (
                <Button
                    onClick={() => fetchAlbums(currentPage + 1)}
                    className="AlbumAdd-Save-button"
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}>Carregar Mais</Button>
            );
        }
    }

    const renderAlbums = () => {
        return albums.map(album => {
            return (
                <Paper elevation={3} className="Albums_paper" key={album.id} >
                    <Grid container direction="row" justify="center" alignContent="center">
                        <Grid item className="Albums_content">
                            <Grid container direction="column" className="Albums_details">
                                <Grid container>
                                    <Grid item xs={11}>
                                        <Typography variant="h3">
                                            {album.title}
                                        </Typography>
                                    </Grid>
                                    {renderRemoveAlbum(album)}
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    {renderAlbumGallery(album)}
                                </Grid>
                                <Grid container direction="row" justify="flex-end" alignContent="flex-end">
                                    <span className="Albums_author-label">
                                        Postado por <b>{album.authorName}</b> em {moment(album.createdAt).format('DD-MM-YYYY')}
                                    </span>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            );
        });
    }

    return (
        <div>
            {
                albums.length === 0 ?
                    <Grid className="Albums_main-container" container direction="column" justify="center" alignItems="center">
                        {noAlbumsFound ? <Typography variant="h5" className="Albums_no-albums-found">Nenhum Album foi encontrado.</Typography> : null}
                    </Grid> :
                    <Grid container direction="column" alignItems="center">
                        {renderAlbums()}
                        {renderMoreButton()}
                    </Grid>
            }
        </div>
    );
}


