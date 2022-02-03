import { Request, Response } from "express";
import { MovieComment } from "../entities/movieComments.entity";
import { Movie } from "../entities/movies.entity";
import { User } from "../entities/user.entity";
//import { ActorComment } from "../entities/actorComments.entity"

// Movie Comment Operations
export const AddMovieComment = async (req: Request, res: Response) => {
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
    res.send(comment);
  } catch (error) {}
};

export const GetAllCommentsOfMovie = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.body;
    const comments = await MovieComment.find({relations: ['movie', 'user'], where:{movie: {id:movieId}}})
    res.send(comments);
  } catch (error) {}
};


// Actor Comment Operations
