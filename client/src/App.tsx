import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";
import OwnPosts from "./pages/OwnPosts";
import DiscoverPosts from "./pages/DiscoverPosts";
import UpdateMovie from "./pages/UpdateMovie";

function App() {
  const google = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  };
  const facebook = () => {
    window.open("http://localhost:5000/api/auth/facebook", "_self");
  };
  return (
    // <div className="App">
    //   <button style={{width:"150px", height:"50px"}} onClick={google}>google</button>
    //   <button style={{width:"150px", height:"50px"}} onClick={facebook}>facebook</button>
    // </div>
    <Router>
      <Switch>
        <Route path="/" exact>
          <Layout isPrivate={false}>
            <HomePage />
          </Layout>
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/create-new-post" exact>
          <Layout isPrivate={true}>
            <CreatePost/>
          </Layout>
        </Route>

        <Route path="/user/own-posts/" exact>
          <Layout isPrivate={true}>
            <OwnPosts/>
          </Layout>
        </Route>
        <Route path="/update-post" exact>
          <Layout isPrivate={true}>
            <UpdateMovie/>
          </Layout>
        </Route>

        <Route path="/posts" exact>
          <Layout isPrivate={true}>
            <DiscoverPosts/>
          </Layout>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
