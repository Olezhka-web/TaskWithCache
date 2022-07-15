import { NextFunction, Request, Response } from 'express';

import { nodeCache } from '../../cache';

export const verifyCacheMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { title } = req.params;

    if (title) {
        if (nodeCache.has(title)) {
            return res.json(nodeCache.get(title));
        }

        return next();
    }

    if (nodeCache.has('films')) {
        return res.json(nodeCache.get('films'));
    }

    next();
};
