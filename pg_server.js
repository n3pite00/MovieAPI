import express from 'express';
import { pgPool } from './connection.js';

const app = express();
app.use(express.urlencoded({extended: true}));

app.listen(3001, () => {
    console.log('Server running in port 3001');
});

// Pitää hakea http://127.0.0.1:3001/movies?keyword=1 tai http://127.0.0.1:3001/movies?keyword=i

app.get('/movies', async(req,res) => {

    let keyword = req.query.keyword;

    try {
        let result

        if (!keyword){
            result = await pgPool.query('SELECT * FROM movie');
        } else {
            const keyword_id = parseInt(keyword, 10)
            
            
            if (Number.isInteger(keyword_id)) {
                result = await pgPool.query('SELECT * FROM movie WHERE id = $1', [keyword_id]);

            } else {
                keyword = keyword.toLowerCase();
                keyword = '%'+keyword+'%';
                result = await pgPool.query('SELECT * FROM movie WHERE LOWER(name) LIKE $1', [keyword]);
            }
        }
        
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

// id bugi tietokannassa --> pyytää NOT NULL

app.post('/movie', async(req, res) =>{

    const name = req.body.mvname;
    const year = req.body.mvyear;
    const genre = req.body.mvgenre;

    try {
        await pgPool.query(
            'INSERT INTO movie VALUES ($1,$2,$3)', [name, year, genre]);
        res.end();
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

app.delete('/MovieDelete/:id', async(req, res) =>{
    const movie_id = req.params.id
    try {
        const id = parseInt(movie_id, 10);
        const query = "DELETE FROM movie WHERE id = $1";
        await pgPool.query(query, [id]);
        res.status(200).json({successful: "Movie was deleted."})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

app.get('/users', async(req,res) => {
    try {
        const result = await pgPool.query('SELECT * FROM movie_user');
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

app.post('/user', async(req, res) =>{

    const username = req.body.username;
    const fullname = req.body.fullname;
    const password = req.body.password;
    const birthyear = req.body.borthyear;

    try {
        await pgPool.query(
            'INSERT INTO movie VALUES ($1,$2,$3,$4)', [username, fullname, password, birthyear]);
        res.end();
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

app.get('/genres', async(req,res) => {
    try {
        const result = await pgPool.query('SELECT * FROM movie_genre');
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

app.post('/genre', async(req, res) =>{

    const id = req.body.genreid;
    const name = req.body.genrename;

    try {
        await pgPool.query(
            'INSERT INTO movie VALUES ($1,$2)', [id, name]);
        res.end();
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});