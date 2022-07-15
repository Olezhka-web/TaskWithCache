import { client } from '../../database';
import { IFilm } from '../../models';

class FilmService {
    async createFilm(film: Partial<IFilm>): Promise<void> {
        await client.query(
            `INSERT INTO films(title, description) VALUES($1, $2)`,
            [ film.title, film.description ]
        );
    }

    async findFilmByTitle(title: string): Promise<IFilm | null> {
        return (await client.query(`SELECT * FROM films WHERE title=$1`, [ title ])).rows[0] || null;
    }

    async findAllFilms(): Promise<IFilm[] | []> {
        return (await client.query(`SELECT * FROM films`)).rows;
    }
}

export const filmService = new FilmService();
