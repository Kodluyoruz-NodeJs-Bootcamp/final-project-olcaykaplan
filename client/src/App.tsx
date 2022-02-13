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
import UpdateActor from "./pages/UpdateActor";

function App() {

  return (
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
        <Route path="/update-movie" exact>
          <Layout isPrivate={true}>
            <UpdateMovie/>
          </Layout>
        </Route>
        <Route path="/update-actor" exact>
          <Layout isPrivate={true}>
            <UpdateActor/>
          </Layout>
        </Route>
        <Route path="/posts" exact>
          <Layout isPrivate={true}>
            <DiscoverPosts/>
          </Layout>
        </Route>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;
