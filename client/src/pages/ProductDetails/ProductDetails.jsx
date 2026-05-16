import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import Reviews from "components/reviews";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import { actions as cartActions } from "redux/Cart/action";
import { actions as reviewAction } from "redux/Review/action";
import { Toast } from "utils/toast";
import SwiperSlider from "components/SwiperSlider";
import StarIcon from "@mui/icons-material/Star";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import BaseButton from "components/atoms/Button";
import { loaderAction } from "redux/Loader/action";
import { Box, CircularProgress } from "@mui/material";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, products, brand } = useSelector((state) => state.products);
  const { reviews } = useSelector((state) => state.review);
  const { cartItems } = useSelector((state) => state.cart);
  const isExistItem = cartItems.find((i) => i._id === id);
  const [isExistInCart, setIsExistInCar] = useState(isExistItem ? true : false);
  const { networkProgressDialog } = useSelector((state) => state.loader);

  const addItemsToCart = (product) => {
    dispatch(cartActions.addItemsToCart({ ...product, cartQty: 1 }));
    Toast("success", "Successfully added into cart");
    setIsExistInCar(true);
  };

  const handleCart = () => {
    !isExistInCart ? addItemsToCart(product) : navigate("/cart");
  };

  const handleBuy = () => {
    localStorage.setItem("auth-checkout", true);
    navigate("/checkout?id=" + id);
  };

  let ratings = [];
  let totalRatings = 0;
  let totalRatingsMultiple = 0;
  for (let i = 1; i <= 5; i++) {
    let ratingsData = reviews.filter((review) => {
      return review?.rating === i;
    });
    totalRatings += ratingsData.length;
    totalRatingsMultiple += ratingsData.length * i;
    ratings.push(ratingsData.length);
  }

  console.log(product?.discount?.type);

  useEffect(() => {
    dispatch(loaderAction.startLoader())
    id && dispatch(actions.getProductDetails(id));
    id && dispatch(reviewAction.getReviews(id));
  }, [id, dispatch]);

  return (
    <>
      <div className="col-lg-10 col-12 m-auto productDetail my-3">
        {product && (
          <>
            {!networkProgressDialog ? <div className="single-product-page d-flex m-auto bg-white p-3 row">
              <div className="left col-lg-4 col-12 p-3 d-flex flex-column align-items-center justify-content-start">
                <div className="w-100">
                  <Carousel showThumbs={true} thumbWidth={80}>
                    {product.images &&
                      product.images.map((image, i) => {
                        return (
                          <img
                            className="CarouselImage"
                            key={i}
                            src={image.url}
                            alt={`${i} Slide`}
                          />
                        );
                      })}
                  </Carousel>
                </div>
              </div>

              <div className="right col-lg-8 ps-5 col-12">
                <div className="product-info">
                  <div className="p-name">
                    <h4 style={{ textAlign: 'justify' }}>{product.name ? product.name : ""}</h4>
                  </div>
                  <div className="p-ratings-reviews text-muted">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-flex align-items-center gap-1 badge bg-success">
                        <p className="m-0">
                          {" "}
                          {totalRatingsMultiple
                            ? Math.round(
                              totalRatingsMultiple / totalRatings,
                              1
                            ).toFixed(1)
                            : 0}{" "}
                        </p>
                        <div>
                          {" "}
                          <StarIcon fontSize="small" />
                        </div>
                      </div>
                      <div>
                        <h6 className="m-0">
                          {reviews?.length} Ratings & {reviews?.length} Reviews
                        </h6>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <h6 className="text-success">Special Price</h6>
                  <div className="p-price d-flex align-items-center">
                    <h3 className="me-3">
                      &#8377; {product.finalPrice ? product.finalPrice : ""}
                    </h3>
                    <span className="me-3">
                      &#8377;{" "}
                      <del>{product?.discount?.type !== "noDiscount" ? product?.price : product?.price + 100}</del>
                    </span>
                    <h5 className="me-3 text-danger">
                      {
                        product?.discount?.type !== "noDiscount" &&

                        (product?.discount?.type === "fixedPrice"
                          ? product?.discount?.value + "₹"
                          : product?.discount?.type === "percentage"
                            ? product?.discount?.value + "%"
                            : "") + " off"
                      }
                    </h5>
                  </div>
                  <p className="mb-2">Inclusive of all taxes</p>
                  <h6 className="fw-bold">FREE Shipping</h6>
                </div>

                <hr />

                <div className="product-color-brand-model d-flex flex-column align-items-centers">
                  <div className="mobile d-flex gap-4">
                    <div className="mobile-brand col-lg-4">
                      <h6 className="mb-2">Mobile Brand</h6>
                      <p className="mobileBrandValue">{product?.brand}</p>
                    </div>
                    <div className="mobile-model col-lg-4">
                      <h6 className="mb-2">Mobile Model</h6>
                      <p className="mobileModelValue">{product?.model}</p>
                    </div>
                  </div>

                  <div className="p-color mt-4">
                    <h6 className="mb-2">Color</h6>
                    <ul className="d-flex flex-wrap gap-3 p-0">
                      <li className="text-center">
                        <img
                          src={product?.images ? product?.images[0]?.url : ""}
                          alt=""
                        />
                        <p>{product?.color}</p>
                      </li>
                      {/* <li>
                        <img src={onePluse3} alt="" />
                        <p>blue</p>
                      </li>
                      <li>
                        <img src={onePluse3} alt="" />
                        <p>Brown</p>
                      </li>
                      <li>
                        <img src={onePluse3} alt="" />
                        <p>pink</p>
                      </li> */}
                    </ul>
                  </div>

                  <div className="product-btn d-flex align-items-center mt-3 gap-4">
                    <BaseButton
                      variant="contained"
                      size={"large"}
                      startIcon={<LocalMallOutlinedIcon />}
                      onClick={handleBuy}
                    >
                      Buy Now
                    </BaseButton>
                    <BaseButton
                      variant="outlined"
                      size={"large"}
                      startIcon={<ShoppingBasketOutlinedIcon />}
                      onClick={handleCart}
                    >
                      {!isExistInCart ? "ADD TO CART" : "GO TO CART"}
                    </BaseButton>
                    {/* <button type="button" className="btn btn-primary col-lg-3 btn-lg">BUY NOW</button>
                        <button type="button" className="btn btn-outline-primary col-lg-3 btn-lg">ADD TO CART</button> */}
                  </div>
                </div>

                {/* <hr />

                <div className="product-offers">
                  <h4 className="my-3">Offers</h4>
                  <ul>
                    <li className="my-2">
                      Buy <strong className="fs-6">2 (or more)</strong>, Get
                      Flate <strong className="fs-6">10% OFF</strong>
                    </li>
                    <li className="my-2">
                      Use Code : <strong className="fs-6">FLATE10</strong>
                    </li>
                    <li className="my-2 fw-bold">Limited Time Special Offer</li>
                  </ul>
                </div> */}

                <hr />

                <div className="product-services">
                  <h4 className="my-3">Services</h4>
                  <ul>
                    <li className="my-2">Usually dispatches in 2-3 days</li>
                    <li className="my-2">
                      FREE Shipping
                    </li>
                    <li className="my-2">Cash On Delivery (COD) available</li>
                    {/* <li className="my-2">7 Days Replacement Policy.</li> */}
                  </ul>
                </div>

                <hr />

                <div className="product-specification">
                  <h4 className="my-3">Specifications</h4>
                  <div className="main-spec d-flex mt-3">
                    <div className="key me-5">
                      <p>Brand</p>
                      <p>Color</p>
                      <p>Category</p>
                      {/* <p>Form Factor</p> */}
                      <p>Designed For</p>
                      <p>Material</p>
                      <p>Pack Of</p>
                    </div>

                    <div className="value">
                      <p>
                        {product.coverBrand
                          ? product.coverBrand
                          : "best-1"}
                      </p>
                      <p>{product.color ? product.color : ""}</p>
                      <p>{product.category ? product.category : ""}</p>
                      {/* <p>Back Cover / Flip Cover</p> */}
                      <p>{product.brand ? product.brand + ' ' + product.model : ""}</p>
                      <p>{product.material ? product.material : "Plastic"}</p>
                      <p>1</p>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="peoduct-desc">
                  <h4 className="my-3">Description</h4>
                  <p style={{ textAlign: 'justify' }}>{product.desc ? product.desc : ""}</p>

                  {/* <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Soluta, tenetur quisquam libero voluptatibus labore pariatur
                  dolorum, quo quibusdam dolore consequatur, molestiae officiis?
                  Quisquam necessitatibus corrupti magnam similique, sequi
                  doloremque eaque. Dolores doloremque est nulla?
                </p> */}
                </div>

                <Reviews
                  totalRatings={
                    totalRatingsMultiple
                      ? Math.round(
                        totalRatingsMultiple / totalRatings,
                        1
                      ).toFixed(1)
                      : 0
                  }
                  reviews={reviews}
                  ratings={ratings}
                />
              </div>

              {JSON.parse(localStorage.getItem("cart"))?.length > 0 && (
                <div className="right col-lg-12 mt-5">
                  <h4 className="my-4">Your liked products</h4>

                  <SwiperSlider
                    products={JSON.parse(localStorage.getItem("cart"))}
                    cardType="miniProductCard"
                  />
                </div>
              )}

              {products?.length > 0 && (
                <div className="right col-lg-12 mt-5">
                  <h4 className="my-4">Similar products</h4>
                  <SwiperSlider
                    products={products}
                    cardType="miniProductCard"
                  />
                </div>
              )}
            </div> : <Box sx={{ display: "grid", height: "calc(100vh - 102px)", width: "100%", placeItems: "center", }}>
              <CircularProgress />
            </Box>}
          </>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
