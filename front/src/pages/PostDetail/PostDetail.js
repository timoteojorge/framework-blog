import { Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Comments from '../../components/Comments';
import NewComment from '../../components/NewComment';
import config from '../../config';
import './PostDetail.css';

export default function PostDetail({ setBackdropOpen }) {

    let { id } = useParams();
    const [blogPost, setBlogPost] = useState({});
    const [comments, setComments] = useState([]);

    const fetchBlogPost = () => {
        setBackdropOpen(true);
        config.axiosInstance.get(`/posts/${id}`)
            .then(res => {
                setBackdropOpen(false);
                if (res.status === 200) {
                    setBlogPost(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
                setBackdropOpen(false);
            });
    }

    const fetchComments = () => {
        setBackdropOpen(true);
        config.axiosInstance.get(`/posts/${id}/comments`)
            .then(res => {
                setBackdropOpen(false);
                if (res.status === 200) {
                    setComments(res.data.content);
                }
            })
            .catch((err) => {
                console.log(err);
                setBackdropOpen(false);
            });
    }

    const removeComment = (commentId) => {
        setBackdropOpen(true);
        config.axiosInstance.delete(`/posts/${id}/comments/${commentId}`)
            .then(_ => {
                setBackdropOpen(false);
                fetchComments();
            })
            .catch((err) => {
                console.log(err);
                setBackdropOpen(false);
            });
    }

    useEffect(() => {
        fetchBlogPost();
        fetchComments();
        return () => { }
    }, []);

    return (
        <div>
            <Paper elevation={3} className="PostDetail_detail-paper">
                <Grid container direction="column">
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Typography variant="h4" className="PostDetail_detail-toolbar-title">
                            {blogPost.title}
                        </Typography>
                        <span className="PostDetail_author-label">
                            Postado por <b>{blogPost.author ? blogPost.author.name : ''}</b> em {moment(blogPost.createdAt).format('DD-MM-YYYY')}
                        </span>
                    </Grid>
                    <Grid item >

                    </Grid>
                    <Grid item className="PostDetail_detail-text">
                        <div dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}></div>
                    </Grid>
                    {blogPost.id && (
                        <NewComment
                            fetchComments={() => fetchComments()}
                            postId={blogPost.id}
                            setBackdropOpen={setBackdropOpen} />
                    )}
                    {blogPost.id && (
                        <Comments
                            removeComment={removeComment}
                            comments={comments} />
                    )}

                </Grid>
            </Paper>
        </div>
    )
}