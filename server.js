import express from 'express';
import client from './pg_server.js'

const app = express();

app.listen(3001, () => {
    console.log('Server running in port 3001');
});

app.post('/genres', async(req, res) =>{
    const { name } = req.body;

    try {
        const result = await client.query('INSERT INTO genres (name) VALUES ()')
    } catch(error){
        console.log(error.message)
    }

});

