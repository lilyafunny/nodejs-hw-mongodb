import { loginOrSignupWithGoogle, resetPassword } from "../services/auth.js";
import { THIRTY_DAYS } from "../constants/index.js";
import { loginUser, logoutUser, refreshUsersSession, registerUser, requestResetToken } from "../services/auth.js";
import { generateAuthUrl } from "../utils/googleOAuth2.js";


export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json(
        {
            status: 201,
            message: 'Successfully registered a user!',
            data: user,
        }
    );
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.json(
        {
            status: 200,
            message: 'Successfully logged in an user!',
            data: {
                accessToken: session.accessToken,

            },
        }
    );
};

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
};

export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const requestResetEmailToken = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        status: 200,
        message: 'Reset password email has been successfully sent.',
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        status: 200,
        message: 'Password has been successfully reset.',
        data: {},
    });
};

export const getGoogleOAuthUrlController = async (req, res) => {
    const url = generateAuthUrl();
    res.json({
        status: 200,
        message: 'Successfully get Google OAuth url!',
        data: {
            url,
        },
    });
};

export const loginWithGoogleController = async (req, res) => {
    const session = await loginOrSignupWithGoogle(req.body.code);
    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully logged in via Google OAuth!',
        data: {
            accessToken: session.accessToken,
        },
    });
};
