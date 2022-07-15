import { NextFunction, Request, Response } from 'express';

import { RedisCache } from '../../cache';

export const verifyRedisCacheMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { title } = req.params;

    if (title) {
        const redisCacheResult = await RedisCache.get(title);

        if (redisCacheResult) {
            return res.json(JSON.parse(redisCacheResult));
        }

        return next();
    }

    const redisCacheResult = await RedisCache.get('films');

    if (redisCacheResult) {
        return res.json(JSON.parse(redisCacheResult));
    }

    next();
};
