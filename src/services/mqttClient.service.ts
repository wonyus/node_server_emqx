import API from "../configs/axios";
import { IRegisterDevice } from "../interface/mqttClient.interface";
import { MqttClient } from "../model/mqttClient.model";

export async function CreateDevice(userId: number, formData: IRegisterDevice): Promise<any> {
  try {
    const response = await MqttClient.create({ uid: userId, ...formData });
    return response;
  } catch (error: any) {
    return { error: error.parent.detail };
  }
}

export async function GetClientConnectByUser(username: string) {
  try {
    const response = await API.get(`/clients?username=${username}`);
    return response;
  } catch (error: any) {
    return { data: { data: error.response.data, code: error.code } };
  }
}

export async function FindClientByUserId(userId: number) {
  try {
    const client = await MqttClient.findAll({ where: { uid: userId } });
    return client;
  } catch (error: any) {
    return { error: error.parent.detail };
  }
}
