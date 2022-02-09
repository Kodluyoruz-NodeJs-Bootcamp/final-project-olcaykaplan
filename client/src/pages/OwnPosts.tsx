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
  // console.log("myList",myList)
  useEffect(() => {
    dispatch(fetchOwnMovieList());
  }, []);
  return (
    <Grid container justifyContent="center">
      <Grid item md={12}>
        user information will be here
      </Grid>
      <Grid item md={12}>
        types here, which list should listed below (movie or actor)
      </Grid>
      <Grid
        item
        md={8}
        xs={12}
        textAlign="center"
        style={{ backgroundColor: "red" }}
      >
        <h1>Movies Here</h1>
        <Grid
          container
          justifyContent="center"
          sx={{ backgroundColor: "orange", padding: { xs: "20px 0px", md:"60px" } }}
        >
          <MovieItem/>
       </Grid>
      </Grid>
    </Grid>
  );
};

export default OwnPosts;
