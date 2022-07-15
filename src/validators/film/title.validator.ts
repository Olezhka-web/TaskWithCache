import * as Joi from 'joi';

export const titleValidator = Joi.object({
    title: Joi.string().trim().min(1).max(30).regex(/^\S*$/).required()
});
