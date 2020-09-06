import { Grid, Paper, Typography, IconButton } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import config from '../../config';
import './Posts.css';
import SessionService from '../../services/SessionService';
import { Delete } from '@material-ui/icons';

export default function Posts({ setBackdropOpen }) {
    const [noPostsFound, setNoPostsFound] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        config.axiosInstance.get(`/posts`)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.content.length > 0) {
                        setPosts(res.data.content);
                    } else {
                        setNoPostsFound(true);
                    }
                }
            });
    }

    useEffect(() => {
        fetchPosts();
        return () => null;
    }, [])

    const getPostContent = (blogPost) => {
        if (blogPost.htmlContent.length < 500) {
            return { __html: blogPost.htmlContent }
        }
        return { __html: `${blogPost.htmlContent.substr(0, 500)}...` };
    }

    const removePost = (post) => {
        setBackdropOpen(true);
        config.axiosInstance.delete(`/posts/${post.id}`)
            .then(_ => {
                setBackdropOpen(false);
                fetchPosts();
            })
            .catch(_ => setBackdropOpen(false));
    }

    const user = SessionService.getLoggedUser().user;

    const renderRemovePost = (blogPost) => {
        console.log('user.id === blogPost.authorId ', user.id === blogPost.authorId);
        if (user.id === blogPost.authorId) {
            return (
                <Grid item xs={1}>
                    <IconButton
                        onClick={() => removePost(blogPost)}>
                        <Delete />
                    </IconButton>
                </Grid>
            )
        };
    }

    const renderPosts = () => {
        return posts.map(blogPost => {
            return (
                <Paper elevation={3} className="Posts_paper" key={blogPost.id} >
                    <Grid container direction="row">
                        <Grid item>
                            <Grid container direction="column" className="Posts_post-details">
                                <Grid container>
                                    <Grid item xs={11}>
                                        <Link to={`/posts/${blogPost.id}`}>
                                            <Typography variant="h3"
                                                className="Posts_post-title"
                                            >
                                                {blogPost.title}
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    {renderRemovePost(blogPost)}
                                </Grid>
                                <Grid item md={true} sm={true} xs={true}>
                                    <div dangerouslySetInnerHTML={getPostContent(blogPost)}></div>
                                </Grid>
                                <Grid container direction="row" justify="flex-end" alignContent="flex-end">
                                    <span className="Posts_author-label">
                                        Postado por <b>{blogPost.authorName}</b> em {moment(blogPost.createdAt).format('DD-MM-YYYY')}
                                    </span>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            );
        });
    }

    return (
        <div>
            {
                posts.length === 0 ?
                    <Grid className="Posts_main-container" container direction="column" justify="center" alignItems="center">

                        {noPostsFound ? <Typography variant="h5" className="Posts_no-posts-found">Nenhum post foi encontrado.</Typography> : null}
                    </Grid> :
                    <Grid container direction="column" alignItems="center">
                        {renderPosts()}
                    </Grid>
            }
        </div>
    );
}


