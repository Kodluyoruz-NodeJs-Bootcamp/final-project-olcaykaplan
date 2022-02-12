import * as api from "../api";
import { ActionType } from "../utils/constant";
import { Dispatch } from "redux";
import { Action } from "../reducers/actor.reducer";
import { actorRegister, user } from "../utils/types";

export const addNewActor = (actorData: actorRegister) => async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await api.addNewActor(actorData);
    } catch (error) {
      console.log("error", error);
    }
  };


export const updateActor = (actorData:actorRegister, actorId:number, postType:string) => async (dispatch: Dispatch<Action>) => {
  try {
    const {data} = await api.updateActor(actorData, actorId, postType)
  } catch (error) {
      console.log("error",error)
  }
}
export const deleteActor = (actorId: number, postType:string) => async (dispatch: Dispatch<Action>) => {
    await api.deleteActor(actorId, postType)
     .then((response) => {
         dispatch({type:ActionType.DELETE_ACTOR, data:{actorId}})
     })
     .catch((error)=> {
          if (error.response){
              console.log(error.response.data)
              // console.log(error.response.status)
              // console.log(error.response.headers)
          }
      })
}

export const publishActor = (actorId:number, isPublished:boolean) => async (dispatch: Dispatch<Action>) => {
  try {
      const data = { actorId, isPublished}
      const update = await api.publishActor(data)
      dispatch({type:ActionType.PUBLISH_ACTOR, data:{actorId, isPublished}})
  } catch (error) {
      
  }
}

export const fetchOwnActorList = () => async (dispatch: Dispatch<Action>) => {
  try {
    const {data} = await api.fetchOwnActorList();
    dispatch({type:ActionType.MY_ACTOR_LIST, data})

  } catch (error) {
    console.log("error", error);
  }
};

export const fetchDiscoverActorList = () => async (dispatch: Dispatch<Action>) => {
  try {
      const {data} = await api.fetchDiscoverActorList()
      console.log("fetchDiscoverActorList data",data)
      dispatch({type:ActionType.DISCOVER_ACTOR_LIST, data})
  } catch (error) {
      
  }
}
//----------------------------------
// COMMENT ACTIONS

export const addNewCommentForActor = (actorId:number,actorComment:string, user:user, isDiscover:boolean) => async (dispatch: Dispatch<Action>) => {
  try {
      let {data} = await api.addNewCommentForActor(actorId,actorComment)
      dispatch({type:ActionType.ADD_COMMENT_FOR_ACTOR, data:{...data, actorId, isDiscover}})
  } catch (error) {
      console.log("error",error)
  }
}

export const removeCommentForActor = (commentId:number, actorId:number, postType:string, isDiscover:boolean) => async (dispatch: Dispatch<Action>) => {

     const data =  await api.removeCommentForActor(commentId, postType)
     .then((response) => {
         dispatch({type:ActionType.REMOVE_ACTOR_COMMENT, data:{actorId, commentId, isDiscover}})
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

export const likeActor = (actorId:number, isDiscover:boolean) => async (dispatch: Dispatch<Action>) => {
  try {
      const {data} = await api.likeActor(actorId)
      dispatch({type:ActionType.LIKE_ACTOR ,data:{data, isDiscover}})
  } catch (error) {
      
  }
}
export const removeLikeActor = (actorId:number, likeId:number, isDiscover:boolean) => async (dispatch: Dispatch<Action>) => {
  try {
      const {data} = await api.removeLikeActor(likeId)
      dispatch({type:ActionType.REMOVE_LIKE_ACTOR , data:{actorId, likeId, isDiscover}})

  } catch (error) {
      
  }
}