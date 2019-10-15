import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  useTheme
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Client, Contacts } from '@cacdigital-lib/types';
import { throttle } from 'throttle-debounce';
import { useDispatch } from 'react-redux';
import { Creators } from '../../store/ducks/client';
import ClientService from '../../services/client';
import PageBody from '../PageBody';
import BodySection from '../BodySection';
import FormGridSection from '../FormGridSection';
import FormLabel from '../FormLabel';
import docParser from '../../utils/docParser';

export interface CreateUserFormProps {
  closeAction: () => void;
  reload: () => void;
  onSaveSuccess: () => void;
  styles: Record<'title' | 'snackBar' | 'appBarAction' | 'addBtn', string>;
}

const CreateUserForm: FunctionComponent<CreateUserFormProps> = (
  props: PropsWithChildren<CreateUserFormProps>
) => {
  const service = ClientService.instance;
  const { closeAction, reload, onSaveSuccess, styles } = props;
  const theme = useTheme();
  const dispatch = useDispatch();

  const [editUser, setEditUser] = useState<Partial<Client>>({});
  const [save, setSave] = useState({
    isSaving: false,
    hasError: false,
    error: ''
  });

  const handleFormChange = (key: keyof Client, subKey?: keyof Contacts) =>
    throttle(
      150,
      ($ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = $ev.target;
        setEditUser(data => ({
          ...data,
          [key]:
          // eslint-disable-next-line no-nested-ternary
            key === 'contacts'
              ? {
                  ...data.contacts,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  [subKey!]: value
                }
              : key === 'document'
              ? docParser(value)
              : value
        }));
      },
      true
    );

  const handleSave = async () => {
    setSave(data => ({ ...data, isSaving: true, hasError: false }));

    try {
      await service.addClient(editUser);
      dispatch(
        Creators.add((await service.getClient(
          (editUser.document as string).replace(/(\D)+/g, '')
        )).data as Client)
      );
      onSaveSuccess();
      setSave(data => ({ ...data, isSaving: false }));
      setEditUser({});
      closeAction();
      reload();
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
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={closeAction}>
            <Close />
          </IconButton>
          <Typography className={styles.title}>Novo</Typography>
          <Button
            onClick={handleSave}
            disabled={
              save.isSaving ||
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
                    disabled={save.isSaving}
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
                    disabled={save.isSaving}
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
                    disabled={save.isSaving}
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
                  disabled={save.isSaving}
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
    </>
  );
};

export default CreateUserForm;
