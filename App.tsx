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
      <Text style={styles.titulo}>
        Sistema de Monitoramento de Sensores
      </Text>
      <View style={styles.card}>
        <Text>Sensor: {medicao.sensor}</Text>
        <Text>Tipo: {medicao.tipo}</Text>
        <Text>Valor: {medicao.valor}</Text>
        <Text>Status: {medicao.status}</Text>
        <Button
          title="Simular Nova Medição"
          onPress={simularNovaMedicao}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "80%",
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
  },
});