import { Router } from 'express';

import { filmController } from '../../controller';
import {
    checkIsFilmExistByTitle,
    checkIsFilmValidMiddleware,
    checkIsTitleExistsMiddleware,
    titleValidatorMiddleware,
    verifyCacheMiddleware,
    verifyRedisCacheMiddleware
} from '../../middleware';

const router = Router();

router.post('/', checkIsFilmValidMiddleware, checkIsTitleExistsMiddleware, filmController.createFilm);
router.get('/', verifyCacheMiddleware, verifyRedisCacheMiddleware, filmController.getFilms);
router.get('/:title',
    titleValidatorMiddleware,
    verifyCacheMiddleware,
    verifyRedisCacheMiddleware,
    checkIsFilmExistByTitle,
    filmController.getFilm
);

export const filmRouter = router;
