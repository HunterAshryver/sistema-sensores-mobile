// src/types/medicao.ts
import { Sensor } from './sensor';   // ← Importação adicionada

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
};

// Tipo genérico para Sprint 2 (caso precise usar)
export type MedicaoGenerica = {
  id: number;
  sensor: Sensor;
  valor: number;
  data: Date;
};