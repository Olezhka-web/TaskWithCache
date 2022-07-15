import { NextFunction, Request, Response } from 'express';

import { nodeCache, RedisCache } from '../../cache';
import { IFilm, IRequestExtended } from '../../models';
import { filmService } from '../../services';

class FilmController {
    async createFilm(req: Request, res: Response, next: NextFunction) {
        try {
            const film = req.body;

            await filmService.createFilm(film);

            res.json('Successfully created!');
        } catch (e) {
            next(e);
        }
    }

    async getFilms(req: Request, res: Response, next: NextFunction) {
        try {
            const films = await filmService.findAllFilms();

            nodeCache.set('films', films);

            await RedisCache.set('films', JSON.stringify(films));

            await RedisCache.expire('films', 30);

            res.json(films);
        } catch (e) {
            next(e);
        }
    }

    async getFilm(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const film = req.film as IFilm;

            nodeCache.set(film.title, film);

            await RedisCache.set(film.title, JSON.stringify(film));

            await RedisCache.expire(film.title, 30);

            res.json(film);
        } catch (e) {
            next(e);
        }
    }
}

export const filmController = new FilmController();
