import * as Joi from 'joi';

export const newFilmValidator = Joi.object({
    title: Joi.string().trim().min(1).max(30).regex(/^\S*$/).required(),
    description: Joi.string().trim().min(1).required()
});
