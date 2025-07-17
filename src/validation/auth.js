import Joi from 'joi';

export const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 20 characters',
        'any.required': 'Name is required',
    }),

    email: Joi.string().min(3).max(22).messages({
        'string.base': 'Email should be a string',
        'string.min': 'Email should have at least 3 characters',
        'string.max': 'Email should have at most 20 characters',
    }),

    password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string().required(),
    token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
    code: Joi.string().required(),
});
