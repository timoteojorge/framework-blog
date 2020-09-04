import { Grid, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import config from '../../config';
import './AlbumAdd.css';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

export default function AlbumAdd() {
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');

    const upload = (file) => {
        config.axiosInstance.post(`/files/upload`, file)
            .then(response => {
                console.log('response :>> ', response);
            })
            .catch(err => console.log('err :>> ', err));
    }

    const onDropFile = (accepted, rejected) => {
        let blobPromise = new Promise((resolve) => {
            const reader = new window.FileReader();
            reader.readAsDataURL(accepted[0]);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            };
        });
        blobPromise.then(value => {
            upload(value);
        });
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles, rejectedFiles) => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            return onDropFile(acceptedFiles, rejectedFiles);
        }
    });

    // files.forEach(f => {
    //     console.log('f :>> ', f);
    //     upload(f);
    // })

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <Grid container justify="center" alignItems="center">
            <Paper elevation={3} className="AlbumAdd_detail-paper">
                <TextField
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    label="Título"
                    variant="outlined"
                    className="AlbumAdd_form-input" />
                <section className="container">
                    <div {...getRootProps({ className: 'AlbumAdd-dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Arraste arquivos aqui ou click para selecionar</p>
                    </div>
                    <aside style={thumbsContainer}>
                        {thumbs}
                    </aside>
                </section>
            </Paper>
        </Grid>

    );
}