import express from "express";
import {
  AddMovie,
  UpdateMovie,
  DeleteMovie,
  GetAllMovies,

  AddCommentForMovie,
  UpdateComment,
  DeleteComment,
  GetAllCommentsOfMovie,
  
  AddLikeForMovie,
  GetAllLikesOfMovie,
  DeleteLike
} from "../controllers/movie.controller";

const router = express.Router();

// CONMMENT
router.post("/movie/comment", AddCommentForMovie);
router.put("/movie/comment/:id", UpdateComment);
router.delete("/movie/comment", DeleteComment)
router.get("/movie/comments", GetAllCommentsOfMovie);

//LIKE
router.post("/movie/like", AddLikeForMovie);
router.delete("/movie/like", DeleteLike)
router.get("/movie/likes", GetAllLikesOfMovie);

//Movie
router.post("/movie", AddMovie);
router.delete("/movie/:id", DeleteMovie);
router.put("/movie/:id", UpdateMovie);
router.get("/movies", GetAllMovies);

export = router;
