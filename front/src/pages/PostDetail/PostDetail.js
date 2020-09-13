import { Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Comments from '../../components/Comments';
import NewComment from '../../components/NewComment';
import { fetchBlogPost, fetchComments } from '../../redux/actions/postDetails';
import './PostDetail.css';

export default function PostDetail() {

    let { id } = useParams();
    const dispatch = useDispatch();

    const currentPost = useSelector(state => state.postDetails.currentPost)
    const comments = useSelector(state => state.postDetails.comments)

    useEffect(() => {
        dispatch(fetchBlogPost(id))
        dispatch(fetchComments(id));
        return () => { }
    }, []);

    return (
        <div>
            <Paper elevation={3} className="PostDetail_detail-paper">
                <Grid container direction="column">
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Typography variant="h4" className="PostDetail_detail-toolbar-title">
                            {currentPost.title}
                        </Typography>
                        <span className="PostDetail_author-label">
                            Postado por <b>{currentPost.author ? currentPost.author.name : ''}</b> em {moment(currentPost.createdAt).format('DD-MM-YYYY')}
                        </span>
                    </Grid>
                    <Grid item >

                    </Grid>
                    <Grid item className="PostDetail_detail-text">
                        <div dangerouslySetInnerHTML={{ __html: currentPost.htmlContent }}></div>
                    </Grid>
                    {currentPost.id && (
                        <NewComment />
                    )}
                    {currentPost.id && (
                        <Comments
                            comments={comments} />
                    )}

                </Grid>
            </Paper>
        </div>
    )
}