import { Request } from 'express';

import { IFilm } from './film.interface';

export interface IRequestExtended extends Request{
    film?: IFilm
}
