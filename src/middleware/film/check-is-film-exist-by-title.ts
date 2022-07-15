import { NextFunction, Response } from 'express';

import { ErrorMessagesEnum, StatusCodesEnum } from '../../constants';
import { ErrorHandler } from '../../errors';
import { IRequestExtended } from '../../models';
import { filmService } from '../../services';

export const checkIsFilmExistByTitle = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
    const { title } = req.params;

    const film = await filmService.findFilmByTitle(title);

    if (!film) {
        return next(new ErrorHandler(StatusCodesEnum.NOT_FOUND, ErrorMessagesEnum.FILM_NOT_FOUND));
    }

    req.film = film;

    next();
};
