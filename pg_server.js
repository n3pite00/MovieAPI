import express from 'express';
import { pgPool } from './connection.js';

const app = express();

app.use(express.urlencoded({extended: true}));

app.listen(3001, () => {
    console.log('Server running in port 3001');
});

app.get('/movies', async(req,res) => {

    let keyword = req.query.keyword;

    try {
        let result

        if (!keyword){
            result = await pgPool.query('SELECT * FROM movie');
        } else {
            keyword = keyword.toLowerCase();
            keyword = '%'+keyword+'%';
            result = await pgPool.query('SELECT * FROM movie WHERE LOWER(name) LIKE $1', [keyword]);   
        }
        
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});



app.post('/movie', async(req, res) =>{

    const name = req.body.name;
    const year = req.body.year;
    const genre = req.body.genre;

    try {
        await pgPool.query(
            'INSERT INTO movie (name, year, genre) VALUES ($1,$2,$3)', [name, year, genre]);
        res.status(200).json({successful: "Movie was added"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

app.get('/movie/:id', async(req, res) =>{
    const movies_id = req.params.id
    try {
        let result
    
        const id = parseInt(movies_id, 10)

        if (!Number.isInteger(id)) {
            return res.status(400).json({error: error.message})
        }
        
        result = await pgPool.query('SELECT * FROM movie WHERE id = $1', [id]);
        res.json(result.rows[0]);

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.delete('/mobie/:id', async(req, res) =>{
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

app.post('/register', async(req, res) =>{

    const username = req.body.username;
    const fullname = req.body.fullname;
    const password = req.body.password;
    const birthyear = req.body.birthyear;



    try {
        await pgPool.query(
            'INSERT INTO movie_user (username, fullname, password, birthyear) VALUES ($1,$2,$3,$4)', [username, fullname, password, birthyear]);
            res.status(200).json({successful: "User has been registered."})
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

    const name = req.body.name;

    try {
        await pgPool.query(
            'INSERT INTO movie_genre (name) VALUES ($1)', [name]);
            res.status(200).json({successful: "Genre was added."})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

app.get('/reviews', async(req,res) => {
    try {
        const result = await pgPool.query('SELECT * FROM review');
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});



app.post('/review', async(req, res) =>{

    const username = req.body.username;
    const stars = req.body.stars;
    const review_text = req.body.review_text;
    const movie_id = req.body.movie_id;

    try {
        await pgPool.query(
            'INSERT INTO review (username, stars, review_text, movie_id) VALUES ($1,$2,$3,$4)', [username, stars, review_text, movie_id]);
            res.status(200).json({successful: "Review was added."})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

app.get('/favourites', async(req,res) => {
    try {
        const result = await pgPool.query('SELECT * FROM favorites');
        res.json(result.rows);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});

app.post('/favourite', async(req, res) =>{

    const username = req.body.username;
    const movie_id = req.body.movie_id;

    try {
        await pgPool.query(
            'INSERT INTO favorites (username, movie_id) VALUES ($1,$2)', [username, movie_id]);
            res.status(200).json({successful: "Favorite was added."})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});