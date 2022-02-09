import * as api from "../api";
import { ActionType } from "../utils/constant";
import { Dispatch } from "redux"
import { Action } from "../reducers/auth.reducer";
import { Action as ActionMovie } from "../reducers/movie.reducer";

export const fetchUser = () => async (dispatch:Dispatch<Action>) => {
  try {
      const {data} = await api.fetchUser()
      dispatch({type: ActionType.AUTH, data})
  } catch (error) {
    console.log(error)
  }
};

export const fetchOwnMovieList = () => async (dispatch: Dispatch<ActionMovie>) => {
  try {
      const {data} = await api.fetchOwnMovieList()
      console.log("fetchOwnMovieList DDDDD || data",data)
      dispatch({type:ActionType.MY_MOVIE_LIST, data})
  } catch (error) {
      console.log("error",error)
  }
}