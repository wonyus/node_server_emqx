import { Request, Response } from "express";
import { UpdateSwitch } from "../services/switch.service";
import { ResponseError } from "../utils/mapResponse";

export async function UpdateStatus(req: Request, res: Response) {
  const reqData = req.body;
  try {
    reqData.data.payload.switchs.forEach(async (val: any) => {
      await UpdateSwitch(val.id, { status: val.vl });
    });

    return res.status(200).json({ message: "success", result: { user: "userRes" } });
  } catch (error: any) {
    return ResponseError(res, "fail to update status", error);
  }
}
