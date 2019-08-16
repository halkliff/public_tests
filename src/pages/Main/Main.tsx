import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import Selector from 'components/Selector';
import TransactionViewer from 'components/TransactionViewer';

import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const mainStyles = makeStyles({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
});

const Main: FunctionComponent = () => {
  // I am really not sure why this has to be here, but if removed the application doesn't
  // work properly so... Here it stays until I figure it out.
  useSelector(_ => _);

  const styles = mainStyles();

  return (
    <main className={styles.root}>
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
      <TransactionViewer />
    </main>
  );
};

export default Main;
