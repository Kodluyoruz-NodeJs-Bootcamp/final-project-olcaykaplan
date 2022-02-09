import axios from "axios";
import { actor } from "../reducers/actor.reducer";
import { movieRegister } from "../reducers/movie.reducer";

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
export const publishMovie = (data:object) => API.post("/movie/publish", data)
export const fetchOwnMovieList = () => API.get("/own-movie-list")
export const fetchDiscoverMovieList = () => API.get("/movie/discover")