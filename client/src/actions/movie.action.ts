import * as api from "../api";
import { ActionType } from "../utils/constant";
import { Dispatch } from "redux"
import { Action } from "../reducers/movie.reducer";
import { movieRegister, user } from "../utils/types";

export const addNewMovie = (movieData:movieRegister) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.addNewMovie(movieData)
    } catch (error) {
        console.log("error",error)
    }
}
export const updateMovie = (movieData:movieRegister, movieId: number) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.updateMovie(movieData, movieId)
    } catch (error) {
        console.log("error",error)
    }
}
export const deleteMovie = (movieId: number) => async (dispatch: Dispatch<Action>) => {
    console.log("movieId",movieId)
      await api.deleteMovie(movieId)
       .then((response) => {
           dispatch({type:ActionType.DELETE_MOVIE, data:{movieId}})
       })
       .catch((error)=> {
            if (error.response){
                console.log(error.response.data)
                // console.log(error.response.status)
                // console.log(error.response.headers)
            }
        })
}
export const addNewCommentForMovie = (movieId:number,movieComment:string, user:user, isOwnMovie:boolean) => async (dispatch: Dispatch<Action>) => {
    try {
        let {data} = await api.addNewCommentForMovie(movieId,movieComment)
        dispatch({type:ActionType.ADD_COMMENT_FOR_MOVIE, data:{...data, movieId}})
    } catch (error) {
        console.log("error",error)
    }
}

export const removeComment = (commentId:number, movieId:number ) => async (dispatch: Dispatch<Action>) => {

       const data =  await api.removeComment(commentId)
       .then((response) => {
           dispatch({type:ActionType.REMOVE_MOVIE_COMMENT, data:{movieId, commentId}})
       })
       .catch((error)=> {
            if (error.response){
                console.log(error.response.data)
                // console.log(error.response.status)
                // console.log(error.response.headers)
            }
        })
}


export const publishMovie = (movieId:number, isPublished:boolean) => async (dispatch: Dispatch<Action>) => {
    try {
        const data = { movieId, isPublished}
        const update = await api.publishMovie(data)
        window.location.reload()
    } catch (error) {
        
    }
}
export const likeMovie = (movieId:number) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.likeMovie(movieId)
       console.log("data",data)
        dispatch({type:ActionType.LIKE_MOVIE ,data})
    } catch (error) {
        
    }
}
export const removeLikeMovie = (movieId:number, likeId:number) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.removeLikeMovie(likeId)
        console.log("update",data)
        dispatch({type:ActionType.REMOVE_LIKE_MOVIE , data:{movieId, likeId}})

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