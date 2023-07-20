import { config } from "dotenv";
config();

const server_port: number = Number(process.env.SERVER_PORT) || 3000;
const mqtt_host: string = String(process.env.MQTT_HOST) || "localhost";
const mqtt_port: number = Number(process.env.MQTT_PORT) || 1883;
const mqtt_path: string = String(process.env.MQTT_PATH) || "/mqtt";
const mqtt_user: string = String(process.env.MQTT_USER) || "user";
const mqtt_password: string = String(process.env.MQTT_PASSWORD) || "pass";
const mqtt_protocol: string = String(process.env.MQTT_PROTOCOL) || "mqtt";
const api_url: string = String(process.env.API_URL) || "http://localhost:3000";
const api_key: string = String(process.env.API_KEY) || "http://localhost:3000";
const api_secret: string = String(process.env.API_SECRET) || "http://localhost:3000";
const expDate: string = String(process.env.JWT_EXP_DATE) || "1d";
const secretKey: string = String(process.env.JWT_SECRECT) || "yourSecretKeyHere";
const appName: string = String(process.env.APP_NAME) || "yourSecretKeyHere";

export {
  server_port,
  mqtt_host,
  mqtt_port,
  mqtt_path,
  mqtt_user,
  mqtt_password,
  mqtt_protocol,
  api_url,
  api_key,
  api_secret,
  expDate,
  secretKey,
  appName,
};
