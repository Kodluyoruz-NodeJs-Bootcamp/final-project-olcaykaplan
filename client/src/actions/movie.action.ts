import * as api from "../api";
import { ActionType } from "../utils/constant";
import { Dispatch } from "redux"
import { Action } from "../reducers/movie.reducer";
import { movieRegister, user } from "../utils/types";

// MOVIE ACTIONS

export const addNewMovie = (movieData:movieRegister) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.addNewMovie(movieData)
    } catch (error) {
        console.log("error",error)
    }
}
export const updateMovie = (movieData:movieRegister, movieId:number, postType:string) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.updateMovie(movieData, movieId, postType)
    } catch (error) {
        console.log("error",error)
    }
}
export const deleteMovie = (movieId:number, postType:string) => async (dispatch: Dispatch<Action>) => {
      await api.deleteMovie(movieId, postType)
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

export const publishMovie = (movieId:number, isPublished:boolean) => async (dispatch: Dispatch<Action>) => {
    try {
        const data = { movieId, isPublished}
        const update = await api.publishMovie(data)
        dispatch({type:ActionType.PUBLISH_MOVIE, data:{movieId, isPublished}})
    } catch (error) {
        
    }
}

export const fetchOwnMovieList = () => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.fetchOwnMovieList()
        dispatch({type:ActionType.MY_MOVIE_LIST, data})
    } catch (error) {
        console.log("error",error)
    }
  }

export const fetchDiscoverMovieList = () => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.fetchDiscoverMovieList()        
        dispatch({type:ActionType.DISCOVER_MOVIE_LIST, data})

    } catch (error) {
        
    }
}
//----------------------------------
// COMMENT ACTIONS

export const addNewCommentForMovie = (movieId:number,movieComment:string, user:user, isDiscover:boolean) => async (dispatch: Dispatch<Action>) => {
    try {
        let {data} = await api.addNewCommentForMovie(movieId,movieComment)
        dispatch({type:ActionType.ADD_COMMENT_FOR_MOVIE, data:{...data, movieId, isDiscover}})
    } catch (error) {
        console.log("error",error)
    }
}

export const removeCommentForMovie = (commentId:number, movieId:number, postType: string, isDiscover:boolean ) => async (dispatch: Dispatch<Action>) => {

       const data =  await api.removeCommentForMovie(commentId, postType)
       .then((response) => {
           dispatch({type:ActionType.REMOVE_MOVIE_COMMENT, data:{movieId, commentId, isDiscover}})
       })
       .catch((error)=> {
            if (error.response){
                console.log(error.response.data)
                // console.log(error.response.status)
                // console.log(error.response.headers)
            }
        })
}

//----------------------------------
// LIKE ACTIONS

export const likeMovie = (movieId:number, isDiscover:boolean) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.likeMovie(movieId)
       console.log("data",data)
        dispatch({type:ActionType.LIKE_MOVIE ,data:{data, isDiscover}})
    } catch (error) {
        
    }
}
export const removeLikeMovie = (movieId:number, likeId:number, isDiscover:boolean) => async (dispatch: Dispatch<Action>) => {
    try {
        const {data} = await api.removeLikeMovie(likeId)
        console.log("update",data)
        dispatch({type:ActionType.REMOVE_LIKE_MOVIE , data:{movieId, likeId, isDiscover}})

    } catch (error) {
        
    }
}

