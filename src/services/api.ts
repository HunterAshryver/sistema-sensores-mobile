import { AreaMonitoramento } from '../types/areaMonitoramento';
import { Medicao } from '../types/medicao';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Áreas de Monitoramento
  areas: {
    listarTodas: async (): Promise<AreaMonitoramento[]> => {
      const response = await fetch(`${API_BASE_URL}/areas`);
      if (!response.ok) throw new Error('Erro ao buscar áreas');
      return response.json();
    },

    buscarPorId: async (id: number): Promise<AreaMonitoramento> => {
      const response = await fetch(`${API_BASE_URL}/areas/${id}`);
      if (!response.ok) throw new Error('Erro ao buscar área');
      return response.json();
    },

    buscarPorStatus: async (status: string): Promise<AreaMonitoramento[]> => {
      const response = await fetch(`${API_BASE_URL}/areas/status/${status}`);
      if (!response.ok) throw new Error('Erro ao buscar áreas por status');
      return response.json();
    },
  },

  // Medições
  medicoes: {
    listarTodas: async (): Promise<Medicao[]> => {
      const response = await fetch(`${API_BASE_URL}/medicoes`);
      if (!response.ok) throw new Error('Erro ao buscar medições');
      return response.json();
    },

    listarPorArea: async (areaId: number): Promise<Medicao[]> => {
      const response = await fetch(`${API_BASE_URL}/medicoes/area/${areaId}`);
      if (!response.ok) throw new Error('Erro ao buscar medições da área');
      return response.json();
    },

    simularColeta: async (areaId: number): Promise<Medicao> => {
      const response = await fetch(`${API_BASE_URL}/medicoes/simular/${areaId}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erro ao simular coleta de dados');
      return response.json();
    },

    simularTodasAreas: async (): Promise<Medicao[]> => {
      const response = await fetch(`${API_BASE_URL}/medicoes/simular-todas`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erro ao simular coleta de todas as áreas');
      return response.json();
    },
  },
};
