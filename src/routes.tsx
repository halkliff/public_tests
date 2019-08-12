import React from "react";
import { Route, BrowserRouter, RouteProps } from "react-router-dom";

/* const Routes: React.FunctionComponent = (
  props: React.PropsWithChildren<any>
) => {
  return (
    <BrowserRouter>
      <Route path="/" />
    </BrowserRouter>
  );
}; */

export const routes: RouteProps[] = [
  {
    path: "/",
    component: undefined
  }
];

export default function AppRouter(props: React.PropsWithChildren<any>) {
  return (
    <BrowserRouter>
      {props.children}

      {routes.map((route: RouteProps, index: number) => (
        <Route
          key={index}
          location={route.location}
          component={route.component}
          render={route.render}
          children={route.children}
          path={route.path}
          exact={route.exact}
          sensitive={route.sensitive}
          strict={route.strict}
        />
      ))}
    </BrowserRouter>
  );
}
