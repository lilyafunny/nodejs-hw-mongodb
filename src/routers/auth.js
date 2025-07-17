import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema, loginWithGoogleOAuthSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getGoogleOAuthUrlController, loginUserController, loginWithGoogleController, logoutUserController, refreshUserSessionController, registerUserController, requestResetEmailToken, resetPasswordController } from "../controllers/auth.js";

const authRouter = Router();
authRouter.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

authRouter.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

authRouter.post(
    '/logout',
    ctrlWrapper(logoutUserController),
);

authRouter.post('refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post(
    '/send-reset-email',
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailToken),
);

authRouter.post(
    '/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);

authRouter.post(
    '/confirm-oauth',
    validateBody(loginWithGoogleOAuthSchema),
    ctrlWrapper(loginWithGoogleController),
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

export default authRouter;
