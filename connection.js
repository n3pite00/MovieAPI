import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pgPool = new pg.Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB
});

export {pgPool};