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
  // Usamos alturaVegetacao como valor principal (pode mudar depois)
  const valorPrincipal = medicao.alturaVegetacao;
  const status = calcularStatus(valorPrincipal);
  const color = getStatusColor(status);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View>
          <Text style={styles.sensorNome}>Sensor de Vegetação</Text>
          <Text style={styles.sensorTipo}>Área: {medicao.areaCodigo}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: color + '22', borderColor: color }]}>
          <Text style={[styles.statusText, { color }]}>{getStatusLabel(status)}</Text>
        </View>
      </View>

      <View style={styles.valorContainer}>
        <Text style={[styles.valor, { color }]}>{valorPrincipal.toFixed(2)}</Text>
        <Text style={styles.unidade}>m</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Densidade:</Text>
        <Text style={styles.infoValue}>{medicao.densidade.toFixed(1)}%</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Temperatura:</Text>
        <Text style={styles.infoValue}>{medicao.temperatura}°C</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Umidade:</Text>
        <Text style={styles.infoValue}>{medicao.umidade}%</Text>
      </View>

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
    borderLeftColor: '#4ADE80',
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
  data: {
    fontSize: 13,
    color: '#6B7C6B',
    marginTop: 8,
    textAlign: 'right',
  },
});