import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { StatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../models';
import { newFilmValidator } from '../../validators';

export const checkIsFilmValidMiddleware = (req: IRequestExtended, res: Response, next: NextFunction): void => {
    const { error } = Joi.validate(req.body, newFilmValidator);

    if (error) {
        return next(new ErrorHandler(StatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
