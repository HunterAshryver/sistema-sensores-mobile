import { Platform } from 'react-native';
import { AreaMonitoramento } from '../types/areaMonitoramento';
import { Medicao } from '../types/medicao';

// BASE_URL:
// - Web / iOS simulador → localhost
// - Emulador Android   → 10.0.2.2
// - Celular físico     → troque para o IP da sua máquina (ex: http://192.168.0.10:8080/api)
const API_BASE_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:8080/api'
    : 'http://localhost:8080/api';

export const api = {
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