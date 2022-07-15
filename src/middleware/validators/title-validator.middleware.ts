import { NextFunction, Response } from 'express';
import * as Joi from 'joi';

import { StatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../models';
import { titleValidator } from '../../validators';

export const titleValidatorMiddleware = (req: IRequestExtended, res: Response, next: NextFunction): void => {
    const { error } = Joi.validate(req.params, titleValidator);

    if (error) {
        return next(new ErrorHandler(StatusCodesEnum.BAD_REQUEST, error.details[0].message));
    }

    next();
};
