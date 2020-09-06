import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import { Redirect } from 'react-router-dom';
import { Subject } from 'rxjs';
import config from '../../config';
import SessionService from '../../services/SessionService';
import './AlbumAdd.css';


export default function AlbumAdd({ setBackdropOpen }) {
    const [files, setFiles] = useState([]);
    const [albumPhotos, setAlbumPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [redirect, setRedirect] = useState(false);
    const onAllFilesUploaded = new Subject();
    let onAllFilesUploadedSubscription;

    onAllFilesUploadedSubscription = onAllFilesUploaded.subscribe(photos => {
        config.axiosInstance.post('/albums', {
            title,
            albumPhotos: photos
        })
            .then(response => {
                if (response.status === 201) {
                    setRedirect(true);
                }
            })
            .finally(() => setBackdropOpen(false));
    });

    const handleSaveButton = () => {
        setBackdropOpen(true);
        files.forEach(file => {
            file.restart();
        });
    }

    const getUploadParams = ({ meta }) => {
        const headers = { Authorization: SessionService.getAccessToken() };
        const url = `${config.SERVER_URL}/files/upload`
        return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` }, headers }
    }

    const handleChangeStatus = (_, status, allFiles) => {
        if (status === 'ready') {
            setFiles(allFiles);
        }
        if (status === 'done') {
            let photos = [...albumPhotos];
            photos.push(JSON.parse(_.xhr.response));
            setAlbumPhotos(photos);
            const allFilesUploaded = allFiles.every(fileWithMeta => fileWithMeta.meta.status === 'done')
            if (allFilesUploaded) {
                onAllFilesUploaded.next(photos);
            }
        }

    }

    const handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
    }

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
        return () => onAllFilesUploadedSubscription.unsubscribe();
    }, []);

    if (redirect) {
        return <Redirect to='/albums' />;
    }
    return (
        <Grid container justify="center" alignItems="center">
            <Paper elevation={3} className="AlbumAdd_detail-paper">
                <TextField
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    label="Título"
                    variant="outlined"
                    className="AlbumAdd_form-input" />
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    inputWithFilesContent="Adicionar mais arquivos"
                    submitButtonDisabled={true}
                    accept="image/*"
                    canRestart={false}
                    autoUpload={false}
                    inputContent={(_, extra) => (extra.reject ? 'Somente arquivos de imagem' : 'Arraste arquivos aqui ou clique para selecionar')}
                    styles={{
                        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                        inputLabel: (_, extra) => (extra.reject ? { color: 'red' } : {}),
                    }}
                />
                <Button
                    disabled={title === '' || files.length === 0}
                    onClick={handleSaveButton}
                    className="AlbumAdd-Save-button"
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}>Salvar</Button>
            </Paper>
        </Grid>

    );
}