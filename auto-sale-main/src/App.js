import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import MainPage from "./components/MainPage";
import CarDetails from "./components/CarDetails";
import Login from "./components/Login";
import Signup from './components/Signup';
import Profile from './components/Profile';
import AddCar from './components/AddCar';
import store from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGOUT_USER, AUTHENTICATE_USER, SET_USER} from "./redux/actionTypes";
import EditProfile from "./components/EditProfile";
import User from './components/User'
import EditCar from './components/EditCar'

axios.defaults.baseURL =
  "https://europe-west1-auto-sale-2e890.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch({
      type: LOGOUT_USER
    });
  } else {
    store.dispatch({
      type: AUTHENTICATE_USER,
      payload:token
    })

    axios.get(`/getUser?email=${decodedToken.email}`)
    .then((data)=>{
      store.dispatch({
        type:SET_USER, 
        payload:data.data})
    })
    
    // axios.defaults.headers.common["Authorization"] = token;
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/user/:id" component = {User} />
            <Route exact path="/car/:id" component={CarDetails} />
            <Route
              exact
              path="/login"
              render={props =>
                localStorage.getItem("FBIdToken") ? (
                  <Redirect to="/" />
                ) : (
                  <Login history={props.history} />
                )
              }
            />
            <Route
              exact
              path="/editCar/:id"
              render={props =>
                !localStorage.getItem("FBIdToken") ? (
                  <Redirect to="/" />
                ) : (
                  <EditCar history={props.history}/>
                )
              }
            />
            <Route
              exact
              path="/add"
              render={props =>
                !localStorage.getItem("FBIdToken") ? (
                  <Redirect to="/login" />
                ) : (
                  <AddCar history={props.history} />
                )
              }
            />
            <Route
              exact
              path="/signup"
              render={props =>
                localStorage.getItem("FBIdToken") ? (
                  <Redirect to="/" />
                ) : (
                  <Signup history={props.history} />
                )
              }
            />
             <Route
              exact
              path="/profile"
              render={props =>
                !localStorage.getItem("FBIdToken") ? (
                  <Redirect to="/" />
                ) : (
                  <Profile history={props.history} />
                )
              }
            />
             <Route
              exact
              path="/editProfile"
              render={props =>
                !localStorage.getItem("FBIdToken") ? (
                  <Redirect to="/" />
                ) : (
                  <EditProfile history={props.history} />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
