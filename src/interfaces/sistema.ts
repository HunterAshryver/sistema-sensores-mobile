import { Medicao } from "../types/medicao";
export interface SistemaMonitoramento {
  id: number;
  nome: string;
  ativo: boolean;
  medicoes: Medicao[];
}