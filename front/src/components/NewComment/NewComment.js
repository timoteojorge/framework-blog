

import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import config from '../../config';
import SessionService from '../../services/SessionService';
import './NewComment.css';


export default function NewComment({ setBackdropOpen, postId, fetchComments }) {

    const [newComment, setNewComment] = useState('');
    const sessionService = SessionService;

    const handleSaveComment = () => {
        setBackdropOpen(true);
        config.axiosInstance.post(`/posts/${postId}/comments`, {
            content: newComment,
            postId,
            authorId: sessionService.getLoggedUser().user.id
        })
            .then(res => {
                setBackdropOpen(false);
                setNewComment('')
                fetchComments();
            })
            .catch((err) => {
                console.log(err);
                setBackdropOpen(false);
            });
    }

    return (
        <React.Fragment>
            <div className="NewComment_container">
                <textarea
                    className="NewComment_textarea"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    rows="4"
                    cols="50"
                    placeholder="Insira seu comentário :)">
                </textarea>
                <Button
                    className="NewComment_button"
                    disabled={newComment === ''}
                    onClick={handleSaveComment}
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}>Enviar</Button>
            </div>

        </React.Fragment>
    );
}