/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FunctionComponent, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  IconButton,
  Snackbar,
  Button,
  LinearProgress,
  Dialog,
  Slide
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { grey } from '@material-ui/core/colors';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Table, { Query, QueryResult } from 'material-table';
import { Client } from '@cacdigital-lib/types';
import { Close } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import ClientService from '../../services/client';
import docParser from '../../utils/docParser';
import { GlobalState } from '../../store/ducks';
import { StateData as ClientsState, Creators } from '../../store/ducks/client';
import PageBody from '../../components/PageBody';
import BodySection from '../../components/BodySection';
import CreateUserForm from '../../components/CreateUserForm';

const mainStyles = makeStyles(theme =>
  createStyles({
    title: {
      ...theme.typography.h3,
      fontSize: '2rem',
      color: grey[100],
      margin: theme.spacing(2),
      flex: 1
    },
    snackBar: {
      margin: theme.spacing(1),
      flex: 1,
      maxWidh: 600
    },
    appBarAction: {
      padding: '.5rem 3rem',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    addBtn: {
      margin: theme.spacing(1)
    }
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const Main: FunctionComponent = () => {
  const styles = mainStyles();
  const theme = useTheme();
  const service = ClientService.instance;
  const tableRef = React.createRef<any>();

  const clientsState = useSelector<GlobalState, ClientsState>(
    globalState => globalState.client
  );

  const dispatch = useDispatch();

  const [error, setError] = useState({ hasError: false, msg: '' });

  const [editor, setEditor] = useState({ showing: false, isEditing: true });

  const handleTablePagination = async (
    tableQuery: Query<Client>
  ): Promise<QueryResult<Client>> => {
    try {
      const { page, pageSize: offset } = tableQuery;

      let { qty } = clientsState;

      if (
        page * offset <= clientsState.qty &&
        page * offset >= clientsState.clients.length
      ) {
        dispatch(Creators.loading());

        const response = await service.getClients(page, offset);

        dispatch(
          Creators.addAll({ qty: response.qty, clients: response.data || [] })
        );

        qty = response.qty;

        dispatch(Creators.loaded());
      }

      const sliceStart =
        page * offset <= clientsState.qty
          ? page * offset
          : clientsState.qty - offset;

      const sliceEnd =
        page * offset <= clientsState.qty
          ? page * offset + offset
          : clientsState.qty;

      const data = clientsState.clients.slice(sliceStart, sliceEnd);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return { data, page, totalCount: qty };
    } catch (err) {
      let msg: string;
      if (err instanceof Error) {
        msg = err.message;
      } else {
        msg = err;
      }

      setError(data => ({ ...data, hasError: true, msg }));

      return { data: [], page: 0, totalCount: 0 };
    }
  };

  const [showSaved, setShowSaved] = useState(false);

  const handleErrorClose = () => {
    setError(data => ({ ...data, hasError: false, msg: '' }));
  };

  const handleRetry = () => {
    if (tableRef.current) {
      setError(data => ({ ...data, hasError: false, msg: '' }));
      tableRef.current.onQueryChange();
    }
  };

  const handleViewerClose = () => {
    setEditor(data => ({ ...data, showing: false, isEditing: true }));
  };

  return (
    <>
      <Helmet>
        <title>Home | Acruxx</title>
      </Helmet>

      <PageBody theme={theme} fixedAppBar>
        <AppBar color="primary" position="fixed">
          <Toolbar>
            <Typography className={styles.title}>Clientes</Typography>
          </Toolbar>
        </AppBar>
        <BodySection>
          <Card>
            {clientsState.loading && <LinearProgress color="secondary" />}
            <Button
              onClick={() => setEditor(data => ({ ...data, showing: true }))}
              color="secondary"
              className={styles.addBtn}
              variant="contained"
            >
              Novo cliente
            </Button>
            <Table
              title="Clientes Registrados"
              tableRef={tableRef}
              columns={[
                { title: 'Nome', field: 'name' },
                {
                  title: 'Documento',
                  field: 'document',
                  render: data => docParser(data.document)
                },
                {
                  title: 'Celular',
                  field: 'contacts',
                  render: data => data.contacts.mobileNumber
                }
              ]}
              options={{ search: false, filtering: false }}
              data={handleTablePagination}
              actions={[
                {
                  icon: 'refresh',
                  tooltip: 'Recarregar',
                  isFreeAction: true,
                  onClick: handleRetry
                }
              ]}
              editable={{
                onRowDelete: async data => {
                  await service.removeClient((data as Client).document);
                  dispatch(Creators.remove((data as Client).document));
                }
              }}
              localization={{
                pagination: {
                  labelDisplayedRows: '{from}-{to} de {count}',
                  firstTooltip: 'Primeiro',
                  previousTooltip: 'Anterior',
                  nextTooltip: 'Próximo',
                  lastTooltip: 'Último',
                  labelRowsSelect: 'Linhas'
                },
                toolbar: {
                  nRowsSelected: '{0} linha(s) selecionadas'
                },
                header: {
                  actions: 'Ações'
                },
                body: {
                  emptyDataSourceMessage: 'Sem entradas para mostrar.',
                  filterRow: {
                    filterTooltip: 'Filtrar'
                  },
                  editRow: {
                    deleteText:
                      'Tem certeza de que deseja remover este cliente?',
                    cancelTooltip: 'Não',
                    saveTooltip: 'Sim'
                  }
                }
              }}
            />
          </Card>
        </BodySection>
      </PageBody>
      <Snackbar
        className={styles.snackBar}
        color=""
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={error.hasError}
        onClose={handleErrorClose}
        message={<Typography>{error.msg}</Typography>}
        action={[
          <Button
            key="retry"
            color="secondary"
            size="small"
            onClick={handleRetry}
          >
            Tentar novamente
          </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleErrorClose}
          >
            <Close />
          </IconButton>
        ]}
      />
      <Dialog
        fullScreen
        open={editor.showing}
        onClose={handleViewerClose}
        TransitionComponent={Transition}
      >
        <CreateUserForm
          closeAction={handleViewerClose}
          reload={handleRetry}
          onSaveSuccess={() => setShowSaved(true)}
          styles={styles}
        />
      </Dialog>
      <Snackbar
        className={styles.snackBar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={showSaved}
        onClose={() => setShowSaved(false)}
        message={<Typography>Salvo com sucesso!</Typography>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => setShowSaved(false)}
          >
            <Close />
          </IconButton>
        ]}
      />
    </>
  );
};

export default Main;
