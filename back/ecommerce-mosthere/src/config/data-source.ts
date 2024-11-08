import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'
import { registerAs } from "@nestjs/config";

dotenv.config({
    path: '.env.development.local'
})

const PostgresDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migration/*{.ts,.js}'],
    subscribers: [],
};

export const PostgresDataSourceConfig = registerAs(
    'postgres',
    () => PostgresDataSourceOptions,
)

export const PostgresDataSource = new DataSource(PostgresDataSourceOptions)