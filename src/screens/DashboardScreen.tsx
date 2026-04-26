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
    // TODO: Navegar para tela de detalhes (próxima aula)
    Alert.alert('Detalhes', `Área: ${area.codigo}\n\nFuncionalidade será implementada na próxima aula`);
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  const areasFiltradas = filtrarAreas();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>VerdeSmart</Text>
        <Text style={styles.subtitle}>Monitoramento de Vegetação</Text>
      </View>

      {/* Cards de Status (funcionam como filtro) */}
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusCard,
            { backgroundColor: '#F44336' },
            filtroStatus === StatusVegetacao.URGENTE && styles.statusCardActive,
          ]}
          onPress={() => setFiltroStatus(StatusVegetacao.URGENTE)}
        >
          <Text style={styles.statusNumber}>{contarPorStatus(StatusVegetacao.URGENTE)}</Text>
          <Text style={styles.statusLabel}>Urgente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusCard,
            { backgroundColor: '#FF9800' },
            filtroStatus === StatusVegetacao.ATENCAO && styles.statusCardActive,
          ]}
          onPress={() => setFiltroStatus(StatusVegetacao.ATENCAO)}
        >
          <Text style={styles.statusNumber}>{contarPorStatus(StatusVegetacao.ATENCAO)}</Text>
          <Text style={styles.statusLabel}>Atenção</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusCard,
            { backgroundColor: '#4CAF50' },
            filtroStatus === StatusVegetacao.NORMAL && styles.statusCardActive,
          ]}
          onPress={() => setFiltroStatus(StatusVegetacao.NORMAL)}
        >
          <Text style={styles.statusNumber}>{contarPorStatus(StatusVegetacao.NORMAL)}</Text>
          <Text style={styles.statusLabel}>Normal</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para limpar filtro */}
      {filtroStatus !== 'TODOS' && (
        <TouchableOpacity
          style={styles.clearFilterButton}
          onPress={() => setFiltroStatus('TODOS')}
        >
          <Text style={styles.clearFilterText}>Limpar Filtro</Text>
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
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
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statusCard: {
    flex: 1,
    marginHorizontal: 6,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    opacity: 0.9,
  },
  statusCardActive: {
    opacity: 1,
    borderWidth: 3,
    borderColor: '#333',
  },
  statusNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  clearFilterButton: {
    backgroundColor: '#6200EE',
    padding: 12,
    margin: 16,
    marginBottom: 0,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearFilterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200EE',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
