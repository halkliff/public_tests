import React from 'react';
import { Route, BrowserRouter, RouteProps } from 'react-router-dom';

export const routes: RouteProps[] = [];

export default function AppRouter(props: React.PropsWithChildren<any>) {
  const { children } = props;
  return (
    <BrowserRouter>
      {children}

      {routes.map((routeProps: RouteProps, index) => (
        <Route
          // eslint-disable-next-line react/no-array-index-key
          key={`route-no-${index}}`}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...routeProps}
        />
      ))}
    </BrowserRouter>
  );
}
