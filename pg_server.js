import express from 'express';
import { pgPool } from './connection.js';

const app = express();

app.listen(3001, () => {
    console.log('Server running in port 3001');
});

app.get('/movie', async(req,res) => {
    try {
        const result = await pgPool.query('SELECT * FROM movie');
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});