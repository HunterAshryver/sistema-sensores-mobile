# LeafGreen — Frontend (React Native / Expo)

Interface mobile para monitoramento inteligente de vegetação em rodovias do estado de São Paulo. O app consome a API Spring Boot, lista áreas e medições reais e permite simular novas coletas de sensores.

## Integrantes

* André Henrique Mendes da Cunha — RM: 564602  
* Guilherme Meira dos Santos — RM: 566331  
* Gustavo Nobre Coppola — RM: 561423  
* Pedro Augusto Piolli da Costa Duarte — RM: 564085  
* Pedro Sinnes Martinez — RM: 566017  
* Raphael Martins Coutinho — RM: 565359  

---

## O que o sistema monitora

Crescimento de vegetação ao longo de rodovias (altura, densidade, temperatura, umidade). Cada medição e área recebe status de risco: **NORMAL**, **ALERTA** ou **CRÍTICO**, permitindo atuação preventiva das equipes de manutenção.

---

## Como subir o backend

1. Entre na pasta do repositório do backend  
2. Execute:

```bash
./mvnw spring-boot:run