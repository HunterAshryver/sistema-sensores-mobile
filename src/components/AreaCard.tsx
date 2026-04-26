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
        return '#4ADE80';
      case StatusVegetacao.ATENCAO:
        return '#F97316';
      case StatusVegetacao.URGENTE:
        return '#EF4444';
      default:
        return '#6B7C6B';
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

  const statusColor = getStatusColor(area.status);

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: statusColor }]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.codigo}>{area.codigo}</Text>
          <Text style={styles.rodovia}>{area.rodovia}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '22', borderColor: statusColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{getStatusLabel(area.status)}</Text>
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
          <Text style={[styles.metricValue, { color: statusColor }]}>
            {area.alturaMedia ? `${area.alturaMedia.toFixed(2)}m` : '-'}
          </Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Densidade</Text>
          <Text style={[styles.metricValue, { color: statusColor }]}>
            {area.densidade ? `${area.densidade.toFixed(1)}%` : '-'}
          </Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Medições</Text>
          <Text style={[styles.metricValue, { color: statusColor }]}>{area.totalMedicoes}</Text>
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
    backgroundColor: '#444744',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#1A2A1A',
    // Fix para web — substitui shadow* que não funciona no navegador
    boxShadow: '0px 4px 12px rgba(255, 250, 250, 0.4)',
  } as any,
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
    color: '#E2F5E2',
    marginBottom: 4,
  },
  rodovia: {
    fontSize: 14,
    color: '#f7f7f7',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: {
    borderTopWidth: 1,
    borderTopColor: '#ffffff',
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
    color: '#ffffff',
  },
  value: {
    fontSize: 14,
    color: '#9CA39C',
    fontWeight: '500',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ffffff',
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#ffffff',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 's#1A2A1A',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
  },
});
