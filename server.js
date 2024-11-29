import express from 'express';
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

const {Client} = pg;

app.listen(3001, () => {
    console.log('Server running in port 3001');
});

const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB
});

connect();

async function connect() {

    try{
        await client.connect();
        console.log('Database connected...')

    } catch (error) {
        console.log(error.message)
    }
    

}