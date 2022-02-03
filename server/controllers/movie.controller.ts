import { Request, Response } from "express";
import { MovieComment } from "../entities/movieComments.entity";
import { MovieLikes } from "../entities/movieLikes.entity";
import { Movie } from "../entities/movies.entity";
import { User } from "../entities/user.entity";

export const AddMovie = async (req: Request, res: Response) => {
  try {
    console.log("AddMovie req.body", req.body);
    const { userId, ...body } = req.body;
    const user = await User.findOne(userId);
    const movie = await Movie.save({
      ...body,
      user,
    });
    res.status(201).send(movie);
  } catch (error) {}
};

export const UpdateMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const body = req.body;
    console.log("movieId", movieId);
    const update = await Movie.update(movieId, {
      ...body,
    });
    res.status(202).send(update);
  } catch (error) {}
};

// Delete movie by params movie id
export const DeleteMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    await Movie.delete(movieId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteMovie | error: ", error);
  }
};

export const GetAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (error) {
    console.log("GetAllMovies | error", error);
  }
};

// COMMENT START

// Add new Comment for Movie
export const AddCommentForMovie = async (req: Request, res: Response) => {
  try {
    console.log("AddMovie: ", req.body);
    const { userId, movieId, ...body } = req.body;
    const user = await User.findOne(userId);
    const movie = await Movie.findOne(movieId);
    const comment = await MovieComment.save({
      ...body,
      user,
      movie,
    });
    res.status(201).send(comment);
  } catch (error) {}
};

export const UpdateComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const comment = req.body.comment;
    const update = await MovieComment.update(commentId, { comment });

    res.status(202).send(update)
  } catch (error) {}
};

// Delete Comment by Comment ID
export const DeleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.body.commentId;
    console.log("commentId", commentId);
    await MovieComment.delete(commentId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

export const GetAllCommentsOfMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.body.movieId;
    const comments = await MovieComment.find({
      relations: ["movie", "user"],
      where: { movie: { id: movieId } },
    });
    res.status(200).send(comments);
  } catch (error) {}
};

// COMMENT END

// LIKE START
export const AddLikeForMovie = async (req: Request, res: Response) => {
  try {
    console.log("AddMovie: ", req.body);
    const { userId, movieId, ...body } = req.body;
    const user = await User.findOne(userId);
    const movie = await Movie.findOne(movieId);
    const likes = await MovieLikes.save({
      ...body,
      user,
      movie,
    });
    res.status(201).send(likes);
  } catch (error) {}
};

// Delete Like by Like ID
export const DeleteLike = async (req: Request, res: Response) => {
  try {
    const likeId = req.body.likeId;
    console.log("commentId", likeId);
    await MovieComment.delete(likeId);
    res.status(204).send(true);
  } catch (error) {
    console.log("DeleteComment | error: ", error);
  }
};

export const GetAllLikesOfMovie = async (req: Request, res: Response) => {
  try {
    const movieId = req.body.movieId;
    const comments = await MovieComment.find({
      relations: ["movie", "user"],
      where: { movie: { id: movieId } },
    });
    res.status(200).send(comments);
  } catch (error) {}
};

// LIKE END
