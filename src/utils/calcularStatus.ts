// src/utils/calcularStatus.ts
export type StatusMedicao = 'NORMAL' | 'ALERTA' | 'CRITICO';

/** Fallback caso a API não envie status. Regra alinhada ao backend. */
export function calcularStatus(altura: number, densidade?: number): StatusMedicao {
  if (altura > 1.5 || (densidade != null && densidade > 70)) {
    return 'CRITICO';
  }
  if (altura > 1.0 || (densidade != null && densidade > 50)) {
    return 'ALERTA';
  }
  return 'NORMAL';
}

export function getStatusColor(status: StatusMedicao | string): string {
  switch (String(status).toUpperCase()) {
    case 'CRITICO':
      return '#EF4444';
    case 'ALERTA':
      return '#F97316';
    case 'NORMAL':
      return '#4ADE80';
    default:
      return '#6B7C6B';
  }
}

export function getStatusLabel(status: StatusMedicao | string): string {
  switch (String(status).toUpperCase()) {
    case 'CRITICO':
      return 'Crítico';
    case 'ALERTA':
      return 'Alerta';
    case 'NORMAL':
      return 'Normal';
    default:
      return 'Desconhecido';
  }
}