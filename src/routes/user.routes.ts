import { Router } from "express";
import validateBody from "../middleware/validateBody";
import {
  ChangePasswordUser,
  GetUserInfo,
  PublishMessage,
  PublishMessageBulk,
  RefreshToken,
  SignIn,
  Signup,
} from "../controller/users/user.controller";
import { JChangePasswordUserReqSchema, JCreateUserReqSchema, JSignInUserReqSchema } from "../interface/user.interface";
import { JPublishBulkReqSchema, JPublishReqSchema } from "../interface/publish.interface";
import usePassport from "../middleware/usePassport";
import { GetClientStatusByUser } from "../controller/mqtt/mqttUser.controller";
import { SignInOAuth } from "../controller/users/oauth.controller"; // Fixed typo in controller import
import { JSignInUserOAuthReqSchema } from "../interface/oauth.interface";
import { GetDashboard } from "../controller/dashboard.controller";

const router = Router();

router.get("", usePassport, GetUserInfo);
router.post("/signup", validateBody(JCreateUserReqSchema), Signup);
router.post("/signin", validateBody(JSignInUserReqSchema), SignIn);
router.post("/signin_oauth", validateBody(JSignInUserOAuthReqSchema), SignInOAuth);
router.post("/refresh", usePassport, RefreshToken);
router.post("/change_password", usePassport, validateBody(JChangePasswordUserReqSchema), ChangePasswordUser);
router.post("/publish", usePassport, validateBody(JPublishReqSchema), PublishMessage);
router.post("/publish/bulk", usePassport, validateBody(JPublishBulkReqSchema), PublishMessageBulk);
router.get("/get_device_status", usePassport, GetClientStatusByUser);
router.get("/get_dashboard", usePassport, GetDashboard);

export default router;
