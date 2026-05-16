import React, { useEffect } from 'react'
import ProductCard from 'components/productCard';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import { useParams, useLocation } from "react-router-dom";
import { loaderAction } from 'redux/Loader/action';
import { Box, CircularProgress } from '@mui/material';
// import Filter from 'components/filter';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { Button } from '@mui/material';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Navbar from 'components/navbar/Navbar';

function ProductsCategory() {
    const dispatch = useDispatch();
    const { category } = useParams();
    const { search } = useLocation()
    const bId = new URLSearchParams(search).get("bId");
    const mId = new URLSearchParams(search).get("mId");
    const { products } = useSelector((state) => state.products);
    const [state, setState] = React.useState({
        left: false,
    });
    const [page, setPage] = React.useState(1);
    const { networkProgressDialog } = useSelector((state) => state.loader);

    // const handleChangePage = (event, value) => {
    //     setPage(value);
    //     dispatch(actions.getProducts({page: value, keyword, bId, mId}))
    // };

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
        dispatch(actions.getProducts({ sort: event.target.value, page, mId, bId }))
    };

    useEffect(() => {
        dispatch(loaderAction.startLoader())
        dispatch(actions.getProducts({ category: [category] }))
    }, [dispatch, category])

    return (
        <div className='container-fluid my-3'>
            <div className='d-flex'>
                <div className='shadow ms-lg-3'>
                    {/* 
                        <Breadcrumbs aria-label="breadcrumb" className='p-md-3 pt-0 pb-1' sx={{ fontSize: "14px" }}>
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/material-ui/getting-started/installation/"
                            >
                                Products
                            </Link>
                            <Typography color="inherit">{category?.replace(/\b\w/g, (c) => c.toUpperCase())}</Typography>
                        </Breadcrumbs> */}

                    <div className='text-center w-100'>
                        <h4>{category?.replace(/\b\w/g, (c) => c.toUpperCase())} Cover</h4>
                        <p>{products.length} items</p>
                    </div>


                    {!networkProgressDialog ? <div div className='d-flex flex-wrap justify-content-center'>
                        {
                            products && products.length > 0 && products.map((product) => {
                                return <ProductCard cardType="mainProductCard" product={product} key={product._id} />
                            })
                        }
                    </div> : <Box sx={{ display: "grid", height: "75vh", width: "100vw", placeItems: "center" }}>
                        <CircularProgress />
                    </Box>}
                </div>
            </div>
        </div >
    )
}

export default ProductsCategory;