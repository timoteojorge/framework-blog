import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import MenuAppBar from './components/MenuAppBar';
import Login from './pages/Login';
import PostAdd from './pages/PostAdd';
import PostDetail from './pages/PostDetail';
import Posts from './pages/Posts';
import UserAdd from './pages/UserAdd';
import SessionService from './services/SessionService';
import AlbumAdd from './pages/AlbumAdd';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  contentWidth: {
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%',
    },
    margin: 'auto'
  },
}));

function PrivateRoute({ children, accessToken, exact, ...rest }) {
  return (
    <Route exact={exact} strict
      {...rest}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
const sessionService = SessionService;

export default function App() {
  const storedAccessToken = sessionService.getAccessToken();
  const [accessToken, setAccessToken] = useState(storedAccessToken);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const classes = useStyles();

  const renderMenu = () => {
    if (accessToken) {
      return (
        <MenuAppBar
          accessToken={accessToken}
          setAccessToken={setAccessToken} />
      )
    }
  }
  const renderBackdrop = () => {
    return (
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress size={120} thickness={4} color="primary" />
      </Backdrop>);
  }

  return (
    <React.Fragment>
      {renderMenu()}
      {renderBackdrop()}
      <div className={classes.contentWidth}>
        <Switch>
          <Route path="/login">
            <Login setAccessToken={setAccessToken} />
          </Route>
          <PrivateRoute exact={true} path="/posts/create" accessToken={accessToken}>
            <PostAdd setBackdropOpen={setBackdropOpen} />
          </PrivateRoute>
          <PrivateRoute path="/posts/:id" accessToken={accessToken}>
            <PostDetail setBackdropOpen={setBackdropOpen} />
          </PrivateRoute>
          <PrivateRoute path="/posts" accessToken={accessToken}>
            <Posts setBackdropOpen={setBackdropOpen} />
          </PrivateRoute>
          <PrivateRoute exact={true} path="/users/add" accessToken={accessToken}>
            <UserAdd setBackdropOpen={setBackdropOpen} />
          </PrivateRoute>
          <PrivateRoute exact={true} path="/albums/add" accessToken={accessToken}>
            <AlbumAdd setBackdropOpen={setBackdropOpen} />
          </PrivateRoute>
          <PrivateRoute exact={true} path="/albums" accessToken={accessToken}>
            <UserAdd setBackdropOpen={setBackdropOpen} />
          </PrivateRoute>
          <Route path="/">
            <Redirect to={{ pathname: "/login" }} />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}
