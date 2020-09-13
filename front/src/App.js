import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import 'react-dropzone-uploader/dist/styles.css';
import "react-image-gallery/styles/css/image-gallery.css";
import { Provider } from 'react-redux';
import { Redirect, Route, Switch } from "react-router-dom";
import AlertMessage from './components/AlertMessage';
import MenuAppBar from './components/MenuAppBar';
import ProgressBackdrop from './components/ProgressBackdrop';
import RouterBreadcrumbs from './components/RouterBreadcrumbs/RouterBreadcrumbs';
import AlbumAdd from './pages/AlbumAdd';
import Albums from './pages/Albums/Albums';
import Login from './pages/Login';
import PostAdd from './pages/PostAdd';
import PostDetail from './pages/PostDetail';
import Posts from './pages/Posts';
import UserAdd from './pages/UserAdd';
import store from './redux/store';
import SessionService from './services/SessionService';


const useStyles = makeStyles((theme) => ({
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
  alert: {
    marginTop: 10
  }
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

  const renderBreadcrumb = () => {
    if (accessToken) {
      return (
        <RouterBreadcrumbs></RouterBreadcrumbs>
      );
    }
  }

  return (
    <React.Fragment>
      <Provider store={store}>
        {renderMenu()}
        <ProgressBackdrop />
        <div className={classes.contentWidth}>
          <AlertMessage />
          {renderBreadcrumb()}
          <Switch>
            <Route path="/login">
              <Login setAccessToken={setAccessToken} />
            </Route>
            <PrivateRoute exact={true} path="/posts/adicionar" accessToken={accessToken}>
              <PostAdd />
            </PrivateRoute>
            <PrivateRoute path="/posts/:id" accessToken={accessToken}>
              <PostDetail />
            </PrivateRoute>
            <PrivateRoute path="/posts" accessToken={accessToken}>
              <Posts />
            </PrivateRoute>
            <PrivateRoute exact={true} path="/usuarios/adicionar" accessToken={accessToken}>
              <UserAdd />
            </PrivateRoute>
            <PrivateRoute exact={true} path="/albuns/adicionar" accessToken={accessToken}>
              <AlbumAdd />
            </PrivateRoute>
            <PrivateRoute exact={true} path="/albuns" accessToken={accessToken}>
              <Albums />
            </PrivateRoute>
            <Route path="/">
              <Redirect to={{ pathname: "/login" }} />
            </Route>
          </Switch>
        </div>
      </Provider>
    </React.Fragment>
  );
}
