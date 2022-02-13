import axios from "axios";
import { movieRegister, actorRegister } from "../utils/types";

const url = "https://movies-api-final.herokuapp.com/api";

const API = axios.create({ baseURL: url, withCredentials: true });

//Fetch User
export const fetchUser = () => API.get("/auth/user-auth");
export const logout = () => API.get("/auth/logout");



// Actor
export const addNewActor = (actorData:actorRegister) => API.post("/actor", actorData)
export const updateActor = (actorData:actorRegister, actorId:number, postType:string) => API.put(`/actor/${actorId}/${postType}`, actorData)
export const deleteActor = (actorId:number, postType:string) => API.delete(`/actor/${actorId}/${postType}`)

export const publishActor = (data:object) => API.post("/actor/publish", data)
export const fetchOwnActorList = () => API.get("/own-actor-list")
export const fetchDiscoverActorList = () => API.get("/actor/discover")

//Actor Comment
export const addNewCommentForActor = (actorId:number, comment:string) => API.post("/actor/comment", {actorId,comment})
export const removeCommentForActor = (commentId:number, postType:string) => API.delete(`/actor/comment/${commentId}/${postType}` )
//Actor Like
export const likeActor = (actorId:number) => API.post(`/actor/like/${actorId}`)
export const removeLikeActor = (likeId:number) => API.delete(`/actor/like/${likeId}`)



// Movie
export const addNewMovie = (movieData:movieRegister) => API.post("/movie", movieData)
export const updateMovie = (movieData:movieRegister, movieId:number, postType:string) => API.put(`/movie/${movieId}/${postType}`, movieData)
export const deleteMovie = (movieId:number, postType:string) => API.delete(`/movie/${movieId}/${postType}`)

export const publishMovie = (data:object) => API.post("/movie/publish", data)
export const fetchOwnMovieList = () => API.get("/own-movie-list")
export const fetchDiscoverMovieList = () => API.get("/movie/discover")
//Movie Comment
export const addNewCommentForMovie = (movieId:number, comment:string) => API.post("/movie/comment", {movieId,comment})
export const removeCommentForMovie = (commentId:number, postType:string) => API.delete(`/movie/comment/${commentId}/${postType}` )
//Movie Like
export const likeMovie = (movieId:number) => API.post(`/movie/like/${movieId}`)
export const removeLikeMovie = (likeId:number) => API.delete(`/movie/like/${likeId}`)