// src/utils/calcularStatus.ts
export type StatusMedicao = "normal" | "alerta" | "critico";

export function calcularStatus(valor: number): StatusMedicao {
  if (valor > 100) return "critico";
  if (valor > 80) return "alerta";
  return "normal";
}

export function getStatusColor(status: StatusMedicao): string {
  switch (status) {
    case "critico": return "#EF4444";
    case "alerta": return "#F97316";
    case "normal": return "#4ADE80";
    default: return "#6B7C6B";
  }
}

export function getStatusLabel(status: StatusMedicao): string {
  switch (status) {
    case "critico": return "Crítico";
    case "alerta": return "Alerta";
    case "normal": return "Normal";
    default: return "Desconhecido";
  }
}