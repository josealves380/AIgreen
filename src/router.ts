import {Router} from 'express';
import { AuthenticateUserController } from './useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenUserController } from './useCases/refreshTokenUser/RefreshTokenUserController';


const router = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/refresh-token", refreshTokenUserController.handle);
router.get("/refresh-token", authenticateUserController.handle);
router.post("/login", authenticateUserController.handle);

export {router}