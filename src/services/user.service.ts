import { Response } from "express";
import API from "../configs/axios";
import { MqttClient } from "../model/mqttClient.model";
import { User, UserModel } from "../model/user.model";
import { IChangePasswordUserSrv, ICreateUserReq } from "@Interface/user.interface";
import { IPublishReq, IPublishRes } from "@Interface/publish.interface";
import { ICreateUserOAuthReq } from "@Interface/oauth.interface";
import { ApiError, DBError } from "@Interface/errors";
import { MapAPIError, MapDBError } from "../utils/mapValue";

export async function FindOneClientByUserId(userId: string, clientId: string) {
  try {
    const client = await MqttClient.findOne({ where: { uid: userId, client_id: clientId } });
    return client;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function CreateUser(formdata: ICreateUserReq): Promise<UserModel | DBError> {
  try {
    const response = await User.create({
      name: formdata.name,
      username: formdata.username,
      password: formdata.password,
    });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function CreateUserOAuth(formdata: ICreateUserOAuthReq): Promise<UserModel | DBError> {
  try {
    const response = await User.create({
      o_id: formdata.o_id,
      name: formdata.name,
      username: formdata.username,
      password: "",
      signin_type: formdata.signin_type,
      provider: formdata.provider,
      profile_url: formdata.profile_url,
    });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function UpdateUserOAuth(formdata: ICreateUserOAuthReq): Promise<[affectedCount: number] | DBError> {
  try {
    const response = await User.update(
      {
        o_id: formdata.o_id,
        name: formdata.name,
        username: formdata.username,
        signin_type: formdata.signin_type,
        provider: formdata.provider,
        profile_url: formdata.profile_url,
      },
      { where: { username: formdata.username, provider: formdata.provider } }
    );
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function SignInUser(username: string): Promise<UserModel | DBError> {
  try {
    const response = await User.findOne({
      attributes: ["id", "name", "username", "password"],
      where: { username: username },
    });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function GetUserById(id: string) {
  try {
    const response = await User.findOne({ where: { username: id } });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function FindOneUser(username: string) {
  try {
    const response = await User.findOne({ attributes: ["id", "name", "username", "profile_url", "signin_type"], where: { username: username } });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function FindOneUserOAuth(username: string, provider: string) {
  try {
    const response = await User.findOne({
      attributes: ["id", "o_id", "name", "username", "profile_url", "signin_type", "provider"],
      where: { username: username, provider: provider },
    });
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function ChangePassword(formdata: IChangePasswordUserSrv): Promise<any> {
  try {
    const response = await User.update(
      { password: formdata.new_password },
      {
        where: {
          id: formdata.uid,
        },
      }
    );
    return response;
  } catch (error: any) {
    const newError: DBError = MapDBError(error);
    return newError;
  }
}

export async function Publish(formData: IPublishReq) {
  try {
    const response = await API.post<IPublishRes>("/publish", formData);
    return response;
  } catch (error: any) {
    const newError: ApiError = MapAPIError(error);
    return newError;
  }
}

export async function PublishBulk(formData: IPublishReq[]) {
  try {
    const response = await API.post<IPublishRes[]>("/publish/bulk", formData);
    return response;
  } catch (error: any) {
    const newError: ApiError = MapAPIError(error);
    return newError;
  }
}
