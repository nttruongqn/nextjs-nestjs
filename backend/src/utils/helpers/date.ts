import moment from 'moment-timezone';

import { appConfig } from '@utils/configs';

export const formatDateFromUTC = (date: string, fromFormat: string = 'YYYY-MM-DD HH:mm:ss', toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment.utc(date, fromFormat).tz(appConfig.APP.TIME_ZONE).format(toFormat);
};

export const formatRawDate = (date: string, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date).format(toFormat);
};

export const formatDate = (date: string, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(date).tz(appConfig.APP.TIME_ZONE).format(toFormat);
};

export const formatUTCDate = (date: string, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment.tz(date, appConfig.APP.TIME_ZONE).utc().format(toFormat);
};

export const getDateNow = (toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment().tz(appConfig.APP.TIME_ZONE).format(toFormat);
};

export const getUTCNow = (toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment.utc().format(toFormat);
};

export const getUTCTimestamp = () => {
    return moment.utc().unix();
};

export const subtractMinute = (from: string, subtract_minutes: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).subtract(subtract_minutes, 'minutes').format(toFormat);
};

export const subtractHour = (from: string, subtract_hours: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).subtract(subtract_hours, 'hours').format(toFormat);
};

export const subtractDate = (from: string, subtract_days: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).subtract(subtract_days, 'days').format(toFormat);
};

export const subtractYear = (from: string, subtract_years: number, toFormat: string = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(from).subtract(subtract_years, 'years').format(toFormat);
};

export const checkValidDate = (date: string, fromFormat: string = 'YYYY-MM-DD') => {
    return moment(date, fromFormat).isValid();
};

export const compareDateSameOrBefore = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD') => {
    return moment(from_date, fromFormat).isSameOrBefore(moment(to_date, fromFormat));
};

export const compareDateBefore = (from_date: string, to_date: string, fromFormat: string = 'YYYY-MM-DD') => {
    return moment(from_date, fromFormat).isBefore(moment(to_date, fromFormat));
};

export const diffYears = (
    fromDate: string | null | undefined,
    toDate = moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    fromFormat: string = 'YYYY',
) => {
    if (fromDate && toDate) {
        const dateEnd = moment(toDate).format(fromFormat);
        const dateStart = moment(fromDate).format(fromFormat);
        const years = moment(dateEnd, fromFormat).diff(moment(dateStart, fromFormat), 'years');

        return years;
    }
    return null;
};
