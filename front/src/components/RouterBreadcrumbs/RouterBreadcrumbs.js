import { Paper } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import './RouterBreadcrumbs.css';

export default function RouterBreadcrumbs() {
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
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Typography>
                ) : (
                    <RouterLink color="inherit" to={to} key={to}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
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
