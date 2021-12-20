import React, { useContext } from "react";
import Context from "../context/createContext";

import {
  Container,
  Box,
  Grid,
  Paper,
  styled,
  Menu,
  TextField,
} from "@mui/material";
import MenuBar from "./Menu";
import ProfileCard from "./ProfileCard";
import {
  PersonAddAlt1Rounded,
  PersonOffOutlined,
  PersonPinCircle,
  SupervisedUserCircle,
} from "@mui/icons-material";

const Profile = () => {
  const { user, setUser } = useContext(Context);
  return (
    <>
      <MenuBar />
      <Container disableGutters sx={{ marginTop: "40px" }}>
        <Grid container>
          <Grid item md={6}>
            <img
              width="550px"
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
            ></img>
          </Grid>
          <Grid item md={6} sx={{ margin: "auto" }}>
            <Paper>
              <ProfileCard user={user?.user} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
