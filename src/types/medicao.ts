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

export type MedicaoInput = {
  alturaVegetacao: number;
  densidade: number;
  temperatura: number;
  umidade: number;
  tipoVegetacao?: string;
  inclinacaoTerreno?: number;
  observacoes?: string;
};
