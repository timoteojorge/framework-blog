

import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import { saveNewComment, setNewCommentContent } from '../../redux/actions/postDetails';
import SessionService from '../../services/SessionService';
import './NewComment.css';

export default function NewComment() {

    const sessionService = SessionService;
    const newComment = useSelector(state => state.postDetails.newCommentContent);
    const postId = useSelector(state => state.postDetails.currentPost.id);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <div className="NewComment_container">
                <textarea
                    className="NewComment_textarea"
                    value={newComment}
                    onChange={(event) => dispatch(setNewCommentContent(event.target.value))}
                    rows="4"
                    cols="50"
                    placeholder="Insira seu comentário :)">
                </textarea>
                <Button
                    className="NewComment_button"
                    disabled={newComment === ''}
                    onClick={() => dispatch(saveNewComment(newComment, postId, sessionService.getLoggedUser().user.id))}
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}>Enviar</Button>
            </div>

        </React.Fragment>
    );
}