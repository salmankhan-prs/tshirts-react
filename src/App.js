import { useEffect, useState } from "react";
import dotenv from "dotenv";

import { Button, TextField } from "@mui/material";
import { makeStyles, ThemeProvider } from "@mui/styles";
import { Save, SaveAltOutlined, SaveAsRounded } from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Oneproduct from "./components/OneProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import Context from "./context/createContext";
import Profile from "./components/Profile";
import { createTheme } from "@mui/system";
import { blue, orange, red } from "@mui/material/colors";
dotenv.config();
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg,#333,#999)",
    border: 0,
    borderRadius: 15,
    color: "white",
    padding: "0 30px",
  },
});

function App() {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(true);
  {
    /*reome code*/
  }
  const clssses = useStyles();
  {
    /*reome code*/
  }
  console.log(process.env.REACT_APP_BACKEND_URL);
  useEffect(() => {
    const fetchUser = async () => {
      const token = JSON.parse(localStorage.getItem("jwt"));
      console.log(token);
      const res = await fetch(`${process.env.BACKEND_URL}/userdashboard`, {
        method: "get",

        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          Accept: "*/*",
          credentials: true,
          //contetent type importanat
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.status === 200) {
        const userData = await res.json();
        console.log("TRUE ENTERED +++++++++++++++++++++++");
        setUser(userData);
        setIsAuth(true);
      }
    };
    fetchUser();
  }, []);
  console.log(user);
  return (
    <div className="App">
      <Context.Provider value={{ user, setUser }}>
        <Router>
          <Switch>
            {/* <Route path="/" exact>
              <Dashboard />
            </Route> */}
            <ProtectedRoute
              path="/"
              exact
              isAuth={isAuth}
              component={Dashboard}
            />
            <ProtectedRoute
              path="/profile"
              exact
              isAuth={isAuth}
              component={Profile}
            />
            <Route path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/oneproduct/:id">
              <Oneproduct />
            </Route>
          </Switch>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
