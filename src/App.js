import React, { useEffect, useState } from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import Post from './components/Post';
import NewPost from './components/NewPost';
import AllPosts from './components/AllPosts';
import Footer from './components/Footer';
import EditPost from './components/EditPost'
import EditComment from './components/EditComment'
import ErrorPage from './components/ErrorPage'

import './App.css';

const PrivateRoute = ({component: Component, ...rest}) =>
{
  const user = localStorage.getItem("jwtToken");
  return <Route {...rest} render={(props) =>
  {
    return user ? <Component {...rest} {...props} /> : <Redirect to="/login" />
  }} />;
}

function App() 
{
  //set state values
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() =>
  {
    let token;
    if (!localStorage.getItem("jwtToken"))
    {
      setIsAuthenticated(false);
    }
    else
    {
      token = jwt_decode(localStorage.getItem("jwtToken"));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  const nowCurrentUser = (userData) =>
  {
    console.log("nowCurrentUser is working...");
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () =>
  {
    if (localStorage.getItem("jwtToken"))
    {
      localStorage.removeItem("jwtToken");
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  };

  // console.log("Current User", currentUser);
  console.log("Authenticated", isAuthenticated);

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className="container mt-5">
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route 
            exact
            path="/login" 
            render={(props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} />} 
          />
          <Route 
            exact
            path="/allPosts" 
            render={(props) => <AllPosts {...props} user={currentUser} />}
          />
          <Route
            exact
            path="/post"
            render={({location},props)=> <Post {...props} location={location} user={currentUser}/>}>
          </Route>
          <Route
            exact
            path="/post/new"
            render={(props)=> <NewPost {...props} user={currentUser} />}>
          </Route>
          <Route
            exact
            path="/post/edit"
            render={(props)=> <EditPost {...props} user={currentUser} />}>
          </Route>
          <Route
            exact
            path="/comment/edit"
            render={(props)=> <EditComment {...props} user={currentUser} />}>
          </Route>
          <PrivateRoute exact path="/profile" component={Profile} user={currentUser} />
          <Route exact path="/" component={Home} />
          <Route component={ErrorPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;