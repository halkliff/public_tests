import uuid from 'uuid';
import { PhoneData, FaleMaisDisponivel } from './phone-data.types';

const MOCK_DATA: PhoneData[] = [
  {
    id: uuid(),
    origem: '011',
    destino: '016',
    valorTransacao: 1.9,
    faleMaisDisponivel: [
      FaleMaisDisponivel.FALE_MAIS_30,
      FaleMaisDisponivel.FALE_MAIS_60,
      FaleMaisDisponivel.FALE_MAIS_120
    ]
  },
  {
    id: uuid(),
    origem: '016',
    destino: '011',
    valorTransacao: 2.9,
    faleMaisDisponivel: [
      FaleMaisDisponivel.FALE_MAIS_30,
      FaleMaisDisponivel.FALE_MAIS_60,
      FaleMaisDisponivel.FALE_MAIS_120
    ]
  },
  {
    id: uuid(),
    origem: '011',
    destino: '017',
    valorTransacao: 1.7,
    faleMaisDisponivel: [
      FaleMaisDisponivel.FALE_MAIS_30,
      FaleMaisDisponivel.FALE_MAIS_60,
      FaleMaisDisponivel.FALE_MAIS_120
    ]
  },
  {
    id: uuid(),
    origem: '017',
    destino: '011',
    valorTransacao: 2.7,
    faleMaisDisponivel: [
      FaleMaisDisponivel.FALE_MAIS_30,
      FaleMaisDisponivel.FALE_MAIS_60,
      FaleMaisDisponivel.FALE_MAIS_120
    ]
  },
  {
    id: uuid(),
    origem: '011',
    destino: '018',
    valorTransacao: 0.9,
    faleMaisDisponivel: [
      FaleMaisDisponivel.FALE_MAIS_30,
      FaleMaisDisponivel.FALE_MAIS_60,
      FaleMaisDisponivel.FALE_MAIS_120
    ]
  },
  {
    id: uuid(),
    origem: '018',
    destino: '011',
    valorTransacao: 1.9,
    faleMaisDisponivel: [
      FaleMaisDisponivel.FALE_MAIS_30,
      FaleMaisDisponivel.FALE_MAIS_60,
      FaleMaisDisponivel.FALE_MAIS_120
    ]
  }
];

export default class PhoneDataService {
  /**
   * Mock function to fetch fictional data from a database. This returns a
   * promise, to be an async-like syntax to help resolving asynchronous data.
   */
  public static async fetch(): Promise<PhoneData[]> {
    return new Promise<PhoneData[]>(resolve =>
      setTimeout(() => resolve(MOCK_DATA), Math.floor(Math.random() * 100))
    );
  }
}
