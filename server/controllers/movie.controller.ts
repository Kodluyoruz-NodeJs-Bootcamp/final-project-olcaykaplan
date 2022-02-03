import { Request, Response } from "express";
import { Movie } from "../entities/movies.entity";
import { User } from "../entities/user.entity";

export const AddMovie = async (req: Request, res: Response) => {
  try {
    console.log("AddMovie req.body", req.body);
    const user = await User.findOne(req.body.userId);
    const { userId, ...body } = req.body;
    const movie = await Movie.save({
      ...body,
      user,
    });
    res.send(movie);
  } catch (error) {}
};

export const DeleteMovie = async (req: Request, res: Response) => {
  try {
      console.log("req.params.id",req.params.id)
       await Movie.delete(req.params.id)
       res.send(true)
  } catch (error) {
    console.log("DeletePost | error: ", error);

  }
};

export const GetAllMovies = async (req: Request, res: Response) => {
try {
    const movies = await Movie.find();
    res.send(movies)
} catch (error) {
    
}
}