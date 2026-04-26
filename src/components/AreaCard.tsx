import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AreaMonitoramento, StatusVegetacao } from '../types/areaMonitoramento';

type Props = {
  area: AreaMonitoramento;
  onPress: () => void;
};

export const AreaCard: React.FC<Props> = ({ area, onPress }) => {
  const getStatusColor = (status: StatusVegetacao): string => {
    switch (status) {
      case StatusVegetacao.NORMAL:
        return '#4CAF50'; // Verde
      case StatusVegetacao.ATENCAO:
        return '#FF9800'; // Laranja
      case StatusVegetacao.URGENTE:
        return '#F44336'; // Vermelho
      default:
        return '#9E9E9E'; // Cinza
    }
  };

  const getStatusLabel = (status: StatusVegetacao): string => {
    switch (status) {
      case StatusVegetacao.NORMAL:
        return 'Normal';
      case StatusVegetacao.ATENCAO:
        return 'Atenção';
      case StatusVegetacao.URGENTE:
        return 'Urgente';
      default:
        return 'Desconhecido';
    }
  };

  const formatarData = (dataStr: string | null): string => {
    if (!dataStr) return 'Sem dados';
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.codigo}>{area.codigo}</Text>
          <Text style={styles.rodovia}>{area.rodovia}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(area.status) }]}>
          <Text style={styles.statusText}>{getStatusLabel(area.status)}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Localização:</Text>
          <Text style={styles.value}>{area.localizacao}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Km:</Text>
          <Text style={styles.value}>
            {area.kmInicial.toFixed(1)} - {area.kmFinal.toFixed(1)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Terreno:</Text>
          <Text style={styles.value}>{area.tipoTerreno}</Text>
        </View>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Altura Média</Text>
          <Text style={styles.metricValue}>
            {area.alturaMedia ? `${area.alturaMedia.toFixed(2)}m` : '-'}
          </Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Densidade</Text>
          <Text style={styles.metricValue}>
            {area.densidade ? `${area.densidade.toFixed(1)}%` : '-'}
          </Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Medições</Text>
          <Text style={styles.metricValue}>{area.totalMedicoes}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Última medição: {formatarData(area.ultimaMedicao)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  codigo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  rodovia: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
