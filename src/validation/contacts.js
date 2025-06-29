import Joi from 'joi';

export const createContactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(20).required().messages({
            'string.base': 'Name should be a string',
            'string.min': 'Name should have at least 3 characters',
            'string.max': 'Name should have at most 20 characters',
            'any.required': 'Name is required',
        }),
        phoneNumber: Joi.string().min(3).max(20).required().messages({
            'string.base': 'Phone number should be a string',
            'string.min': 'Phone number should have at least 3 characters',
            'string.max': 'Phone number should have at most 20 characters',
            'any.required': 'Phone number is required',
        }),
        email: Joi.string().min(3).max(20).messages({
            'string.base': 'Email should be a string',
            'string.min': 'Email should have at least 3 characters',
            'string.max': 'Email should have at most 20 characters',
        }),
        isFavourite: Joi.boolean().messages({
            'boolean.base': 'isFavourite must be a boolean value (true or false)',
        }),
        contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
            'string.base': 'Type should be a string',
            'any.only': 'Type must be one of [work, home, personal]',
            'any.required': 'Type is required',
        }),
    }
);


export const updateContactSchema = Joi.object(
    {
        name: Joi.string().min(3).max(20).messages({
            'string.base': 'Name should be a string',
            'string.min': 'Name should have at least 3 characters',
            'string.max': 'Name should have at most 20 characters',
        }),
        phoneNumber: Joi.string().min(3).max(20).messages({
            'string.base': 'Phone number should be a string',
            'string.min': 'Phone number should have at least 3 characters',
            'string.max': 'Phone number should have at most 20 characters',
        }),
        email: Joi.string().min(3).max(20).messages({
            'string.base': 'Email should be a string',
            'string.min': 'Email should have at least 3 characters',
            'string.max': 'Email should have at most 20 characters',
        }),
        isFavourite: Joi.boolean().messages({
            'boolean.base': 'isFavourite must be a boolean value (true or false)',
        }),
        contactType: Joi.string().valid('work', 'home', 'personal').messages({
            'string.base': 'Type should be a string',
            'any.only': 'Type must be one of [work, home, personal]',
        }),
    }
);
