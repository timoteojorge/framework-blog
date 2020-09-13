

import { Avatar, Grid, makeStyles, IconButton } from '@material-ui/core';
import React from 'react';
import anonymousUserImage from '../../../assets/img/avatar.jpeg';
import './Comments.css';
import { Delete } from '@material-ui/icons';
import SessionService from '../../services/SessionService';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import { removeComment } from '../../redux/actions/postDetails';

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

export default function Comments({ comments }) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = SessionService.getLoggedUser().user;

    const renderRemove = (singleComment) => {
        if (user.id === singleComment.authorId) {
            return (
                <Grid item xs={1}>
                    <IconButton
                        onClick={() => dispatch(removeComment(singleComment.postId, singleComment.id))}>
                        <Delete />
                    </IconButton>
                </Grid>
            )
        }

    }

    return comments.map(singleComment => {
        return (
            <div key={singleComment.id}>
                <Grid container direction="row" className="Comments_container">
                    <Grid item xs={1}>
                        <Avatar src={anonymousUserImage} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={11} className="Comments_content_container">
                        <Grid container direction="row">
                            <Grid item xs={11}>
                                <Grid container direction="column">
                                    <span>
                                        <b>{singleComment.authorName}</b>
                                    </span>
                                    <span>
                                        {singleComment.content}
                                    </span>
                                </Grid>
                            </Grid>
                            {renderRemove(singleComment)}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    });
}