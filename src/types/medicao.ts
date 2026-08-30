// src/types/medicao.ts
import { Sensor } from './sensor';

export type StatusMedicaoAPI = 'NORMAL' | 'ALERTA' | 'CRITICO';

export type Medicao = {
  id: number;
  areaId: number;
  areaCodigo: string;
  alturaVegetacao: number;
  densidade: number;
  temperatura: number;
  umidade: number;
  tipoVegetacao: string | null;
  inclinacaoTerreno: number | null;
  dataColeta: string;
  sensorId: string | null;
  observacoes: string | null;
  status: StatusMedicaoAPI;
  statusDescricao: string;
};

// Tipo genérico da Sprint 2 (caso ainda precise)
export type MedicaoGenerica = {
  id: number;
  sensor: Sensor;
  valor: number;
  data: Date;
};