import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Sensor } from "./scr/types/sensor";
import { Medicao } from "./scr/types/medicao";
import { StatusMedicao } from "./scr/types/statusMedicao";
// Importando a modelagem TypeScript do domínio de sensores
export default function App() {
  // Dados base (simulando sensores reais)
  const sensorTemp: Sensor = {
    id: 1,
    nome: "Motor A - Linha 1",
    tipo: "TEMPERATURA",
    unidade: "°C",
  };
  const sensorVibracao: Sensor = {
    id: 2,
    nome: "Esteira B",
    tipo: "VIBRACAO",
    unidade: "Hz",
  };
  // Estado da medição
  const [medicao, setMedicao] = useState<Medicao>({
    id: 1,
    sensor: sensorTemp,
    valor: 72,
    data: new Date(),
  });
  // Função para classificar status da medição
  function calcularStatus(valor: number): StatusMedicao {
    if (valor > 100) return "critico";
    if (valor > 80) return "alerta";
    return "normal";
  }
  // Função para simular nova leitura do sensor
  function simularNovaMedicao() {
    const novoValor = Math.floor(Math.random() * 120);
    setMedicao({
      ...medicao,
      valor: novoValor,
      data: new Date(),
    });
  }
  // Alternar sensor (simulando múltiplos dispositivos)
  function alternarSensor() {
    setMedicao({
      ...medicao,
      sensor: medicao.sensor.id === 1 ? sensorVibracao : sensorTemp,
    });
  }
  // Formatação de data
  function formatarData(data: Date): string {
    return data.toLocaleDateString("pt-BR");
  }
  const status = calcularStatus(medicao.valor);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Monitoramento</Text>
          <Text style={styles.subtitulo}>Medição #{medicao.id}</Text>
        </View>
        {/* Card da Medição */}
        <View style={styles.card}>
          {/* Status */}
          <View style={[
            styles.statusBadge,
            status === "alerta" && styles.statusAlerta,
            status === "critico" && styles.statusCritico,
          ]}>
            <Text style={styles.statusTexto}>{status.toUpperCase()}</Text>
          </View>
          {/* Informações do Sensor */}
          <View style={styles.secao}>
            <Text style={styles.label}>Sensor</Text>
            <Text style={styles.valor}>{medicao.sensor.nome}</Text>
            <Text style={styles.info}>Tipo: {medicao.sensor.tipo}</Text>
            <Text style={styles.info}>Unidade: {medicao.sensor.unidade}</Text>
          </View>
          {/* Dados da Medição */}
          <View style={styles.secao}>
            <Text style={styles.label}>Dados da Medição</Text>
            <Text style={styles.valor}>
              Valor: {medicao.valor} {medicao.sensor.unidade}
            </Text>
            <Text style={styles.info}>
              Data: {formatarData(medicao.data)}
            </Text>
          </View>
          {/* Mensagem baseada no status */}
          <View style={styles.secao}>
            {status === "normal" && (
              <Text style={styles.mensagemNormal}>Operação Estável</Text>
            )}
            {status === "alerta" && (
              <Text style={styles.mensagemAlerta}>Atenção necessária</Text>
            )}
            {status === "critico" && (
              <Text style={styles.mensagemCritica}>Parada imediata recomendada</Text>
            )}
          </View>
          {/* Ações */}
          <View style={styles.acoes}>
            <View style={styles.botaoContainer}>
              <Button
                title="Simular Medição"
                onPress={simularNovaMedicao}
              />
            </View>
            <View style={styles.botaoContainer}>
              <Button
                title="Alternar Sensor"
                onPress={alternarSensor}
                color="#555"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2F",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitulo: {
    fontSize: 16,
    color: "#ccc",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  statusBadge: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusAlerta: {
    backgroundColor: "#FFA500",
  },
  statusCritico: {
    backgroundColor: "#F44336",
  },
  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  secao: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  valor: {
    fontSize: 18,
  },
  info: {
    fontSize: 14,
    color: "#666",
  },
  mensagemNormal: {
    color: "green",
    fontWeight: "bold",
  },
  mensagemAlerta: {
    color: "orange",
    fontWeight: "bold",
  },
  mensagemCritica: {
    color: "red",
    fontWeight: "bold",
  },
  acoes: {
    marginTop: 10,
  },
  botaoContainer: {
    marginBottom: 10,
  },
});