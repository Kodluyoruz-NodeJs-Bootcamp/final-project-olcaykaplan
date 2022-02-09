import * as api from "../api";
import { ActionType } from "../utils/constant";
import { Dispatch } from "redux"
import { Action, movieRegister } from "../reducers/movie.reducer";


export const addNewMovie = (movieData:movieRegister) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.addNewMovie(movieData)
        console.log("addNewMovie || data",data)
    } catch (error) {
        console.log("error",error)
    }
}

export const publishMovie = (movieId:number, isPublished:boolean) => async (dispatch: Dispatch<Action>) => {
    try {
        const data = { movieId, isPublished}
        const update = await api.publishMovie(data)
        window.location.reload()
    } catch (error) {
        
    }
}

export const fetchOwnMovieList = () => async (dispatch: Dispatch<Action>) => {
    try {
        const data = await api.fetchOwnMovieList()
        console.log("fetchOwnMovieList DDDDD || data",data)
       // dispatch({type:ActionType.MY_MOVIE_LIST, data:{data}})
    } catch (error) {
        console.log("error",error)
    }
}

export const fetchDiscoverMovieList = () => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.fetchDiscoverMovieList()
        console.log("fetchDiscoverMovieList || data",data)
    } catch (error) {
        
    }
}