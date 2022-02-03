import express from "express"
import { AddMovie, GetAllMovies, DeleteMovie } from "../controllers/movie.controller";
import { AddMovieComment ,GetAllCommentsOfMovie } from "../controllers/comments.controller";

const router = express.Router();

router.post('/movie', AddMovie)
router.delete('/movie/:id', DeleteMovie)
router.put('/movie/:id')

router.get('/movies', GetAllMovies)




// movie comment
router.post('/movie/comment', AddMovieComment)
router.get('/movie/comments', GetAllCommentsOfMovie);


export = router;