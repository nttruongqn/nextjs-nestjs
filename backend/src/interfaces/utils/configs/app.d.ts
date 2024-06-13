interface IDatabaseConfig {
    CONNECTION_NAME: string;
    HOST: string;
    PORT: string;
    USERNAME: string;
    PASSWORD: string;
    DBNAME: string;
    ENCRYPT: boolean;
}


interface IAppOptionConfig {
    PORT: string;
    OPTIONS: {
        cors: boolean;
    };
    TIME_ZONE: string;
    ENV: string;
}


interface IAppConfig {
    MYSQL: IDatabaseConfig;
    APP: IAppOptionConfig;
}
