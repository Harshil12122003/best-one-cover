import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "components/common/image";
import "./ProductCard.css";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import StarIcon from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";
import { actions as cartActions } from "redux/Cart/action";
import { Toast } from "utils/toast";
import { useSelector, useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import { actions as reviewAction } from "redux/Review/action";
import BaseButton from "components/atoms/Button";

export default function ProductCard(props) {
  const { cardType, product } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { reviews } = useSelector((state) => state.review);
  const isExistItem = cartItems.find((i) => i._id === product?._id);
  const [isExistInCart, setIsExistInCar] = React.useState(
    isExistItem ? true : false
  );
  const addItemsToCart = (product) => {
    dispatch(cartActions.addItemsToCart({ ...product, cartQty: 1 }));
    Toast("success", "Successfully added into cart");
    setIsExistInCar(true);
  };

  const handleCart = () => {
    !isExistInCart ? addItemsToCart(product) : navigate("/cart");
  };

  const handleBuy = (id) => {
    localStorage.setItem("auth-checkout", true);
    navigate("/checkout?id=" + id);
  };

  // let ratings = [];
  // let totalRatings = 0;
  // let totalRatingsMultiple = 0;
  // for (let i = 1; i <= 5; i++) {
  //     let ratingsData = reviews.filter((review) => {
  //         return review?.rating === i;
  //     });
  //     totalRatings += ratingsData.length;
  //     totalRatingsMultiple += ratingsData.length * i;
  //     ratings.push(ratingsData.length);
  // }

  // React.useEffect(() => {
  //     dispatch(reviewAction.getReviews(product?._id));
  // }, [dispatch])

  return (
    <>
      {cardType === "mainProductCard" && (
        <div className="d-flex">
          <Card
            sx={{
              maxWidth: 278,
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
            }}
            className="mt-4 mx-2 py-2"
          >
            <Link to={`/product/${product._id}`} className="">
              <CardContent className="pb-3">
                <div className="productImg">
                  <Image
                    src={
                      product?.images[0]?.url
                        ? product?.images[0]?.url
                        : "https://rukminim1.flixcart.com/image/612/612/xif0q/cases-covers/back-cover/j/f/7/chrome-019-08-268-kartv-original-imaghbhv45fsbdgx.jpeg?q=70"
                    }
                    className="img-fluid h-100 product-card-image"
                    alt={product.name ? product.name : ""}
                  />
                </div>

                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  className="mb-2 mt-3 text-truncate"
                >
                  {product.name ? product.name : ""}
                </Typography>

                <div className="d-flex justify-content-between mt-2">
                  <Typography variant="body2" color="text.secondary">
                    {product.brand ? product.brand?.toLowerCase() : ""}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.color ? product.color?.toLowerCase() : ""}
                  </Typography>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Typography
                    variant="subtitle1"
                    className="fw-bold text-success"
                  >
                    ₹{product.finalPrice ? product.finalPrice : ""}{" "}
                    <Typography
                      variant="span"
                      color="text.secondary"
                      className="ms-1 fw-light"
                    >
                      {" "}
                      <del>₹{product.price ? product.price : ""}</del>{" "}
                    </Typography>
                    {product?.discount.type !== "noDiscount" && (
                      <Typography
                        variant="span"
                        color="text.success"
                        className="ms-1 fw-light"
                        sx={{ fontSize: "14px" }}
                      >
                        {" "}
                        {product?.discount.type === "fixedPrice"
                          ? product?.discount.value
                          : product?.discount.type === "fixedPrice"
                          ? product?.discount.value + "%"
                          : ""}{" "}
                        off{" "}
                      </Typography>
                    )}
                  </Typography>
                </div>

                <div className="d-flex justify-content-between">
                  {/* <div className='d-flex text-success'>
                                         <StarIcon fontSize="small" color='warning' />
                                        <StarIcon fontSize="small" color='warning' />
                                        <StarIcon fontSize="small" color='warning' />
                                        <StarIcon fontSize="small" color='warning' />
                                        <StarIcon fontSize="small" color='warning' /> 
                                        <Rating name="read-only" size="small" value={totalRatingsMultiple
                                            ? Math.round(
                                                totalRatingsMultiple / totalRatings,
                                                1
                                            ).toFixed(1)
                                            : 0} readOnly sx={{ mt: 1 }} />
                                    </div> */}
                  <Typography variant="body2" color="text.secondary">
                    Free Delivery
                  </Typography>
                </div>
              </CardContent>
            </Link>
            <CardActions className="d-flex justify-content-center pt-0">
              <BaseButton
                variant="contained"
                size={"small"}
                startIcon={<LocalMallOutlinedIcon />}
                onClick={() => handleBuy(product._id)}
              >
                Buy Now
              </BaseButton>
              <BaseButton
                variant="outlined"
                size={"small"}
                startIcon={<ShoppingBasketOutlinedIcon />}
                onClick={handleCart}
                // style={{ color: "#1e1e2d", border: "1px solid #1e1e2d" }}
              >
                {!isExistInCart ? "ADD TO CART" : "GO TO CART"}
              </BaseButton>
            </CardActions>
          </Card>
        </div>
      )}

      {cardType === "miniProductCard" && (
        <Link to={`/product/${product._id}`}>
          <div className="text-center miniProductCard px-2 mx-1 my-3">
            <div className="miniProductcardImg mx-auto">
              <Image
                src={
                  product?.images[0]?.url
                    ? product?.images[0]?.url
                    : "https://rukminim1.flixcart.com/image/612/612/xif0q/cases-covers/back-cover/j/f/7/chrome-019-08-268-kartv-original-imaghbhv45fsbdgx.jpeg?q=70"
                }
                className="img-fluid product-card-image"
                alt=""
              />
            </div>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              className="mb-2 mt-2 text-truncate"
            >
              {product?.name ? product?.name : ""}
            </Typography>
            <Typography variant="body2" className="text-success">
              From ₹{product?.price ? product?.price : ""}
            </Typography>
            {/* <p className=''>From $7999</p> */}
            <Typography variant="body2" color="text.secondary" className="mt-2">
              {product?.brand ? product?.brand : ""}
            </Typography>
          </div>
        </Link>
      )}
    </>
  );
}
