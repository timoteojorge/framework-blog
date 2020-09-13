import { Button, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchPosts, removePost } from '../../redux/actions/posts';
import SessionService from '../../services/SessionService';
import './Posts.css';


export default function Posts() {

    const noPostsFound = useSelector(state => state.posts.noPostsFound);
    const currentPage = useSelector(state => state.posts.currentPage);
    const isLastPage = useSelector(state => state.posts.isLastPage);
    const posts = useSelector(state => state.posts.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(0));
        return () => null;
    }, [])

    const getPostContent = (blogPost) => {
        if (blogPost.htmlContent.length < 500) {
            return { __html: blogPost.htmlContent }
        }
        return { __html: `${blogPost.htmlContent.substr(0, 500)}...` };
    }

    const user = SessionService.getLoggedUser().user;

    const renderRemovePost = (blogPost) => {
        if (user.id === blogPost.authorId) {
            return (
                <Grid item xs={1}>
                    <IconButton
                        onClick={() => dispatch(removePost(blogPost.id))}>
                        <Delete />
                    </IconButton>
                </Grid>
            )
        };
    }

    const renderMoreButton = () => {
        if (!isLastPage) {
            return (
                <Button
                    onClick={() => dispatch(fetchPosts(currentPage + 1))}
                    className="PostAdd_Save-button"
                    size="large"
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}>Carregar Mais</Button>
            );
        }
    }

    const renderPosts = () => {
        console.log('posts :>> ', posts);
        return posts && posts.map(blogPost => {
            return (
                <Paper elevation={3} className="Posts_paper" key={blogPost.id} >
                    <Grid container direction="row">
                        <Grid item className="Posts_card-content">
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
                posts && posts.length === 0 ?
                    <Grid className="Posts_main-container" container direction="column" justify="center" alignItems="center">
                        {noPostsFound ? <Typography variant="h5" className="Posts_no-posts-found">Nenhum post foi encontrado.</Typography> : null}
                    </Grid> :
                    <Grid container direction="column" alignItems="center">
                        {renderPosts()}
                        {renderMoreButton()}
                    </Grid>
            }
        </div>
    );
}


