import React, { FunctionComponent, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Table, { Query, QueryResult } from 'material-table';
import { Client } from '@cacdigital-lib/types';
import { Close } from '@material-ui/icons';
import ClientService from '../../services/client';

const mainStyles = makeStyles(theme =>
  createStyles({
    title: {
      ...theme.typography.h3,
      fontSize: '3em',
      color: grey[100]
    }
  })
);

const StyledMain = styled.main<{ theme: Theme }>`
  background: ${props =>
    props.theme ? props.theme.palette.background.default : 'initial'};
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: none;
`;

const BodySection = styled.section`
  padding: 1.5rem 2rem;
  margin-top: 4rem;
`;

const Main: FunctionComponent = () => {
  const styles = mainStyles();
  const theme = useTheme();
  const service = ClientService.instance;

  const [error, setError] = useState({ hasError: false, error: '' });

  const handleTablePagination = async (
    tableQuery: Query<Client>
  ): Promise<QueryResult<Client>> => {
    try {
      const { page, pageSize: offset } = tableQuery;

      const response = await service.getClients(page, offset);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { data: response.data!, page, totalCount: response.qty };
    } catch (err) {
      // setError(() => ({ hasError: true, error: err }));

      return { data: [], page: 0, totalCount: 0 };
    }
  };

  return (
    <>
      <Helmet>
        <title>Home | Acruxx</title>
      </Helmet>

      <StyledMain theme={theme}>
        <AppBar color="primary" position="fixed">
          <Toolbar>
            <Typography className={styles.title}>Clientes</Typography>
          </Toolbar>
        </AppBar>
        <BodySection>
          {error.hasError && (
            <Card style={{ maxWidth: '8rem' }}>
              <CardContent>{error.error}</CardContent>
              <CardActions>
                <IconButton
                  onClick={() =>
                    setError(() => ({ hasError: false, error: '' }))
                  }
                >
                  <Close />
                </IconButton>
              </CardActions>
            </Card>
          )}
          <Card>
            <Table
              columns={[
                { title: 'Nome', field: 'name' },
                { title: 'Documento', field: 'document' },
                {
                  title: 'Celular',
                  field: 'contacts',
                  render: data => data.contacts.mobileNumber
                }
              ]}
              data={handleTablePagination}
            />
          </Card>
        </BodySection>
      </StyledMain>
    </>
  );
};

export default Main;
