import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Redirect } from 'react-router-dom';
import config from '../../config';
import SessionService from '../../services/SessionService';
import './PostAdd.css';

const sessionService = SessionService;

export default function PostAdd({ setBackdropOpen }) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [htmlContent, setHtmlContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState('');

    const handleSaveButton = () => {
        const authorId = sessionService.getLoggedUser().user.id;
        setBackdropOpen(true);
        config.axiosInstance.post('/posts', {
            authorId,
            htmlContent,
            title
        })
            .then(response => {
                setBackdropOpen(false);
                if (response.status === 201) {
                    setRedirect(true);
                }
            })
            .catch((err) => setBackdropOpen(false))
    }

    function uploadImageCallBack(file) {
        // TO-DO
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
                const data = new FormData(); // eslint-disable-line no-undef
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            },
        );
    }

    const handleEditorChanges = (event) => {
        setHtmlContent(draftToHtml(convertToRaw(event.getCurrentContent())));
        setEditorState(event);
    }
    if (redirect) {
        return <Redirect to='/posts' />;
    }
    return (
        <div>
            <Grid container justify="center" alignItems="center">
                <Paper elevation={3} className={`PostAdd_detail-paper`}>
                    <Grid container>
                        <form noValidate autoComplete="off">
                            <TextField
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                label="Título"
                                variant="outlined"
                                className="PostAdd_form-input" />
                            <Grid item className="PostAdd_detail-text">
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={handleEditorChanges}
                                    toolbar={{
                                        image: {
                                            uploadCallback: uploadImageCallBack,
                                        }
                                    }}
                                />
                            </Grid>
                        </form>
                    </Grid>

                    <Button
                        disabled={!editorState.getCurrentContent().hasText() || title === ''}
                        onClick={handleSaveButton}
                        className="PostAdd_Save-button"
                        size="large"
                        variant="contained"
                        color="primary"
                        style={{ textTransform: "none" }}>Salvar</Button>
                </Paper>
            </Grid>

        </div>
    )
}