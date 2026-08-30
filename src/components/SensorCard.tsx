// src/components/SensorCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Medicao } from '../types/medicao';
import { calcularStatus, getStatusColor, getStatusLabel } from '../utils/calcularStatus';

type Props = {
  medicao: Medicao;
  onPress?: () => void;
};

export const SensorCard: React.FC<Props> = ({ medicao, onPress }) => {
  // Prioriza o status vindo da API; se não vier, calcula localmente
  const status =
    medicao.status ??
    calcularStatus(medicao.alturaVegetacao, medicao.densidade);

  const color = getStatusColor(status);

  return (
    <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.sensorNome}>
            {medicao.sensorId ?? 'Sensor de Vegetação'}
          </Text>
          <Text style={styles.sensorTipo}>Área: {medicao.areaCodigo}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color + '22', borderColor: color }]}>
          <Text style={[styles.statusText, { color }]}>{getStatusLabel(status)}</Text>
        </View>
      </View>

      <View style={styles.valorContainer}>
        <Text style={[styles.valor, { color }]}>
          {medicao.alturaVegetacao.toFixed(2)}
        </Text>
        <Text style={styles.unidade}>m</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Densidade:</Text>
        <Text style={styles.infoValue}>{medicao.densidade.toFixed(1)}%</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Temperatura:</Text>
        <Text style={styles.infoValue}>{medicao.temperatura.toFixed(1)}°C</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Umidade:</Text>
        <Text style={styles.infoValue}>{medicao.umidade.toFixed(1)}%</Text>
      </View>

      {medicao.observacoes ? (
        <Text style={styles.observacoes}>{medicao.observacoes}</Text>
      ) : null}

      <Text style={styles.data}>
        {new Date(medicao.dataColeta).toLocaleString('pt-BR')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#444744',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sensorNome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#E2F5E2',
  },
  sensorTipo: {
    fontSize: 13,
    color: '#9CA39C',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  valorContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 8,
  },
  valor: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  unidade: {
    fontSize: 18,
    color: '#9CA39C',
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  infoLabel: {
    color: '#9CA39C',
    fontSize: 13,
  },
  infoValue: {
    color: '#E2F5E2',
    fontSize: 13,
    fontWeight: '500',
  },
  observacoes: {
    fontSize: 12,
    color: '#9CA39C',
    marginTop: 8,
    fontStyle: 'italic',
  },
  data: {
    fontSize: 13,
    color: '#6B7C6B',
    marginTop: 8,
    textAlign: 'right',
  },
});