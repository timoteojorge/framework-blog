import { Grid, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Popover from '@material-ui/core/Popover';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import MenuIcon from '@material-ui/icons/Menu';
import PostAdd from '@material-ui/icons/PostAdd';
import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import logoNav from '../../../assets/img/logo-nav.png';
import SessionService from '../../services/SessionService';
import './MenuAppBar.css';
import { PersonAdd, PhotoLibrary, AddAPhoto } from '@material-ui/icons';

const sessionService = SessionService;

export default function MenuAppBar({ accessToken, setAccessToken }) {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    let history = useHistory();

    const handleLogout = () => {
        sessionService.logout();
        setAccessToken(null);
        setAnchorEl(null);
    }

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAllPostsClick = () => {
        setDrawerOpen(false);
        history.push('/posts');
    }
    const handleAddPostClick = () => {
        setDrawerOpen(false);
        history.push('/posts/create');
    }

    const handleAddUserClick = () => {
        setDrawerOpen(false);
        history.push('/users/add');
    }
    const handleAllAlbumsClick = () => {
        setDrawerOpen(false);
        history.push('/albums');
    }
    const handleAddAlmbumClick = () => {
        setDrawerOpen(false);
        history.push('/albums/add');
    }

    const showUserMenu = Boolean(anchorEl);

    const getToolbarContent = () => {
        return (
            <React.Fragment>
                <SwipeableDrawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    onOpen={() => setDrawerOpen(true)}>
                    <List >
                        <ListItem button key="allPosts" onClick={handleAllPostsClick}>
                            <ListItemIcon> <ListIcon /> </ListItemIcon>
                            <ListItemText primary="Todos os posts" />
                        </ListItem>
                        <ListItem button key="addPost" onClick={handleAddPostClick}>
                            <ListItemIcon> <PostAdd /> </ListItemIcon>
                            <ListItemText primary="Adicionar Post" />
                        </ListItem>
                        <ListItem button key="addUser" onClick={handleAddUserClick}>
                            <ListItemIcon> <PersonAdd /> </ListItemIcon>
                            <ListItemText primary="Adicionar Usuário" />
                        </ListItem>
                        <ListItem button key="allAlbums" onClick={handleAllAlbumsClick}>
                            <ListItemIcon> <PhotoLibrary /> </ListItemIcon>
                            <ListItemText primary="Albuns de fotos" />
                        </ListItem>
                        <ListItem button key="addAlbum" onClick={handleAddAlmbumClick}>
                            <ListItemIcon> <AddAPhoto /> </ListItemIcon>
                            <ListItemText primary="Criar album" />
                        </ListItem>
                    </List>
                </SwipeableDrawer>
                <Grid direction="row" container spacing={1} justify="space-between" alignItems="center">
                    <Grid item>
                        <IconButton
                            onClick={() => setDrawerOpen(true)}>
                            <MenuIcon className="form-toolbar" />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <img className="logo-nav" src={logoNav} alt="logo nav" />
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={handleUserMenuClick}>
                            <AccountCircle className="form-toolbar" />
                        </IconButton>
                    </Grid>
                </Grid>
                <Popover
                    open={showUserMenu}
                    anchorEl={anchorEl}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                    <List className="user-menu-container">
                        <ListItem onClick={() => handleLogout()} button>
                            <ListItemIcon> <ExitToApp /> </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItem>
                    </List>
                </Popover>
            </React.Fragment>
        )
    };

    if (accessToken) {
        return (
            <AppBar position="static" color="secondary">
                <Toolbar>
                    {getToolbarContent()}
                </Toolbar>
            </AppBar>
        );
    } else {
        return <Redirect to='/login' />;
    }
}
