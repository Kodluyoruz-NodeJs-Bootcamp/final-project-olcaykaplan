import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { fetchOwnActorList } from "../actions/actor.action";
import { fetchOwnMovieList } from "../actions/movie.action";

import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import MovieItem from "../Components/Posts/MovieItem/MovieItem";
import ActorItem from "../Components/Posts/ActorItem";
const OwnPosts = () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const { ownMovieList } = useSelector((state: RootState) => state.movie);
  const { ownActorList } = useSelector((state: RootState) => state.actor);
  const user = useSelector((state: RootState) => state.auth).user;

  // console.log("myList",myList)
  useEffect(() => {
    dispatch(fetchOwnMovieList());
    dispatch(fetchOwnActorList());
  }, []);

  const handleTabChange = (event:any, newValue:number) => {
    setTabIndex(newValue)
  }
  return (
    <Grid container justifyContent="center">
      <Grid
        item
        md={12}
        xs={12}
        sx={{ height: "200px", backgroundColor: "#f6c966" }}
        textAlign="center"
      >
        <img
          src={user.picture ? user.picture : "/static/images/avatar/2.jpg"}
          style={{ borderRadius: "50%" }}
        />
        <Typography variant="h3">{user.name + " " + user.surname}</Typography>
        <Typography variant="body1">{user.email}</Typography>
      </Grid>
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
            <MovieItem movieList={ownMovieList} isDiscover={false}/>
          ) : (
            <ActorItem actorList={ownActorList} isDiscover={false}/>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OwnPosts;
