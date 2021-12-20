import { useState } from "react";
import Axios from "axios";
import {
  Alert,
  TextField,
  Avatar,
  Box,
  Grid,
  Button,
  Container,
  CssBaseline,
  Typography,
  Input,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState("");
  const [loader, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("photo", image);
    console.log(image);
    // var object = {};
    // data.forEach((value, key) => (object[key] = value));
    // var json = JSON.stringify(object);
    // console.log(json);
    // console.log(image);
    // const res = await Axios.post("http://localhost:4000/api/v1/signup", {
    //   body: object,
    // });

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: data,
    });

    const responseFromserver = await res.json();
    if (res.status != 200) {
      setError(responseFromserver.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }

    // for (var x = 0; x < image.length; x++) {
    //   data.append("photo", "salman");
    //   console.log("enter ");
    // }
    console.log(responseFromserver);
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  onChange={(e) => setname(e.target.value)}
                  id="outlined-basic"
                  label=" enter a name "
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  id="outlined-basic"
                  label=" enter a email "
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="contained-button-file">
                  <Input
                    name="photo"
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              </Grid>
              {/* <Button
                variant="contained"
                fullWidth
                type="submit"
                onClick={handleForm}
                value="submit"
                name="submit"
              >
                signup
              </Button> */}
              <LoadingButton
                loadingIndicator="Loading..."
                loading={loader}
                onClick={handleForm}
                fullWidth
                variant="outlined"
              >
                Fetch data
              </LoadingButton>
            </Grid>
          </Box>
          {error && <Alert severity="error">{error}</Alert>}
          {success && (
            <Alert severity="success">Account created sucessfully </Alert>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Signup;
