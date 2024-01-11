import express, { Express, Request, Response, Router } from 'express';
import testRouter from './test.router';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    return res.send('Welcome to Pengadaan Backend API');
});

router.get('/ping', (req: Request, res: Response) => {
    return res.send(`pong`);
});

router.use('/tes', testRouter);
// router.use('/login', login);

export default router;