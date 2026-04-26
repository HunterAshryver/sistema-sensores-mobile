export enum StatusVegetacao {
  NORMAL = 'NORMAL',
  ATENCAO = 'ATENCAO',
  URGENTE = 'URGENTE'
}

export type AreaMonitoramento = {
  id: number;
  codigo: string;
  rodovia: string;
  kmInicial: number;
  kmFinal: number;
  localizacao: string;
  status: StatusVegetacao;
  statusDescricao: string;
  tipoTerreno: string;
  densidade: number | null;
  alturaMedia: number | null;
  complexidade: number | null;
  ultimaMedicao: string | null;
  proximaIntervencao: string | null;
  totalMedicoes: number;
};

export type AreaMonitoramentoResumida = {
  id: number;
  codigo: string;
  rodovia: string;
  status: StatusVegetacao;
  densidade: number | null;
  alturaMedia: number | null;
  ultimaMedicao: string | null;
};
