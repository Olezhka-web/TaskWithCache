import { NextFunction, Request, Response } from 'express';

import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';

import { config } from './config';
import { ErrorMessagesEnum, StatusCodesEnum } from './constants';
import { client } from './database';
import { ErrorHandler } from './errors';
import { filmRouter } from './routes';
import { RedisCache } from './cache';
import * as swaggerDoc from './docs/swagger.json';

dotenv.config();

const app = express();

app.use(cors({ origin: _configureCors }));

client.connect()
    .then(() => console.log('Connected to DB'))
    .catch(error => {
        console.log('Failed Connection To DB');
        console.log(error);
    });

RedisCache.connect()
    .then(() => console.log('Redis Cache Connected!'))
    .catch(error => {
        console.log('Failed Connection To Redis Cache!');
        console.log(error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use('/films', filmRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(config.PORT, () => {
    console.log(`App is ready on port ${config.PORT}`);
});

function _notFoundError(err: any, req: Request, res: Response, next: NextFunction) {
    next({
        status: err.status || StatusCodesEnum.NOT_FOUND,
        message: err.message || 'Route not found'
    });
}

function _mainErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res
        .status(err.status || StatusCodesEnum.SERVER)
        .json({
            message: err.message || 'Unknown Error',
            code: err.code || 0
        });
}

function _configureCors(origin: any, callback: any) {
    const whiteList = config.ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_ENV === 'dev') {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new ErrorHandler(StatusCodesEnum.FORBIDDEN, ErrorMessagesEnum.CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}
