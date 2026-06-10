import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Modal,
} from 'react-native';
import { AreaCard } from '../components/AreaCard';
import { SensorCard } from '../components/SensorCard';
import { AreaMonitoramento, StatusVegetacao } from '../types/areaMonitoramento';
import { Medicao } from '../types/medicao';
import { api } from '../services/api';

type ModalConfig = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
};

export const DashboardScreen: React.FC = () => {
  const [areas, setAreas] = useState<AreaMonitoramento[]>([]);
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<StatusVegetacao | 'TODOS'>('TODOS');
  const [abaAtual, setAbaAtual] = useState<'areas' | 'sensores'>('areas');

  const [modal, setModal] = useState<ModalConfig>({
    visible: false,
    title: '',
    message: '',
  });

  const showModal = (config: Omit<ModalConfig, 'visible'>) => {
    setModal({ ...config, visible: true });
  };

  const hideModal = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  // Carrega dados de áreas e medições
  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dadosAreas, dadosMedicoes] = await Promise.all([
        api.areas.listarTodas(),
        api.medicoes.listarTodas(),
      ]);
      setAreas(dadosAreas);
      setMedicoes(dadosMedicoes);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showModal({
        title: 'Erro',
        message: 'Não foi possível carregar os dados.',
        confirmText: 'OK',
        showCancel: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // Função de refresh (usada nas duas FlatLists)
  const onRefresh = async () => {
    setRefreshing(true);
    await carregarDados();
    setRefreshing(false);
  };

  const simularColeta = () => {
    showModal({
      title: '🔬 Simular Coleta',
      message: 'Deseja simular a coleta de novos dados dos sensores em todas as áreas?',
      confirmText: 'Simular',
      cancelText: 'Cancelar',
      showCancel: true,
      onConfirm: async () => {
        hideModal();
        try {
          setLoading(true);
          await api.medicoes.simularTodasAreas();
          await carregarDados();

          showModal({
            title: '✅ Sucesso!',
            message: 'Nova coleta simulada com sucesso!\nNovas medições foram adicionadas.',
            confirmText: 'OK',
            showCancel: false,
          });
        } catch (error) {
          console.error('Erro ao simular coleta:', error);
          showModal({
            title: '❌ Erro',
            message: 'Não foi possível simular a coleta de dados.',
            confirmText: 'OK',
            showCancel: false,
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const filtrarAreas = (): AreaMonitoramento[] => {
    if (filtroStatus === 'TODOS') return areas;
    return areas.filter((area) => area.status === filtroStatus);
  };

  const contarPorStatus = (status: StatusVegetacao): number => {
    return areas.filter((area) => area.status === status).length;
  };

  const handleAreaPress = (area: AreaMonitoramento) => {
    showModal({
      title: `📍 ${area.codigo}`,
      message: 'Funcionalidade de detalhes será implementada na próxima aula.',
      confirmText: 'OK',
      showCancel: false,
    });
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4ADE80" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  const areasFiltradas = filtrarAreas();

  return (
    <View style={styles.container}>

      {/* Modal */}
      <Modal visible={modal.visible} transparent animationType="fade" onRequestClose={hideModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{modal.title}</Text>
            <Text style={styles.modalMessage}>{modal.message}</Text>
            <View style={styles.modalButtons}>
              {modal.showCancel && (
                <TouchableOpacity style={styles.modalButtonCancel} onPress={hideModal}>
                  <Text style={styles.modalButtonCancelText}>{modal.cancelText ?? 'Cancelar'}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.modalButtonConfirm}
                onPress={() => {
                  if (modal.onConfirm) modal.onConfirm();
                  else hideModal();
                }}
              >
                <Text style={styles.modalButtonConfirmText}>{modal.confirmText ?? 'OK'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌿 LeafGreen</Text>
        <Text style={styles.subtitle}>Monitoramento de Vegetação</Text>
      </View>

      {/* Abas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, abaAtual === 'areas' && styles.tabActive]}
          onPress={() => setAbaAtual('areas')}
        >
          <Text style={[styles.tabText, abaAtual === 'areas' && styles.tabTextActive]}>Áreas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, abaAtual === 'sensores' && styles.tabActive]}
          onPress={() => setAbaAtual('sensores')}
        >
          <Text style={[styles.tabText, abaAtual === 'sensores' && styles.tabTextActive]}>Sensores</Text>
        </TouchableOpacity>
      </View>

      {/* Status Cards (só na aba Áreas) */}
      {abaAtual === 'areas' && (
        <>
          <View style={styles.statusContainer}>
            <TouchableOpacity
              style={[styles.statusCard, { backgroundColor: '#3B0D0D', borderColor: '#EF4444' }, filtroStatus === StatusVegetacao.URGENTE && styles.statusCardActive]}
              onPress={() => setFiltroStatus(StatusVegetacao.URGENTE)}
            >
              <Text style={[styles.statusNumber, { color: '#EF4444' }]}>{contarPorStatus(StatusVegetacao.URGENTE)}</Text>
              <Text style={styles.statusLabel}>Urgente</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.statusCard, { backgroundColor: '#2D1A00', borderColor: '#F97316' }, filtroStatus === StatusVegetacao.ATENCAO && styles.statusCardActive]}
              onPress={() => setFiltroStatus(StatusVegetacao.ATENCAO)}
            >
              <Text style={[styles.statusNumber, { color: '#F97316' }]}>{contarPorStatus(StatusVegetacao.ATENCAO)}</Text>
              <Text style={styles.statusLabel}>Atenção</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.statusCard, { backgroundColor: '#0D2B12', borderColor: '#4ADE80' }, filtroStatus === StatusVegetacao.NORMAL && styles.statusCardActive]}
              onPress={() => setFiltroStatus(StatusVegetacao.NORMAL)}
            >
              <Text style={[styles.statusNumber, { color: '#4ADE80' }]}>{contarPorStatus(StatusVegetacao.NORMAL)}</Text>
              <Text style={styles.statusLabel}>Normal</Text>
            </TouchableOpacity>
          </View>

          {filtroStatus !== 'TODOS' && (
            <TouchableOpacity style={styles.clearFilterButton} onPress={() => setFiltroStatus('TODOS')}>
              <Text style={styles.clearFilterText}>✕ Limpar Filtro</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {/* Lista de Áreas */}
      {abaAtual === 'areas' ? (
        <FlatList
          data={areasFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AreaCard area={item} onPress={() => handleAreaPress(item)} />}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4ADE80" />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🌱</Text>
              <Text style={styles.emptyText}>Nenhuma área encontrada</Text>
            </View>
          }
        />
      ) : (
        /* Lista de Sensores / Medições */
        <FlatList
          data={medicoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SensorCard medicao={item} />}
          contentContainerStyle={styles.list}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4ADE80" />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📡</Text>
              <Text style={styles.emptyText}>Nenhuma medição encontrada</Text>
            </View>
          }
        />
      )}

      {/* Botão Simular Coleta */}
      <TouchableOpacity style={styles.fab} onPress={simularColeta}>
        <Text style={styles.fabText}>🔬 Simular Coleta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F0A' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0F0A' },
  loadingText: { marginTop: 12, fontSize: 16, color: '#4ADE80', letterSpacing: 0.5 },
  header: {
    backgroundColor: '#0D1F0F', 
    padding: 20, 
    paddingTop: 50, 
    paddingBottom: 28,
    borderBottomWidth: 1, 
    borderBottomColor: '#1A3A1C',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4ADE80', marginBottom: 4, letterSpacing: 0.5 },
  subtitle: { fontSize: 14, color: '#6B7C6B', letterSpacing: 1, textTransform: 'uppercase' },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#0D130D',
    borderBottomWidth: 1,
    borderBottomColor: '#1A2A1A',
  },
  tab: { flex: 1, paddingVertical: 16, alignItems: 'center' },
  tabActive: { borderBottomWidth: 3, borderBottomColor: '#4ADE80' },
  tabText: { color: '#9CA39C', fontWeight: '600', fontSize: 16 },
  tabTextActive: { color: '#4ADE80' },

  statusContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: 16,
    backgroundColor: '#0D130D', 
    borderBottomWidth: 1, 
    borderBottomColor: '#1A2A1A',
  },
  statusCard: { 
    flex: 1, 
    marginHorizontal: 5, 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center', 
    borderWidth: 1, 
    opacity: 0.85 
  },
  statusCardActive: { opacity: 1, borderWidth: 2 },
  statusNumber: { fontSize: 30, fontWeight: 'bold', marginBottom: 4 },
  statusLabel: { fontSize: 11, color: '#9CA39C', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },

  clearFilterButton: {
    backgroundColor: '#132B15', 
    borderWidth: 1, 
    borderColor: '#4ADE80',
    padding: 10, 
    margin: 16, 
    marginBottom: 0, 
    borderRadius: 8, 
    alignItems: 'center',
  },
  clearFilterText: { color: '#4ADE80', fontSize: 13, fontWeight: 'bold', letterSpacing: 0.5 },

  list: { padding: 16 },
  emptyContainer: { padding: 40, alignItems: 'center' },
  emptyIcon: { fontSize: 40, marginBottom: 12 },
  emptyText: { fontSize: 16, color: '#4A5A4A' },

  fab: {
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    backgroundColor: '#166534',
    paddingHorizontal: 24, 
    paddingVertical: 16, 
    borderRadius: 28,
    borderWidth: 1, 
    borderColor: '#4ADE80', 
    elevation: 8,
  },
  fabText: { color: '#4ADE80', fontSize: 15, fontWeight: 'bold', letterSpacing: 0.5 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' },
  modalBox: {
    backgroundColor: '#0D1F0F', 
    borderWidth: 1, 
    borderColor: '#1A3A1C',
    borderRadius: 16, 
    padding: 24, 
    width: '85%', 
    maxWidth: 400,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#4ADE80', marginBottom: 12 },
  modalMessage: { fontSize: 15, color: '#9CA39C', lineHeight: 22, marginBottom: 24 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  modalButtonCancel: {
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#1A3A1C',
  },
  modalButtonCancelText: { color: '#6B7C6B', fontWeight: 'bold' },
  modalButtonConfirm: {
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderRadius: 8,
    backgroundColor: '#166534', 
    borderWidth: 1, 
    borderColor: '#4ADE80',
  },
  modalButtonConfirmText: { color: '#4ADE80', fontWeight: 'bold' },
});