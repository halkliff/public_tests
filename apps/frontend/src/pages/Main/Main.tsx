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
  TextField,
  Select,
  MenuItem,
  FormControl,
  LinearProgress,
  Dialog,
  Slide
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { grey } from '@material-ui/core/colors';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Table, { Query, QueryResult } from 'material-table';
import { Client, Contacts } from '@cacdigital-lib/types';
import { Close } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { throttle } from 'throttle-debounce';
import ClientService from '../../services/client';
import docParser from '../../utils/docParser';
import { GlobalState } from '../../store/ducks';
import { StateData as ClientsState, Creators } from '../../store/ducks/client';
import PageBody from '../../components/PageBody';
import BodySection from '../../components/BodySection';
import FormLabel from '../../components/FormLabel';
import FormGridSection from '../../components/FormGridSection';

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

  const [editUser, setEditUser] = useState<Partial<Client>>({});

  const [save, setSave] = useState({
    isSaving: false,
    hasError: false,
    error: ''
  });

  const [showSaved, setShowSaved] = useState(false);

  const handleFormChange = (key: keyof Client, subKey?: keyof Contacts) =>
    throttle(
      150,
      ($ev: React.ChangeEvent<HTMLInputElement>) =>
        setEditUser(data => ({
          ...data,
          [key]:
          // eslint-disable-next-line no-nested-ternary
            key === 'contacts'
              ? {
                  ...data.contacts,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  [subKey!]: $ev.target.value
                }
              : key === 'document'
              ? docParser($ev.target.value)
              : $ev.target.value
        })),
      true
    );

  const handleErrorClose = () => {
    setError(data => ({ ...data, hasError: false, msg: '' }));
  };

  const handleRetry = () => {
    if (tableRef.current) {
      console.log(tableRef.current);
      setError(data => ({ ...data, hasError: false, msg: '' }));
      tableRef.current.onQueryChange();
    }
  };

  const handleViewerClose = () => {
    setEditor(data => ({ ...data, showing: false, isEditing: true }));
  };

  const handleSave = async () => {
    setEditor(data => ({ ...data, isEditing: false }));
    setSave(data => ({ ...data, isSaving: true, hasError: false }));

    try {
      await service.addClient(editUser);
      dispatch(
        Creators.add((await service.getClient(
          (editUser.document as string).replace(/(\D)+/g, '')
        )).data as Client)
      );
      setShowSaved(true);
      setSave(data => ({ ...data, isSaving: false }));
      setEditUser({});
      setEditor(data => ({ ...data, showing: false }));
      handleRetry();
    } catch (err) {
      let errorMsg: string;
      if (err instanceof Error) {
        errorMsg = err.message;
      } else errorMsg = err;

      setSave(data => ({
        ...data,
        isSaving: false,
        hasError: true,
        error: errorMsg
      }));
    }
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
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={handleViewerClose}>
              <Close />
            </IconButton>
            <Typography className={styles.title}>Novo</Typography>
            <Button
              onClick={handleSave}
              disabled={
                !editor.isEditing ||
                !editUser.name ||
                !editUser.clientType ||
                !editUser.contacts ||
                !editUser.contacts.mobileNumber ||
                !editUser.document
              }
              color="secondary"
              variant="contained"
              className={styles.appBarAction}
            >
              Salvar
            </Button>
          </Toolbar>
        </AppBar>
        <PageBody fixedAppBar theme={theme}>
          <BodySection>
            <form noValidate autoComplete="on">
              <FormGridSection>
                <FormControl style={{ gridColumn: '1/5' }}>
                  <FormLabel>
                    Nome
                    <TextField
                      color="secondary"
                      disabled={!editor.isEditing}
                      onChange={handleFormChange('name')}
                      value={editUser.name || ''}
                    />
                  </FormLabel>
                </FormControl>
                <FormControl style={{ gridColumn: '6/8' }}>
                  <FormLabel>
                    Celular
                    <TextField
                      color="secondary"
                      disabled={!editor.isEditing}
                      onChange={handleFormChange('contacts', 'mobileNumber')}
                      value={
                        (editUser.contacts && editUser.contacts.mobileNumber) ||
                        ''
                      }
                    />
                  </FormLabel>
                </FormControl>
              </FormGridSection>
              <FormGridSection>
                <FormControl style={{ gridColumn: '1/3' }}>
                  <FormLabel>
                    Tipo de Cliente
                    <Select
                      disabled={!editor.isEditing}
                      value={editUser.clientType || ''}
                      onChange={ev =>
                        setEditUser(data => ({
                          ...data,
                          clientType: ev.target.value as 'fisico' | 'juridico'
                        }))
                      }
                    >
                      <MenuItem value="juridico">Jurídico</MenuItem>
                      <MenuItem value="fisico">Físico</MenuItem>
                    </Select>
                  </FormLabel>
                </FormControl>
                <FormLabel style={{ gridColumn: '4/6' }}>
                  Documento
                  <br />
                  <TextField
                    color="secondary"
                    disabled={!editor.isEditing}
                    onChange={handleFormChange('document')}
                    value={
                      (editUser.document && docParser(editUser.document)) || ''
                    }
                  />
                </FormLabel>
              </FormGridSection>
            </form>
          </BodySection>
        </PageBody>
      </Dialog>

      <Snackbar
        className={styles.snackBar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={save.hasError}
        onClose={() => setSave(data => ({ ...data, hasError: false }))}
        message={<Typography>{save.error}</Typography>}
        action={[
          <Button
            key="retry"
            color="secondary"
            size="small"
            onClick={handleSave}
          >
            Tentar novamente
          </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => setSave(data => ({ ...data, hasError: false }))}
          >
            <Close />
          </IconButton>
        ]}
      />
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
