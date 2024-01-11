import { Request, Response } from 'express';
import { handleAsync } from '../utils/async';

const testController = {
    getData: handleAsync(async (req: Request, res: Response) => {
        const data = [2, 3, 4];
        // Your logic to fetch data goes here
        return data;
    }),
}

export default testController;