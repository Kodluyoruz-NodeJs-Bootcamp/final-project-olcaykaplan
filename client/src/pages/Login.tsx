import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../actions/user.action";
import { ReactComponent as GoogleIcon } from "../assets/img/google.svg";
import { ReactComponent as FacebookIcon } from "../assets/img/facebook.svg";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "../reducers";
const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const google = async () => {
    window.open("http://localhost:5000/api/auth/google", "_parent");
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return isAuthenticated ? (
    <Route 
    render={() => <Redirect to="/" />} 
    />
  ) : (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login By
          </Typography>
          <Box textAlign="center" mt={5}>
            <Button
              color="inherit"
              style={{ margin: "10px 15px", border: "1px solid lightgrey" }}
              onClick={google}
            >
              <GoogleIcon style={{ width: "40px", marginRight: "40px" }} />
              Countinue with Google
            </Button>
            <Button
              color="inherit"
              style={{
                margin: "10px 15px",
                border: "1px solid lightgrey",
                backgroundColor: "#3F51B5",
                color: "white",
              }}
            >
              <FacebookIcon style={{ width: "40px", marginRight: "30px" }} />
              Countinue with Facebook
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
//className="w-4 h-4 mr-2 "
export default Login;
