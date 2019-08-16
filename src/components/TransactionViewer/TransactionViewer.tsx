import React, { FunctionComponent, useEffect, useState } from 'react';
import numeral from 'numeral';
import { useSelector } from 'react-redux';
import { GlobalState } from 'store/ducks';
import { FaleMaisDisponivel } from 'services/phone-data.service';
import { PhoneTransactionType, StateData } from 'store/ducks/phoneData';
import {
  Paper,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  InputLabel
} from '@material-ui/core';
import {
  Theme,
  withStyles,
  createStyles,
  makeStyles
} from '@material-ui/core/styles';

function transformValue(value: number): string {
  return numeral(value).format('$ 0,0.00');
}

function calculateRaw(value: number, time: number) {
  return value * time;
}

function calculateDiscounted(
  value: number,
  time: number,
  faleMais: FaleMaisDisponivel
) {
  const timeLeft = faleMais - time;
  if (timeLeft < 0) {
    return (value + value * 0.1) * Math.abs(timeLeft);
  }
  return 0;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  })
)(TableRow);

const transactionViewerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '70%',
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
      overflowX: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    table: {
      minWidth: 700
    },
    inputs: {
      marginBottom: theme.spacing(3),
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 2fr',
      gridGap: '1.5rem'
    }
  })
);

const TransactionViewer: FunctionComponent = () => {
  const styles = transactionViewerStyles();

  const phoneData = useSelector<GlobalState, StateData>(
    storeState => storeState.phoneData
  );

  const [
    selectedTransaction,
    setSelectedTransaction
  ] = useState<PhoneTransactionType | null>(null);

  const [callTime, setCallTime] = useState<number | null>(null);

  const [
    selectedFaleMais,
    setSelectedFaleMais
  ] = useState<FaleMaisDisponivel | null>(null);

  useEffect(() => {
    setSelectedTransaction(phoneData.selectedTransaction || null);
    if (selectedTransaction != null) {
      setSelectedFaleMais(
        selectedTransaction.phoneData.faleMaisDisponivel[0] || null
      );
      if (callTime === null) {
        setCallTime(25);
      }
    }
    return () => {};
  }, [phoneData.selectedTransaction, selectedTransaction, callTime]);

  function onSelectChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    switch (event.target.value as string) {
      case '30':
        setSelectedFaleMais(FaleMaisDisponivel.FALE_MAIS_30);
        break;
      case '60':
        setSelectedFaleMais(FaleMaisDisponivel.FALE_MAIS_60);
        break;
      case '120':
        setSelectedFaleMais(FaleMaisDisponivel.FALE_MAIS_120);
        break;
      default:
    }
  }

  function onInputChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    let value = event.target.value as string;
    if (value.length > 0) {
      value = value.replace(/[\D]/g, '');
      if (value.length < 1) {
        setCallTime(null);
        return;
      }
    }
    setCallTime(Math.floor(Number(value)));
  }

  return (
    <Paper className={styles.root}>
      <section className={styles.inputs}>
        <FormControl>
          <OutlinedInput
            id="tempoLigacao"
            name="tempoLigacao"
            placeholder="Tempo de Ligação"
            disabled={!selectedTransaction}
            labelWidth={0}
            value={callTime !== null ? callTime : ''}
            onChange={onInputChange}
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="faleMaisTipo">Plano FaleMais</InputLabel>
          <Select
            value={selectedFaleMais || ''}
            onChange={onSelectChange}
            disabled={!selectedTransaction}
            input={
              <OutlinedInput
                id="faleMaisTipo"
                name="faleMaisTipo"
                labelWidth={128}
              />
            }
          >
            {selectedTransaction === null
              ? null
              : selectedTransaction.phoneData.faleMaisDisponivel.map(fm => (
                  <MenuItem
                    key={fm.toString()}
                    value={fm.toFixed()}
                  >{`FaleMais ${fm.toFixed()}`}</MenuItem>
                ))}
          </Select>
        </FormControl>
      </section>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Origem</StyledTableCell>
            <StyledTableCell>Destino</StyledTableCell>
            <StyledTableCell>Tempo de Lig.</StyledTableCell>
            <StyledTableCell>Preço / min</StyledTableCell>
            <StyledTableCell>Plano FaleMais</StyledTableCell>
            <StyledTableCell>Com FaleMais</StyledTableCell>
            <StyledTableCell>Sem FaleMais</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!selectedTransaction ? (
            <StyledTableRow>
              <StyledTableCell colSpan={7} align="center">
                Selecione uma origem e destino para continuar.
              </StyledTableCell>
            </StyledTableRow>
          ) : (
            <StyledTableRow>
              <StyledTableCell>
                {selectedTransaction.phoneData.origem}
              </StyledTableCell>
              <StyledTableCell>
                {selectedTransaction.phoneData.destino}
              </StyledTableCell>
              <StyledTableCell>{callTime}</StyledTableCell>
              <StyledTableCell>
                {transformValue(selectedTransaction.phoneData.valorTransacao)}
              </StyledTableCell>
              <StyledTableCell>
                {selectedFaleMais
                  ? `${selectedFaleMais} Min`
                  : 'FaleMais indisponível'}
              </StyledTableCell>
              <StyledTableCell>
                {selectedFaleMais
                  ? transformValue(
                      calculateDiscounted(
                        selectedTransaction.phoneData.valorTransacao,
                        callTime || 0,
                        selectedFaleMais
                      )
                    )
                  : 'FaleMais indisponível'}
              </StyledTableCell>
              <StyledTableCell>
                {transformValue(
                  calculateRaw(
                    selectedTransaction.phoneData.valorTransacao,
                    callTime || 0
                  )
                )}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TransactionViewer;
