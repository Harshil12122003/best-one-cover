import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Home.module.scss";
import SwiperSlider from '../../components/SwiperSlider'
import BaseButton from "components/atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import coverBanner from "assets/images/cover_banner.jpg";
import { useNavigate } from "react-router-dom";
import { loaderAction } from "redux/Loader/action";
import { Box, CircularProgress } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);
  const { networkProgressDialog } = useSelector((state) => state.loader);

  useEffect(() => {
    dispatch(loaderAction.startLoader())
    dispatch(actions.getProducts({ category: ["Transparent Case", "Flip Case", "Leather Case", "Hard Case", "Metal case", "Rubber Case"] }))
    // dispatch(actions.getProducts())
  }, [dispatch])

  return (
    <div className={styles.dashboard}>
      <div className={styles.banner}>
        <div className={styles.bannerImage}>
          <img src={coverBanner} alt="Best-1 cover house banner" />
        </div>
      </div>

      {!networkProgressDialog ? <div className={styles.coverSlider}>
        <div className={styles.coverTitle}>
          <h3 className="mb-3 text-center">Transparent Case</h3>
          <BaseButton variant="contained" onClick={() => { navigate("/products/category/Transparent Case") }}>show more</BaseButton>
        </div>
        <SwiperSlider products={products} category="Transparent Case" />
      </div> : <Box sx={{ display: "grid", height: "36vh", width: "100%", placeItems: "center", }}>
        <CircularProgress />
      </Box>}

      {!networkProgressDialog ? <div className={styles.coverSlider}>
        <div className={styles.coverTitle}>
          <h3 className="mb-3 text-center">Leather Case</h3>
          <BaseButton variant="contained" onClick={() => { navigate("/products/category/Leather Case") }}>show more</BaseButton>
        </div>
        <SwiperSlider products={products} category="Leather Case" />
      </div> : <Box sx={{ display: "grid", height: "36vh", width: "100%", placeItems: "center", }}>
        <CircularProgress />
      </Box>}

      {!networkProgressDialog ? <div className={styles.coverSlider}>
        <div className={styles.coverTitle}>
          <h3 className="mb-3 text-center">Flip Case</h3>
          <BaseButton variant="contained" onClick={() => { navigate("/products/category/Flip Case") }}>show more</BaseButton>
        </div>
        <SwiperSlider products={products} category="Flip Case" />
      </div> : <Box sx={{ display: "grid", height: "36vh", width: "100%", placeItems: "center", }}>
        <CircularProgress />
      </Box>}

      {/* <div className={styles.coverSlider}>
        <div className={styles.coverTitle}>
          <h3 className="mb-3 text-center">Flip Case</h3>
          <BaseButton variant="contained" onClick={()=>{navigate("/products/category/Flip Case")}}>show more</BaseButton>
        </div>
        <SwiperSlider products={products} category="Flip Case" />
      </div> */}

      {!networkProgressDialog ? <div className={styles.coverSlider}>
        <div className={styles.coverTitle}>
          <h3 className="mb-3 text-center">Hard Case</h3>
          <BaseButton variant="contained" onClick={() => { navigate("/products/category/Hard Case") }}>show more</BaseButton>
        </div>
        <SwiperSlider products={products} category="Hard Case" />
      </div> : <Box sx={{ display: "grid", height: "36vh", width: "100%", placeItems: "center", }}>
        <CircularProgress />
      </Box>}

      {!networkProgressDialog ? <div className={styles.coverSlider}>
        <div className={styles.coverTitle}>
          <h3 className="mb-3 text-center">Metal Case</h3>
          <BaseButton variant="contained" onClick={() => { navigate("/products/category/Metal Case") }}>show more</BaseButton>
        </div>
        <SwiperSlider products={products} category="Metal Case" />
      </div> : <Box sx={{ display: "grid", height: "36vh", width: "100%", placeItems: "center", }}>
        <CircularProgress />
      </Box>}

      {!networkProgressDialog ? <div className={styles.coverSlider}>
        <div className={styles.coverTitle}>
          <h3 className="mb-3 text-center">Rubber Case</h3>
          <BaseButton variant="contained" onClick={() => { navigate("/products/category/Rubber Case") }}>show more</BaseButton>
        </div>
        <SwiperSlider products={products} category="Rubber Case" />
      </div> : <Box sx={{ display: "grid", height: "36vh", width: "100%", placeItems: "center", }}>
        <CircularProgress />
      </Box>}
    </div>
  );
};

export default Home;
