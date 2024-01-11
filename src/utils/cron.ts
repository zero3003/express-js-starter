import { CronJob } from "cron";
import logger from "./logger";

const everyHour = '0 * * * *';
const everyMinutes59 = '59 * * * *';
const every10minutes = '*/10 * * * *'
const everySecond = '* * * * * *';
const every5minutes = '*/5 * * * *';

const pushServerJob: CronJob = new CronJob(
    every5minutes,
    async function () {
        logger.info(`Cron every 5 minutes Fired!`);
    },
    null,
    true,
    'Asia/Jakarta',
);

export { pushServerJob };

