import axios from "axios";
import { actor } from "../reducers/actor.reducer";
import { movieRegister } from "../utils/types";

const url = "http://localhost:5000/api";

const API = axios.create({ baseURL: url, withCredentials: true });

//Fetch User
export const fetchUser = () => API.get("/auth/user-auth");


// Actor
export const addNewActor = (actorData:actor) => API.post("/actor", actorData)
export const fetchOwnActorList = () => API.get("/own-actor-list")
export const fetchDiscoverActorList = () => API.get("/actor/discover")

// Movie
export const addNewMovie = (movieData:movieRegister) => API.post("/movie", movieData)
export const updateMovie = (movieData:movieRegister, movieId:number) => API.put(`/movie/${movieId}`, movieData)
export const deleteMovie = (movieId:number) => API.delete(`/movie/${movieId}`)

export const publishMovie = (data:object) => API.post("/movie/publish", data)
export const fetchOwnMovieList = () => API.get("/own-movie-list")
export const fetchDiscoverMovieList = () => API.get("/movie/discover")
//Movie Comment
export const addNewCommentForMovie = (movieId:number, comment:string) => API.post("/movie/comment", {movieId,comment})
export const removeComment = (commentId:number) => API.delete(`/movie/comment/${commentId}` )
//Movie Like
export const likeMovie = (movieId:number) => API.post(`/movie/like/${movieId}`)
export const removeLikeMovie = (likeId:number) => API.delete(`/movie/like/${likeId}`)