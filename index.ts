
import express, { Express, Request, Response, Application, ErrorRequestHandler, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { DEPLOY_PORT } from './src/utils/env';
import logger from './src/utils/logger';
import CustomValidationError from './src/utils/error';
import { isEmpty } from 'lodash';
import router from './src/routes/router';

//For env File 
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms',
        {
            stream: {
                write: message => {
                    logger.info(message.trim())
                }
            },
        }));

app.use(router);

//Handel Error
const errorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
    logger.log('error', error.stack);
    if (error instanceof CustomValidationError) {
        logger.log('error', error.errorMessages.toString());
        return res.status(400).send({
            status: 'fail',
            message: error.errorMessages,
            payload: {
                query: isEmpty(req.query) ? undefined : req.query,
                body: req.body,
            }
        });
    }

    return res.status(400).send({
        status: 'fail',
        message: error.message,
        payload: {
            query: isEmpty(req.query) ? undefined : req.query,
            body: req.body,
        }
    });
};
app.use(errorHandler);

// Handle 404 - Keep this as a last route
app.use(function (req, res, next) {
    res.status(404);
    return res.send({
        status: false,
        message: `Route ${req.path} not found!`
    });
});

// pushServerJob.start();
// checkPushJob.start();
// resyncRatio.start();

app.listen(DEPLOY_PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${DEPLOY_PORT}`);
});