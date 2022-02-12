
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { fetchDiscoverActorList } from "../actions/actor.action";
import { fetchDiscoverMovieList } from "../actions/movie.action";

import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import MovieItem from "../Components/Posts/MovieItem/MovieItem";
import ActorItem from "../Components/Posts/ActorItem";
const DiscoverPosts = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const { discoverMovieList } = useSelector((state: RootState) => state.movie);
  const { discoverActorList } = useSelector((state: RootState) => state.actor);
  const user = useSelector((state: RootState) => state.auth).user;

   console.log("discoverActorList",discoverActorList)
   console.log("discoverMovieList",discoverMovieList)
  useEffect(() => {
    dispatch(fetchDiscoverMovieList());
    dispatch(fetchDiscoverActorList());
  }, []);

  const handleTabChange = (event:any, newValue:number) => {
    setTabIndex(newValue)
  }
  return (
    <Grid container justifyContent="center">
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid grey",
          paddingBottom: "10px",
        }}
      >
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Movies" />
          <Tab label="Actors" />
        </Tabs>
      </Box>
      <Grid item md={8} xs={12} textAlign="center">
        <h1>{tabIndex === 0 ? "Movies Here" : "Actors Here"}</h1>
        <Grid
          container
          justifyContent="center"
          sx={{ padding: { xs: "20px 0px", md: "60px" } }}
        >
          {tabIndex === 0 ? (
            <MovieItem movieList={discoverMovieList} />
          ) : (
             <ActorItem actorList={discoverActorList} />   
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DiscoverPosts;
