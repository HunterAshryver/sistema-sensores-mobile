import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
type StatusMedicao = "normal" | "alerta" | "critico";
type Medicao = {
  id: number;
  sensor: string;
  tipo: string;
  valor: number;
  status: StatusMedicao;
};
export default function App() {
  const [medicao, setMedicao] = useState<Medicao>({
    id: 1,
    sensor: "Motor A - Linha 1",
    tipo: "TEMPERATURA",
    valor: 72,
    status: "normal",
  });
  function simularNovaMedicao() {
    const novoValor = Math.floor(Math.random() * 120);
    let novoStatus: StatusMedicao = "normal";
    if (novoValor > 80) {
      novoStatus = "alerta";
    }
    if (novoValor > 100) {
      novoStatus = "critico";
    }
    setMedicao({
      ...medicao,
      valor: novoValor,
      status: novoStatus,
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema de Monitoramento de Sensores </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Sensor: </Text>
        <Text style={styles.valor}> {medicao.sensor}</Text>

        <Text style={styles.label}>Tipo: </Text>
        <Text style={styles.valor}> {medicao.tipo}</Text>

        <Text style={styles.label}>Valor: </Text>
        <Text style={styles.valor}> {medicao.valor}</Text>

        <Text style={styles.label}>Status: </Text>
        <Text style={[styles.valor, styles.status [medicao.status]]}> 
          {medicao.status.toUpperCase()}
          </Text>

        <View style={styles.botao}>

        <Button
          title="Simular Nova Medição"
          onPress={simularNovaMedicao}
          color="#231ea6"
        />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#212123",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    color: "#eaeaea",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  
  card: {
    width: "90%",
    padding: 24,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#787af8",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

    botao: {
      marginTop: 20,
  },

    label: {
      fontSize: 16,
      color: "#AAAAAA",
      marginTop: 12,
      marginBottom: 4,
  },

    valor: {
      fontSize: 18,
      color: "#FFFFFF",
      fontWeight: "500",
  },

    status: {
      normal: { color: "#4fb953" },
      alerta: { color: "#FF9800" },
      critico: { color: "#F44336" },
  },
});