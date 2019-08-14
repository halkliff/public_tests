import React, { FunctionComponent, useState, useEffect } from 'react';
import { PhoneTransactionType } from 'store/ducks/phoneData';
import { Select, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { GlobalState } from 'store/ducks';

const selectorStyles = makeStyles({
  section: {
    padding: '1rem 1.5rem',
    flex: 1,
    justifyContent: 'center',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 2fr',
    gridColumnGap: '1.5rem'
  },
  selector1: {
    gridColumn: '2/3'
  },
  selector2: {
    gridColumn: '3/4'
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
      mappedOrigins.push(value.phoneData.destino);
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
      mappedDestinies.push(value.phoneData.origem);
  });

  return mappedDestinies;
}

interface State {
  initLoaded: boolean;
  selectedOrigin: string | null;
  selectedDestiny: string | null;
  existingOrigins: string[];
  existingDestinies: string[];
}

const Selector: FunctionComponent = () => {
  const styles = selectorStyles();

  const phoneData: PhoneTransactionType[] = useSelector<
    GlobalState,
    PhoneTransactionType[]
  >(state => state.phoneData.transactions);

  const [state, setState] = useState<State>({
    initLoaded: false,
    selectedOrigin: null,
    selectedDestiny: null,
    existingOrigins: [],
    existingDestinies: []
  });

  useEffect(() => {
    setState(value => ({
      ...value,
      existingOrigins: Array.from(
        new Set(phoneData.map(v => v.phoneData.origem))
      ),
      existingDestinies: Array.from(
        new Set(phoneData.map(v => v.phoneData.destino))
      ),
      initLoaded: true
    }));
    return () => {};
  }, [phoneData, state.initLoaded]);

  function selectOrigin(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    setState(value => ({
      ...value,
      selectedOrigin: event.target.value as string
    }));
  }

  function selectDestiny(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    setState(value => ({
      ...value,
      selectedDestiny: event.target.value as string
    }));
  }

  return (
    <section className={styles.section}>
      <FormControl className={styles.selector1}>
        <Select onChange={selectOrigin} value="">
          {state.existingOrigins.map((value, index) => (
            <MenuItem key={`${value + index}`} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={styles.selector2}>
        <Select onChange={selectDestiny} value="">
          {state.existingDestinies.map((value, index) => (
            <MenuItem key={`${value + index}`} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </section>
  );
};

export default Selector;
