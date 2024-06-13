import { v4 as uuid4 } from 'uuid';

export const generateUuid = () => {
    return uuid4();
};


export const generateRandom = (length: number) => {
    let string = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        string += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return string;
};

export const statusText = (status: boolean) => {
    switch (status) {
        case true:
            return 'true';
        case false:
            return 'false';
    }
};