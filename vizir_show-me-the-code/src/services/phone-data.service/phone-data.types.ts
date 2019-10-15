// eslint-disable-next-line import/prefer-default-export
export enum FaleMaisDisponivel {
  FALE_MAIS_30 = 30,
  FALE_MAIS_60 = 60,
  FALE_MAIS_120 = 120
}

export interface PhoneData {
  id: string;
  origem: string;
  destino: string;
  valorTransacao: number;
  faleMaisDisponivel: FaleMaisDisponivel[];
}
