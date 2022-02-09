import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../actions/user.action";
import { Route, Redirect } from "react-router-dom";
import { RootState } from "../../reducers";

type Props = {
  children: JSX.Element;
  isPrivate: boolean;
};
const Layout = ({ children, isPrivate }: Props) => {
  //const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  let isAuthenticated = JSON.parse(localStorage.getItem('userInfo') || "").isAuthenticated
  const dispatch = useDispatch();

  // if page is not private then let show
  // if page is private then check person logged in. if user not logged in redirect home page
  console.log("isAuthenticated",isAuthenticated)
  const checkPermission = isPrivate ? (isAuthenticated ? true : false) : true;
  
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return checkPermission ? (
    <Grid container>
      <Header />
      <Grid style={{ minHeight: "85vh", minWidth: "100vw", backgroundColor:"#F9FAFA" }}>{children}</Grid>
      <Footer />
    </Grid>
  ) : (
    <Route render={() => <Redirect to="/" />} />
  );
};

export default Layout;
