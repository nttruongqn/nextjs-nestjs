import { Response } from 'express';
import { http, message } from '@utils/constants';
import { loggerHelper } from '@utils/helpers';

const jsonSuccess = (results: any = null) => {
    return { status: 'OK', results };
};

const jsonError = (error: IMessageConstant | null = null, results: any = null) => {
    const res = { status: 'NG', error };
    if (results) {
        return { ...res, results };
    }
    return res;
};

export const successRes = (res: Response, results: any = null) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(http.SUCCESS_CODE).end(JSON.stringify(jsonSuccess(results)));
};

export const authFailRes = (res: Response) => {
    return res.status(http.AUTHENTICATION_FAIL_CODE).json(jsonError(message.AUTHENTICATE_FAIL_MESSAGE));
};

export const notAllowRes = (res: Response) => {
    return res.status(http.NOT_ALLOW_CODE).json(jsonError(message.NOT_ALLOW_MESSAGE));
};

export const notFoundRes = (res: Response) => {
    return res.status(http.NOT_FOUND_CODE).json(jsonError(message.NOT_FOUND_MESSAGE));
};

export const validationRes = (res: Response, message: IMessageConstant, data?: any) => {
    return res.status(http.VALIDATION_FAIL_CODE).json(jsonError(message, data));
};

export const exceptionRes = (res: Response, mess: string | null = null, err: Error | null = null, results: any = null) => {
    if (mess && err) {
        loggerHelper.error(mess, err);
    }
    return res.status(http.ERROR_EXCEPTION_CODE).json(
        jsonError(
            {
                ...message.ERROR_EXECEPTION_MESSAGE,
                error: `${err}`,
            },
            results,
        ),
    );
};
