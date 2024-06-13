import path from 'path';
import fs, { WriteStream } from 'fs';
import { writeToStream, FormatterOptionsArgs, Row } from '@fast-csv/format';

const getOptions = () => {
    return {
        header: true,
        quote: true,
        quoteColumns: true,
        quoteHeaders: true,
        escape: '"',
        rowDelimiter: '\n',
        writeBOM: true,
    };
};

const write = (filestream: WriteStream, rows: any[], options: FormatterOptionsArgs<any, Row>) => {
    return new Promise((res, rej) => {
        writeToStream(filestream, rows, options)
            .on('error', (err) => rej(err))
            .on('finish', () => res(null));
    });
};

export const create = async (csvPath: string, rows: any[], options?: FormatterOptionsArgs<any, Row>) => {
    try {
        await write(fs.createWriteStream(path.resolve(process.cwd(), csvPath)), rows, options || getOptions());
    } catch (err) {
        throw err;
    }
};
