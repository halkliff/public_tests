import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import Selector from 'components/Selector';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Main: FunctionComponent = () => {
  // I am really not sure why this has to be here, but if removed the application doesn't
  // work properly so... Here it stays until I figure it out.
  useSelector(_ => _);

  return (
    <>
      <AppBar role="navigation" position="sticky">
        <Toolbar>
          <Typography
            variant="h4"
            style={{ color: 'white', fontWeight: 'bolder' }}
          >
            Telzir - Fale Mais
          </Typography>
        </Toolbar>
      </AppBar>
      <Selector />
    </>
  );
};

export default Main;
