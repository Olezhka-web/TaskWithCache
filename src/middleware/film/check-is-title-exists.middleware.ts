import { NextFunction, Request, Response } from 'express';

import { ErrorMessagesEnum, StatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { filmService } from '../../services';

export const checkIsTitleExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { title } = req.body;

    const foundFilm = await filmService.findFilmByTitle(title);

    if (foundFilm) {
        return next(new ErrorHandler(StatusCodesEnum.BAD_REQUEST, ErrorMessagesEnum.FILM_CREATED));
    }

    next();
};
