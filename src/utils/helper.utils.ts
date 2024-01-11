import { Request, Response } from 'express';
import dayjs from "dayjs";
import logger from "./logger";


function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

const helper = {
    returnSuccess: function (data: any,message?: any) {
        return {
            status: true,
            message: message,
            data: data,
        }
    },
    returnFail: function (message: any) {
        return {
            status: false,
            message: message,
        }
    },
    catchError: function (error: any) {
        logger.error(`error: ${error?.message}`);
        return {
            status: false,
            message: [error?.message],
        }
    },
    padTo2Digits: function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    },

    formatDate: function formatDate(date: Date) {
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    },

    getIsDayIncluded(date: string, start: string, end: string) {
        var weekday = new Array(7);
        weekday[0] = "Monday";
        weekday[1] = "Tuesday";
        weekday[2] = "Wednesday";
        weekday[3] = "Thursday";
        weekday[4] = "Friday";
        weekday[5] = "Saturday";
        weekday[6] = "Sunday";
        var dayStart = weekday.indexOf(start);
        var dayEnd = weekday.indexOf(end);
        if (dayEnd - dayStart < 0) {
            throw "Wrong input";
        }
        var rangeDay = weekday.slice(dayStart, dayEnd + 1);
        var dayName = this.getDayName(date);

        return rangeDay.includes(dayName);
    },

    getDayName(dateStr: string) {
        var date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { weekday: 'long' });
    },

    getDiscount(params: { discount: any, discount_amount: any, price: any }) {
        let calculateDiscount = 0;
        const { discount, discount_amount, price } = params;

        if (discount_amount && discount_amount != 0 && discount_amount != '0') {
            return discount_amount;
        } else {
            if (discount && discount != 0 && discount != '0') {
                calculateDiscount = Math.round(parseFloat(discount) > 0.0 ? (parseFloat(discount) / 100) * parseFloat(price) : 0.0,);
            }
            return calculateDiscount.toString();
        }

    },
    async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    getDate() {
        return dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    convertToNumber(value: string): number {
        return Number(Number(value).toLocaleString('fullwide', { useGrouping: false }));
    },
    convertToNumberRound(value: string): number {
        return Math.round(Number(Number(value).toLocaleString('fullwide', { useGrouping: false })));
    },
    convertToNumberFloor(value: string): number {
        return Math.floor(Number(Number(value).toLocaleString('fullwide', { useGrouping: false })));
    },
    parseDateTime(value: string): any {
        if (value) {
            return dayjs(value, { utc: true }).subtract(7, 'hour');
        } else {
            return null;
        }
    },
    getDateRange(date_start: string, date_end: string) {
        if (!date_start && !date_end) {
            date_start = dayjs().format('YYYY-MM-DD');
            date_end = date_start;
        } else if (!date_start) {
            date_start = date_end;
        } else if (!date_end) {
            date_end = date_start;
        }

        //substract 1 hour is for changing date_start to yesterday
        date_start = dayjs(date_start, { utc: true }).subtract(1, 'hour').set('hour', 17).format();
        date_end = dayjs(date_end, { utc: true }).set('hour', 16).set('minute', 59).set('second', 59).format();

        return {
            start: date_start,
            end: date_end
        }
    },
    //parsing string & bool value to bool
    parseBool(value: any, defaultValue = false) {
        return (value == 'true' || value == 'false' || value === true || value === false) && JSON.parse(value) || defaultValue;
    },
    resume(data_all: any, offset: any, limit: any) {
        if (Array.isArray(data_all)) {
            data_all = data_all.length;
        }
        if (!offset) offset = 0;
        return {
            all: data_all,
            start_show: (parseInt(offset) + 1 <= data_all) ? parseInt(offset) + 1 : 0,
            end_show: (parseInt(offset) + parseInt(limit) < data_all) ? parseInt(offset) + parseInt(limit) : data_all
        }
    },
    padLeadingZeros(num: any, size: any) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },
    isNotEmpty(v: any) {
        return ![undefined, null, '', 'null'].includes(v);
    },
};

export default helper;

