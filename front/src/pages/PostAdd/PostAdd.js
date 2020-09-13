import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addNewPost, setEditorState, setHtmlContent, setTitle } from '../../redux/actions/postAdd';
import SessionService from '../../services/SessionService';
import './PostAdd.css';

const sessionService = SessionService;

export default function PostAdd() {

    const editorState = useSelector(state => state.postAdd.editorState);
    const htmlContent = useSelector(state => state.postAdd.htmlContent);
    const redirect = useSelector(state => state.postAdd.redirect);
    const title = useSelector(state => state.postAdd.title);
    const authorId = sessionService.getLoggedUser().user.id;
    const dispatch = useDispatch();

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
        dispatch(setHtmlContent(draftToHtml(convertToRaw(event.getCurrentContent()))));
        dispatch(setEditorState(event));
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
                                onChange={(event) => dispatch(setTitle(event.target.value))}
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
                        onClick={() => dispatch(addNewPost(authorId, htmlContent, title))}
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