import { Button, Grid, Paper, TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import Dropzone from 'react-dropzone-uploader';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import { Redirect } from 'react-router-dom';
import config from '../../config';
import { handleDropzoneChangeStatus, setTitle } from '../../redux/actions/albumAdd';
import SessionService from '../../services/SessionService';
import './AlbumAdd.css';


export default function AlbumAdd() {
    const files = useSelector(state => state.albumAdd.files);
    const title = useSelector(state => state.albumAdd.title);
    const albumPhotos = useSelector(state => state.albumAdd.albumPhotos);
    const redirect = useSelector(state => state.albumAdd.redirect);
    const dispatch = useDispatch();

    const handleSaveButton = () => {
        files.forEach(file => {
            file.restart();
        });
    }

    const getUploadParams = ({ meta }) => {
        const headers = { Authorization: SessionService.getAccessToken() };
        const url = `${config.SERVER_URL}/files/upload`
        return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` }, headers }
    }

    const handleSubmit = (_, allFiles) => {
        allFiles.forEach(f => f.remove())
    }

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    if (redirect) {
        return <Redirect to='/albuns' />;
    }
    return (
        <Grid container justify="center" alignItems="center">
            <Paper elevation={3} className="AlbumAdd_detail-paper">
                <TextField
                    value={title}
                    onChange={(event) => dispatch(setTitle(event.target.value))}
                    label="Título"
                    variant="outlined"
                    className="AlbumAdd_form-input" />
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={(_, status, allFiles) => dispatch(handleDropzoneChangeStatus(_, status, allFiles, title, albumPhotos))}
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