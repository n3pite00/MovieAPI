import express from 'express';
import { pgPool } from './connection.js';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

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
    const genreId = req.body.genreId;

    try {
        await pgPool.query(
            'INSERT INTO movie (name, year, genreId) VALUES ($1,$2,$3)', [name, year, genreId]);
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
    const name = req.body.name;
    const password = req.body.password;
    const birthYear = req.body.birthYear;



    try {
        await pgPool.query(
            'INSERT INTO movie_user (username, name, password, birthYear) VALUES ($1,$2,$3,$4)', [username, name, password, birthYear]);
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
    const desc = req.body.desc;
    const movieID = req.body.movieID;

    try {
        await pgPool.query(
            'INSERT INTO review (username, stars, "desc", movieID) VALUES ($1,$2,$3,$4)', [username, stars, desc, movieID]);
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
    const movieId = req.body.movieId;

    try {
        await pgPool.query(
            'INSERT INTO favorites (username, movieId) VALUES ($1,$2)', [username, movieId]);
            res.status(200).json({successful: "Favorite was added."})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

});