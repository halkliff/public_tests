import React from 'react';
import { Route, BrowserRouter, RouteProps, Switch } from 'react-router-dom';
import Main from './pages/Main';

export const routes: RouteProps[] = [
  {
    path: '/',
    component: Main,
    exact: true
  },
  {
    path: '/client/:doc',
    component: Main,
    exact: true
  }
];

export default function AppRouter(props: React.PropsWithChildren<any>) {
  const { children } = props;
  return (
    <BrowserRouter>
      {children}

      <Switch>
        {routes.map((routeProps: RouteProps, index) => (
          <Route
            // disable here since there will be a fixed ammount of routes
            // eslint-disable-next-line react/no-array-index-key
            key={`route-no-${index}}`}
            // disabling because the route props are dynamic and may vary from route to route
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...routeProps}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}
