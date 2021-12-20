import "../App.css";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  List,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "antd/dist/antd.css";
import { Carousel } from "antd";
import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import Context from "../context/createContext";
import MenuBar from "./Menu";
import { deepOrange } from "@mui/material/colors";
import { CreateSharp } from "@mui/icons-material";

const Oneproduct = () => {
  const [product, setProduct] = useState(null);
  const [rating, setRatings] = useState("");
  const [comment, setComment] = useState("");
  const [isreviewed, setIsreviewed] = useState(false);
  const { user, setUser } = useContext(Context);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(true);
  let rev = false;
  const { id } = useParams();

  const addReview = async () => {
    const reviewData = {
      productId: id,
      rating,
      comment,
    };
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/review`, {
        method: "PUT",

        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          Accept: "*/*",
          credentials: true,
          //contetent type importanat
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
      console.log(await res);
      setReload(true);
      console.log(reload);
    } catch (e) {
      console.log(e);
    }
  };
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  console.log(user);
  const fetchOneProduct = async () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/oneproduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("ENTERED IN THEN");
        setProduct(data.product);
        setReload(false);
        console.log(data);
        findLoggedinUserReviewd(data.product);
      });
    // const data = await res.json();
    //  setProduct(data.product);
    // setReload(false);
    // console.log(data);
    // await findLoggedinUserReviewd();
  };
  useEffect(() => {
    fetchOneProduct();
    console.log("USE EFFECT CALLED=====1");
    console.log(product);
  }, [reload]);

  const findLoggedinUserReviewd = async (product) => {
    console.log("ENTERD IN FIND REVIED ");
    product?.reviews?.map((review) => {
      console.log(user);
      if (review.user == user?.user?._id) {
        alert("swbdsb");
        setIsreviewed(true);
        setRatings(review.rating);
        setComment(review.comment);
      }
    });
  };
  return (
    <>
      <MenuBar />

      <Grid container>
        <Grid item={6} sx={{ width: "500px" }}>
          {
            <Carousel autoplay>
              {product &&
                product.photos?.map((photo) => <img src={photo.secure_url} />)}
            </Carousel>
          }
        </Grid>

        <Grid ml={10} mt={3} item={6} textAlign="justify">
          <Grid container>
            <Grid item={6}>
              {product && (
                <>
                  <Paper
                    sx={{
                      background: "#F4BE2C",
                      color: "white",
                      padding: "13px",
                    }}
                  >
                    <Stack color="white" spacing={2}>
                      <Typography color={"white"} variant="h4">
                        {`Product Name: ${product.name}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography color={"white"} variant="h5">
                        {`Product Name: ${product.brand}`}
                      </Typography>

                      <Typography color={"white"} variant="h5">
                        {" "}
                        {`category: ${product.category}`}
                      </Typography>
                      <Typography color={"white"} variant="h5">
                        {`added Date: ${new Date(
                          product.createdAt
                        ).toLocaleDateString()}`}
                      </Typography>
                      <Typography color={"white"} variant="h5">
                        {`total reviews: ${product.numberOfReviews}`}
                      </Typography>
                      <Typography color={"white"} variant="h5">
                        {`price: Rs ${product.price}`}
                      </Typography>

                      <Typography color={"white"} variant="h5">
                        {`stock left : ${product.stock}`}
                      </Typography>
                    </Stack>
                  </Paper>
                </>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid mt={3} item={6}>
              <Typography gutterBottom variant="h3" component="div">
                Seller details
              </Typography>
              {product && (
                <Card>
                  <CardContent>
                    <Avatar
                      textAlign="center"
                      src={product.user?.photo?.secure_url}
                      sx={{ width: 70, height: 70, marginLeft: "40%" }}
                    />
                    <Typography gutterBottom variant="h5" component="div">
                      {`Seller Name: ${product.user?.name}`}
                    </Typography>

                    <Typography gutterBottom variant="h5" component="div">
                      {` seller email :${product.user?.email}`}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h3">
        reviews for {product && product.name}
      </Typography>
      <Grid container>
        {product &&
          product.reviews?.map((review) => {
            return review.user === user.user?._id ? null : (
              <Grid item={4}>
                <Card sx={{ margin: "30px", backgroundColor: "#03C6C7" }}>
                  <Avatar sx={{ bgcolor: deepOrange[500], marginLeft: "40%" }}>
                    {review.name[0]}
                  </Avatar>
                  <CardContent sx={{ display: "flex" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {`reviewer name: ${review.name}`}
                    </Typography>
                    <Typography ml={3} variant="h5" gutterBottom>
                      Rating:
                    </Typography>
                    <Rating
                      name="half-rating-read"
                      defaultValue={review.rating}
                      precision={0.5}
                      readOnly
                    />
                  </CardContent>
                  <Typography
                    variant="body2"
                    component="div"
                  >{` comment :${review.comment}`}</Typography>
                </Card>
              </Grid>
            );
          })}
      </Grid>
      <Paper>
        {Object.keys(user).length != 0 ? (
          <>
            <Card sx={{}}>
              <CardContent sx={{ display: "flex" }}>
                <Typography variant="h5">Your Rating : </Typography>
                <Rating
                  readOnly={edit}
                  name="half-rating"
                  defaultValue={1}
                  value={rating}
                  onChange={(e) => setRatings(e.target.value)}
                  precision={0.5}
                />
                <IconButton onClick={() => setEdit(false)}>
                  <CreateSharp />
                </IconButton>
              </CardContent>
              <CardContent sx={{ display: "flex" }}>
                <Typography variant="h5"></Typography>

                <TextField
                  disabled={edit}
                  fullWidth
                  id="standard-basic"
                  label="Your comment : "
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="standard"
                />
              </CardContent>
            </Card>
            <Button disabled={edit} onClick={addReview}>
              add Review
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained">
              please login to add your review{" "}
            </Button>
          </>
        )}

        {/* <TextField
          id="standard-basic"
          label="Standa rd"
          value={rating}
          onChange={(e) => setRatings(e.target.value)}
          variant="standard"
        /> */}
      </Paper>
    </>

    // <div>d
    //   <h1>One product</h1>
    //   <Link to="/">dashboard</Link>
    //   <h2>{id}</h2>
    //   {product && (
    //     <div>
    //       <h2>{product?.name}</h2>
    //       <h2>{product?.brand}</h2>
    //       {product.photos?.map((photo) => (
    //         <img width="200" src={photo.secure_url} />
    //       ))}
    //       <h2> reviews for {product.name}</h2>

    //       <ul>
    //         {product.reviews?.map((review) => {
    //           if (user.user?._id === review.user) {
    //             rev = true;
    //           }
    //           return (
    //             <li className="each-review">
    //               <h2>
    //                 {user.user?._id === review.user ? "YOU" : review?.name}
    //               </h2>
    //               <h2>ratings :{review?.rating}</h2>
    //               <p>comment : {review?.comment}</p>
    //             </li>
    //           );
    //         })}
    //       </ul>
    //     </div>
    //   )}

    //   <input
    //     type="text "
    //     name="rating"
    //     value={rev && {}}
    //     onChange={(e) => setRatings(e.target.value)}
    //   />
    //   <input
    //     type="text "
    //     name="comment"
    //     onChange={(e) => setComment(e.target.value)}
    //   />
    //   <input
    //     type="button"
    //     value={rev ? "update Review" : "submit revie"}
    //     onClick={addReview}
    //   />
    // </div>
  );
};

export default Oneproduct;
