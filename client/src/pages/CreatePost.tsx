import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import ActorForm from "../Components/CreatePostForms/ActorForm";
import MovieForm from "../Components/CreatePostForms/MovieForm";

const CreatePost = () => {
  const [formType, setFormType] = useState<string>(" ");
  const [title, setTitle] = useState<string>("Create A New Post");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | any) => {
    const type = event.target.value;
    const title = type === "movie" ? "Movie" : type === "actor" ? "Actor" : "Post";
    setFormType(type);
    setTitle("Create A New " + title);
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11} md={8} xl={8} mt={3}>
        <Box style={{ display: "grid" }} textAlign="center">
          <Typography variant="h3" textAlign="center" mt={2} mb={2}>
            {title}
          </Typography>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={formType}
            onChange={handleChange}
            fullWidth
            sx={{backgroundColor:"#F0A500"}}
          >
            <MenuItem value={" "} >
              <em>Select a type.</em>
            </MenuItem>
            <MenuItem value={"movie"}>Movie</MenuItem>
            <MenuItem value={"actor"}>Actor</MenuItem>
          </Select>
        </Box>
        {formType === "movie" ?  <MovieForm/> : formType === "actor" ? <ActorForm/> : null   }
      </Grid>
    </Grid>
  );
};

export default CreatePost;
