import React, { FunctionComponent, useState } from 'react';
import { PhoneTransactionType } from 'store/ducks/phoneData';
import {
  Select,
  FormControl,
  MenuItem,
  Button,
  OutlinedInput,
  InputLabel
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { GlobalState } from 'store/ducks';
import { appPalette } from 'styles/jss';

const selectorStyles = makeStyles({
  section: {
    padding: '1rem 1.5rem',
    flex: 1,
    justifyContent: 'center',
    display: 'grid',
    gridTemplateColumns: '4fr 2fr 2fr 1fr 4fr',
    gridColumnGap: '1.5rem',
    '& input:focused fieldset': {
      borderColor: appPalette.secondaryColor.main
    }
  },
  selector1: {
    gridColumn: '2/3'
  },
  selector2: {
    gridColumn: '3/4'
  },
  button: {
    gridColumn: '4/5',
    margin: '.5rem 0'
  }
});

/**
 * Function to map the origins from a given destiny
 * @param transactions The existing transactions in the state
 * @param destiny The destiny we're looking for.
 */
export function mapOriginsFromDestiny(
  transactions: PhoneTransactionType[],
  destiny: string
) {
  const mappedOrigins: string[] = [];

  transactions.forEach(value => {
    if (value.phoneData.destino === destiny)
      mappedOrigins.push(value.phoneData.origem);
  });

  return mappedOrigins;
}

/**
 * Function to map the destinies from a given destiny
 * @param transactions The existing transactions in the state
 * @param origin The origin we're looking for.
 */
export function mapDestiniesFromOrigin(
  transactions: PhoneTransactionType[],
  origin: string
) {
  const mappedDestinies: string[] = [];

  transactions.forEach(value => {
    if (value.phoneData.origem === origin)
      mappedDestinies.push(value.phoneData.destino);
  });

  return mappedDestinies;
}

interface State {
  selectedOrigin: string | null;
  selectedDestiny: string | null;
}

const Selector: FunctionComponent = () => {
  const styles = selectorStyles();

  const phoneData: PhoneTransactionType[] = useSelector<
    GlobalState,
    PhoneTransactionType[]
  >(state => state.phoneData.transactions);

  const [state, setState] = useState<State>({
    selectedOrigin: null,
    selectedDestiny: null
  });

  function selectOrigin(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const selectedOrigin = event.target.value as string;
    setState(value => ({
      ...value,
      selectedOrigin: selectedOrigin.length > 0 ? selectedOrigin : null
    }));
  }

  function selectDestiny(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    const selectedDestiny = event.target.value as string;
    setState(value => ({
      ...value,
      selectedDestiny: selectedDestiny.length > 0 ? selectedDestiny : null
    }));
  }

  return (
    <section className={styles.section}>
      <FormControl className={styles.selector1} variant="outlined">
        <InputLabel htmlFor="input-origem">Origem</InputLabel>
        <Select
          onChange={selectOrigin}
          value={state.selectedOrigin || ''}
          input={
            <OutlinedInput name="origem" id="input-origem" labelWidth={64} />
          }
        >
          <MenuItem value="">Nenhum</MenuItem>
          {(state.selectedDestiny != null
            ? mapOriginsFromDestiny(phoneData, state.selectedDestiny)
            : Array.from(new Set(phoneData.map(v => v.phoneData.origem))).sort()
          ).map((value, index) => (
            <MenuItem key={`${value + index}`} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={styles.selector2} variant="outlined">
        <InputLabel htmlFor="input-destino">Destino</InputLabel>
        <Select
          onChange={selectDestiny}
          value={state.selectedDestiny || ''}
          input={
            <OutlinedInput name="destino" id="input-destino" labelWidth={64} />
          }
        >
          <MenuItem value="">Nenhum</MenuItem>
          {(state.selectedOrigin != null
            ? mapDestiniesFromOrigin(phoneData, state.selectedOrigin)
            : Array.from(
                new Set(phoneData.map(v => v.phoneData.destino))
              ).sort()
          ).map((value, index) => (
            <MenuItem key={`${value + index}`} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        color="secondary"
        variant="contained"
        className={styles.button}
        disabled={!state.selectedOrigin || !state.selectedDestiny}
      >
        <Search />
      </Button>
    </section>
  );
};

export default Selector;
