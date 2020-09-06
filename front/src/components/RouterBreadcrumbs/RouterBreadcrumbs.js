import { Paper } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import './RouterBreadcrumbs.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default function RouterBreadcrumbs() {
  const classes = useStyles();

  return (
    <Paper elevation={3} className="RouterBreadcrumbs_paper">
      <Route>
        {({ location }) => {
          const pathnames = location.pathname.split('/').filter(x => x);
          return (
            <Breadcrumbs aria-label="Breadcrumb">
              <RouterLink color="inherit" to="/">
                Home
            </RouterLink>
              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                  <Typography color="textPrimary" key={to}>
                    {value}
                  </Typography>
                ) : (
                    <RouterLink color="inherit" to={to} key={to}>
                      {value}
                    </RouterLink>
                  );
              })}
            </Breadcrumbs>
          );
        }}
      </Route>
    </Paper>
  );
}
