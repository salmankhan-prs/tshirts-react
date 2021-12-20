import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  ListItem,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <Card sx={{ margin: "5px" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        width="200"
        image={product?.photos[0]?.secure_url}
      />
      <CardContent sx={{ color: "white", backgroundColor: "purple" }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="body1" component="div">
              {product.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              {`Rs ${product.price}`}
            </Typography>
          </Grid>
        </Grid>

        <ListItem divider>
          <ListItemText primary={`Brand : ${product.brand}`} />
        </ListItem>
        <ListItem divider>
          <ListItemText primary={`Stock left: ${product.stock}`} />
        </ListItem>
        <ListItem divider sx={{ alignItems: "start" }}>
          <Typography gutterBottom variant="body2" component="div">
            {`Description: ${product.description}`}
          </Typography>
        </ListItem>
        <ListItem divider sx={{ alignItems: "start" }}>
          <Rating name="read-only" value={product.ratings} readOnly />
          <Chip
            label={
              product.numberOfReviews == 0
                ? "no reviews yet"
                : product.numberOfReviews
            }
            variant="outlined"
            sx={{ color: "#ffb300" }}
          />
        </ListItem>
        <Button color="success" fullWidth variant="outlined">
          <Link color="success" to={`/oneproduct/${product._id}`}>
            Buy now{" "}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
