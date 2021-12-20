import { Container, Grid, Typography } from "@mui/material";
import { grid } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../context/createContext";
import MenuBar from "./Menu";
import ProductCard from "./ProductCard";
const Dashboard = () => {
  const { user, setUser } = useContext(Context);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    document.title = "products  ";

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product`);
    const data = await res.json();
    setProducts(data.products);
    console.log(products);
  }, []);
  const profile = user.user;
  console.log(user);
  return (
    <div>
      <title>hello </title>
      <MenuBar />
      <Container maxWidth>
        <Typography mt={2} variant="h4">
          Hello {user && user?.user?.name}
        </Typography>

        {products && (
          <Grid container>
            {products.map((product) => (
              <Grid item md={3}>
                {/* <div key={product._id}>
                  <h2>{product.name}</h2>
                  <img width="200" src={product.photos[0]?.secure_url} />
                  <h3>brand name:{product.brand}</h3>
                  <h3> price:{product.price}</h3>
                  <h3>stock left: {product.stock}</h3>
                  <h3>
                    ratings:
                    <span className="product-ratings"> {product.ratings}</span>
                  </h3>
                  <Link to={`/oneproduct/${product._id}`}>go one product</Link>
                </div> */}

                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
