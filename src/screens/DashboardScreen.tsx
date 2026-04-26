import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { AreaCard } from '../components/AreaCard';
import { AreaMonitoramento, StatusVegetacao } from '../types/areaMonitoramento';
import { api } from '../services/api';

export const DashboardScreen: React.FC = () => {
  const [areas, setAreas] = useState<AreaMonitoramento[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<StatusVegetacao | 'TODOS'>('TODOS');

  useEffect(() => {
    carregarAreas();
  }, []);

  const carregarAreas = async () => {
    try {
      setLoading(true);
      const dados = await api.areas.listarTodas();
      setAreas(dados);
    } catch (error) {
      console.error('Erro ao carregar áreas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as áreas de monitoramento');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarAreas();
    setRefreshing(false);
  };

  const simularColeta = async () => {
    try {
      Alert.alert(
        'Simular Coleta',
        'Deseja simular a coleta de dados de todas as áreas?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar',
            onPress: async () => {
              setLoading(true);
              await api.medicoes.simularTodasAreas();
              await carregarAreas();
              Alert.alert('Sucesso', 'Coleta de dados simulada com sucesso!');
              setLoading(false);
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao simular coleta:', error);
      Alert.alert('Erro', 'Não foi possível simular a coleta de dados');
      setLoading(false);
    }
  };

  const filtrarAreas = (): AreaMonitoramento[] => {
    if (filtroStatus === 'TODOS') {
      return areas;
    }
    return areas.filter((area) => area.status === filtroStatus);
  };

  const contarPorStatus = (status: StatusVegetacao): number => {
    return areas.filter((area) => area.status === status).length;
  };

  const handleAreaPress = (area: AreaMonitoramento) => {
    Alert.alert('Detalhes', `Área: ${area.codigo}\n\nFuncionalidade será implementada na próxima aula`);
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}> LeafGreen</Text>
        <Text style={styles.subtitle}>Monitoramento de Vegetação</Text>
      </View>

      {/* Cards de Status (funcionam como filtro) */}
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusCard,
            { backgroundColor: '#3B0D0D', borderColor: '#EF4444' },
            filtroStatus === StatusVegetacao.URGENTE && styles.statusCardActive,
          ]}
          onPress={() => setFiltroStatus(StatusVegetacao.URGENTE)}
        >
          <Text style={[styles.statusNumber, { color: '#EF4444' }]}>{contarPorStatus(StatusVegetacao.URGENTE)}</Text>
          <Text style={styles.statusLabel}>Urgente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusCard,
            { backgroundColor: '#2D1A00', borderColor: '#F97316' },
            filtroStatus === StatusVegetacao.ATENCAO && styles.statusCardActive,
          ]}
          onPress={() => setFiltroStatus(StatusVegetacao.ATENCAO)}
        >
          <Text style={[styles.statusNumber, { color: '#F97316' }]}>{contarPorStatus(StatusVegetacao.ATENCAO)}</Text>
          <Text style={styles.statusLabel}>Atenção</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusCard,
            { backgroundColor: '#0D2B12', borderColor: '#4ADE80' },
            filtroStatus === StatusVegetacao.NORMAL && styles.statusCardActive,
          ]}
          onPress={() => setFiltroStatus(StatusVegetacao.NORMAL)}
        >
          <Text style={[styles.statusNumber, { color: '#4ADE80' }]}>{contarPorStatus(StatusVegetacao.NORMAL)}</Text>
          <Text style={styles.statusLabel}>Normal</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para limpar filtro */}
      {filtroStatus !== 'TODOS' && (
        <TouchableOpacity
          style={styles.clearFilterButton}
          onPress={() => setFiltroStatus('TODOS')}
        >
          <Text style={styles.clearFilterText}>✕ Limpar Filtro</Text>
        </TouchableOpacity>
      )}

      {/* Lista de Áreas */}
      <FlatList
        data={areasFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AreaCard area={item} onPress={() => handleAreaPress(item)} />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4ADE80"
            colors={['#4ADE80']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🌱</Text>
            <Text style={styles.emptyText}>Nenhuma área encontrada</Text>
          </View>
        }
      />

      {/* Botão flutuante — Simular Coleta */}
      <TouchableOpacity style={styles.fab} onPress={simularColeta}>
        <Text style={styles.fabText}>🔬 Simular Coleta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F0A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0F0A',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4ADE80',
    letterSpacing: 0.5,
  },
  header: {
    backgroundColor: '#0D1F0F',
    padding: 20,
    paddingTop: 50,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#1A3A1C',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4ADE80',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7C6B',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
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
    opacity: 0.85,
  },
  statusCardActive: {
    opacity: 1,
    borderWidth: 2,
  },
  statusNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 11,
    color: '#9CA39C',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
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
  clearFilterText: {
    color: '#4ADE80',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#4A5A4A',
  },
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
    shadowColor: '#4ADE80',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    color: '#4ADE80',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
