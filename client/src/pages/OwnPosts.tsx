import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
//import { fetchOwnActorList } from "../actions/actor.action";
//import { fetchOwnMovieList } from "../actions/movie.action";
import { fetchOwnMovieList } from "../actions/user.action";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import MovieItem from "../Components/Posts/MovieItem";
const OwnPosts = () => {
  const dispatch = useDispatch();
  // const {myList} = useSelector((state:RootState) => state.actor)
  const { ownList } = useSelector((state: RootState) => state.movie);
  const user = useSelector((state: RootState) => state.auth).user;

  // console.log("myList",myList)
  useEffect(() => {
    dispatch(fetchOwnMovieList());
  }, []);
  return (
    <Grid container justifyContent="center">
      <Grid item md={12} xs={12} sx={{height:"200px", backgroundColor:"#f6c966" }} textAlign="center">
     <img src={user.picture ? user.picture : "/static/images/avatar/2.jpg"} style={{borderRadius:"50%"}}/> 
     <Typography variant="h3">{user.name + " " + user.surname}</Typography>
     <Typography variant="body1">{user.email}</Typography>
      </Grid>
      
   
      <Grid
        item
        md={8}
        xs={12}
        textAlign="center" 
              
      >
        <h1>Movies Here</h1>
        <Grid
          container
          justifyContent="center"
          sx={{ padding: { xs: "20px 0px", md:"60px" } }}
        >
          <MovieItem movieList={ownList}/>
       </Grid>
      </Grid>
    </Grid>
  );
};

export default OwnPosts;
