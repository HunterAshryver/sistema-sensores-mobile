import { Sensor } from "./sensor";
export type Medicao = {
  id: number;
  sensor: Sensor;
  valor: number;
  data: Date;
};