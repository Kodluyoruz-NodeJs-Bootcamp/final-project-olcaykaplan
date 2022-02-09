import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import bgImage from "../assets/img/home-background.jpg";
const HomePage = () => {
  return (
    <Grid container component="main" sx={{ height: "85vh" }}>
      <Grid item xs={false} md={12} >
      <img
        src={bgImage}
        style={{
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width:"100vw",
          height:"85vh",
          filter: "brightness(50%)"     
        }}
      />
      <Box style={{textAlign:"center", top:"15vh",  position:"absolute", width:"100%"}} >
      <Typography variant="h2" style={{color:"#F0A500"}}>Create Your <strong>Favorite Movies & Actros</strong></Typography>
      <Typography variant="h3" style={{color:"#FF6584"}}>AND <strong>Share</strong> With Community</Typography>
      </Box>
       </Grid>

    </Grid>
  );
};

export default HomePage;
