import React, { useEffect, useRef, useState } from 'react'
import Filter from 'components/filter';
import ProductCard from 'components/productCard';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import BaseButton from 'components/atoms/Button';
import { loaderAction } from "redux/Loader/action";
import { Box, CircularProgress } from '@mui/material';

function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const prevLocationRef = useRef();
    const [previousPath, setPreviousPath] = useState(null);
    localStorage.setItem("path", location.pathname + location.search)
    console.log("location",location);
    console.log("location.state",location.state);
    const { brand, model, keyword } = useParams();
    const { networkProgressDialog } = useSelector((state) => state.loader);
    const { search } = useLocation()
    const bId = new URLSearchParams(search).get("bId");
    const mId = new URLSearchParams(search).get("mId");
    const { products } = useSelector((state) => state.products);
    const [state, setState] = React.useState({
        left: false,
    });
    const [page, setPage] = React.useState(1);
    const handleChangePage = (event, value) => {
        setPage(value);
        dispatch(loaderAction.startLoader());
        dispatch(actions.getProducts({ page: value, keyword, bId, mId }))
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
        dispatch(loaderAction.startLoader());
        dispatch(actions.getProducts({ sort: event.target.value, page, mId, bId }))
    };

    useEffect(() => {
        dispatch(loaderAction.startLoader());
        mId && bId && dispatch(actions.getProducts({ page, mId, bId }))
        keyword && !mId && !bId && dispatch(actions.getProducts({ page, keyword }))
    }, [dispatch, mId, bId, keyword])

    useEffect(() => {
        if (location.pathname !== previousPath) {
          setPreviousPath(location.pathname);
        }
      }, [location]);

      useEffect(() => {
        prevLocationRef.current = location.pathname;
      }, [location]);
      console.log("previousPath",previousPath);

    return (
        <>
            <div style={{ minHeight: "calc(100vh - 355px)", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                {products && products?.length > 0 && <div className='d-flex w-100'>
                    <Filter sort={sort} mId={mId} bId={bId} page={page} />
                    {/* className='container-fluid my-3' */}
                    {!networkProgressDialog && <div className='productsDiv shadow ms-lg-3'>

                        <Breadcrumbs aria-label="breadcrumb" className='p-md-3 pt-0 pb-1' sx={{ fontSize: "14px" }} separator="›">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            {/* <Link
                                underline="hover"
                                color="inherit"
                                href="/material-ui/getting-started/installation/"
                            >
                                Products
                            </Link> */}
                            <Link underline="hover" color="inherit" href="/">
                                {brand?.replace(/\b\w/g, (c) => c.toUpperCase())}
                            </Link>

                            <Typography color="text.primary">{model?.split("-").join(" ").replace(/\b\w/g, (c) => c.toUpperCase())}</Typography>
                        </Breadcrumbs>

                        <div className='mt-md-0 d-flex justify-content-between align-items-center' style={{ padding: "0 38px 0 16px" }}>
                            <p className='m-0 d-lg-block d-none'>Showing {products?.length} results for "mobile cover"</p>
                            <div>
                                <FormControl sx={{ minWidth: 120 }} size="small">
                                    <InputLabel id="demo-simple-select-autowidth-label">Sort By</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={sort}
                                        onChange={handleChange}
                                        autoWidth
                                        label="Sort By"
                                        sx={{ background: "white" }}
                                    >
                                        <MenuItem value={"ascending"}>Price -- Low to High</MenuItem>
                                        <MenuItem value={"descending"}>Price -- High to Low</MenuItem>
                                        <MenuItem value={"Newest"}>Newest First</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className='d-lg-none d-flex justify-content-end'>
                                <BaseButton variant='contained' onClick={toggleDrawer("left", true)} style={{ background: "#1e1e2d" }}>Filter</BaseButton>
                                <SwipeableDrawer
                                    anchor={"left"}
                                    open={state["left"]}
                                    onClose={toggleDrawer("left", false)}
                                    onOpen={toggleDrawer("left", true)}
                                >
                                    {<Filter anchor={true} sort={sort} />}
                                </SwipeableDrawer>
                            </div>
                        </div>



                        <div className='d-flex flex-wrap justify-content-center'>
                            {
                                products && products?.length > 0 && products?.map((product) => {
                                    return <ProductCard cardType="mainProductCard" product={product} key={product?._id} />
                                })
                            }
                        </div>

                        <div className='mt-5 mb-3'>
                            <Stack spacing={2}>
                                <Pagination color='primary' count={2} page={page} className='mx-auto' onChange={handleChangePage} />
                            </Stack>
                        </div>
                    </div>}
                    {networkProgressDialog && <Box sx={{ display: "grid", height: "calc(100vh - 102px)", width: "calc(100% - 271.7px)", placeItems: "center", }}>
                        <CircularProgress />
                    </Box>}
                </div>}

                {!networkProgressDialog && products?.length <= 0 && <div className='text-center my-5'>

                    <h3 className='text-danger'>Sorry!</h3>
                    <h4>No Products Found.</h4>
                    <BaseButton variant="contained" onClick={() => {console.log("document.referrer**", prevLocationRef.current); navigate(-1); dispatch(actions.getProducts({ page, mId, bId })) }} className="my-3">Go Back</BaseButton>
                </div>}
            </div>
        </>
    )
}

export default Products