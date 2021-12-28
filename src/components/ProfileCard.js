import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  color: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "blue",
  bgcolor: "background.primary",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileCard = ({ user }) => {
  console.log(user?.verfied);
  const [name, setName] = useState(user?.name);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item md={4}>
              <Typography gutterBottom variant="h5" component="div">
                NAME :
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography
                sx={{
                  textAlign: "left",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {name}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={4}>
              <Typography gutterBottom variant="h5" component="div">
                Email :
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Typography
                sx={{
                  textAlign: "left",
                }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {user?.email}
                <Chip
                  color="success"
                  label={user.verfied ? "verified" : "Not verified"}
                  variant="outlined"
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ color: "white" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            change the user details
          </Typography>
          <TextField
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="name"
          ></TextField>

          <LoadingButton
            color="secondary"
            loading={loading}
            loadingPosition="start"
            variant="contained"
          >
            Save
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileCard;
