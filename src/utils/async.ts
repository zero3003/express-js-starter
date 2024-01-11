import { Request, Response } from 'express';
import helper from './helper.utils';

export const handleAsync = (fn: any) => async (req: Request, res: Response) => {
    try {
        const result = await fn(req, res);
        return res.send(helper.returnSuccess(result?.data ? result.data : result, result?.message));
    } catch (error) {
        return res.send(helper.catchError(error));
    }
};
