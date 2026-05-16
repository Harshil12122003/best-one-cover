import React, { useEffect } from 'react'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
// import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import Slider from "@mui/material/Slider";
import Input from 'components/common/input';
// import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import { loaderAction } from "redux/Loader/action";
import { useNavigate } from 'react-router-dom';

function Filter({ anchor, sort, bId, mId, page }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { brands, categories } = useSelector((state) => state.products);
    const brand = brands.find((brand) => {
        return brand._id === bId && brand;
    })

    const [open, setOpen] = React.useState({
        category: false,
        model: false,
        color: false,
        ratings: false,
        material: false
    });
    const [price, setPrice] = React.useState([0, 2000]);
    const [priceInput, setPriceInput] = React.useState({
        max: 2000,
        min: 0,
    });
    const handleClick = (key) => {
        // setOpen(!open);
        open[key] = !open[key];
        setOpen({ ...open })
    };
    const [checked, setChecked] = React.useState({
        category: [],
        model: [],
        color: [],
        ratings: [],
        material: [],
        price: null
    });

    const handleToggle = (key, value, modelId) => () => {
        // setChecked({...checked,model: []});
        const currentIndex = checked[key].indexOf(value);
        const newChecked = [...checked[key]];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        checked[key] = newChecked;
        if (price) {
            checked.price = {
                gte: Number(price[0]),
                lte: Number(price[1])
            };
        }
        if (sort) {
            checked.sort = sort;
        }
        if (bId && mId) {
            checked.bId = bId;
            checked.mId = mId;
        }
        
        if(key === "model"){
            checked.model = [checked.model[checked.model.length - 1]];
            setChecked({...checked});
            navigate(`/products/${brand?.brand}/${value}?bId=${bId}&mId=${modelId}`)
            return;
        }

        dispatch(loaderAction.startLoader());
        dispatch(actions.getProducts({ ...checked, page: page }))
        setChecked({ ...checked });
    };

    const handleChange = (event, newValue) => {
        setPrice(newValue);
        setPriceInput({
            ...priceInput, min: Number(newValue[0]),
            max: Number(newValue[1])
        })
        setChecked({ ...checked });
        if (price) {
            checked.price = {
                gte: Number(newValue[0]),
                lte: Number(newValue[1])
            };
        }
        if (sort) {
            checked.sort = sort;
        }
        if (bId && mId) {
            checked.bId = bId;
            checked.mId = mId;
        }
        dispatch(loaderAction.startLoader());
        dispatch(actions.getProducts({ ...checked, page: page }))
    };

    const handleChangePriceInput = (event) => {
        const { name, value } = event.target;
        setPriceInput({ ...priceInput, [name]: value })
        name === "min" ? setPrice([value, priceInput.max]) : setPrice([priceInput.min, value]);

        setChecked({ ...checked });
        if (price) {
            checked.price = {
                gte: name === "max" ? Number(priceInput.min) : Number(value),
                lte: name === "min" ? Number(priceInput.max) : Number(value),
            };
        }
        if (bId && mId) {
            checked.bId = bId;
            checked.mId = mId;
        }
        dispatch(loaderAction.startLoader());
        dispatch(actions.getProducts({ ...checked, page: page }))
    };

    const style = { display: "block", width: "100%" };

    useEffect(() => {
        dispatch(actions.getCategories())
    }, [])

    const color = [
        "White",
        "Yellow",
        "Blue",
        "Red",
        "Green",
        "Black",
        "Brown",
        "Azure",
        "Ivory",
        "Teal",
        "Silver",
        "Purple",
        "Navy blue",
        "Pea green",
        "Gray",
        "Orange",
        "Maroon",
        "Charcoal",
        "Aquamarine",
        "Coral",
        "Fuchsia",
        "Wheat",
        "Khaki",
        "Crimson",
        "Lime",
        "Hot pink",
        "Magenta",
        "Olden",
        "Plum",
        "Olive",
        "Cyan",
    ];

    return (
        <>

            <div className='filterDiv border shadow py-2' style={anchor && style}>

                <div className='d-flex align-items-center px-3'>
                    <FilterAltOutlinedIcon fontSize='small' />
                    <h5 className='font-light subTiTleColor m-0'>Filters</h5>
                </div>
                <hr />
                <div>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgColor: "#F3F6F9" }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    // subheader={
                    //     <ListSubheader component="div" id="nested-list-subheader">
                    //         Filter
                    //     </ListSubheader>
                    // }
                    >
                        <ListItemButton onClick={() => handleClick("category")}>
                            {open.category ? <ExpandLess /> : <ExpandMore />}
                            <ListItemText primary="Category" className='ms-2' />
                        </ListItemButton>
                        <Collapse in={open.category} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding style={{ height: "300px", overflowY: "scroll" }}>
                                {categories && categories?.length > 0 && categories?.map((value) => {
                                    const labelId = `checkbox-list-label-${value.name}`;

                                    return (
                                        <ListItem
                                            key={value._id}
                                            className="py-0"
                                        >
                                            <ListItemButton className='py-0' role={undefined} onClick={handleToggle("category", value.name)} dense>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.category.indexOf(value.name) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                                <ListItemText id={labelId} primary={value.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Collapse>

                        <hr className='my-0' />

                        <div className='mt-3 px-4'>
                            <h6 className=''>Price</h6>

                            <div className='d-flex justify-content-between'>
                                <Input type="number" className='priceFilterInput' placeholder="Min" name="min" value={priceInput.min} onChange={handleChangePriceInput} />
                                <p> to </p>
                                <Input type="number" className='priceFilterInput' placeholder="Max" name="max" value={priceInput.max} onChange={handleChangePriceInput} />
                            </div>

                            <Slider
                                aria-label="Rent"
                                defaultValue={0}
                                value={price}
                                valueLabelDisplay="auto"
                                step={50}
                                min={0}
                                max={2000}
                                onChange={handleChange}
                                className="color_main"
                            />
                        </div>

                        <hr className='my-0' />

                        <ListItemButton onClick={() => { handleClick("model") }}>
                            {open.model ? <ExpandLess /> : <ExpandMore />}
                            <ListItemText primary="Model" className='ms-2' />
                        </ListItemButton>
                        <Collapse in={open.model} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding style={{ height: "300px", overflowY: "scroll" }}>
                                {brands && brand?.models?.map((value) => {
                                    const labelId = `checkbox-list-label-${value.name}`;
                                    return (
                                        <ListItem
                                            key={value.name}
                                            className="py-0"
                                        >
                                            <ListItemButton className='py-0' role={undefined} onClick={handleToggle("model", value.name, value._id)} dense>
                                                <Checkbox
                                                    edge="start"
                                                    // checked={checked.model.indexOf(value.name) !== -1}
                                                    checked={checked.model[0] === value.name ? -1 : 0}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                                <ListItemText id={labelId} primary={value.name} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Collapse>

                        <hr className='my-0' />

                        <ListItemButton onClick={() => { handleClick("color") }}>
                            {open.color ? <ExpandLess /> : <ExpandMore />}
                            <ListItemText primary="Color" className='ms-2' />
                        </ListItemButton>
                        <Collapse in={open.color} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding style={{ height: "300px", overflowY: "scroll" }}>
                                {color.map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem
                                            key={value}
                                            className="py-0"
                                        >
                                            <ListItemButton className='py-0' role={undefined} onClick={handleToggle("color", value)} dense>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.color.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                                <ListItemText id={labelId} primary={value} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Collapse>

                        <hr className='my-0' />

                        {/* <ListItemButton onClick={() => handleClick("ratings")}>
                            {open.ratings ? <ExpandLess /> : <ExpandMore />}
                            <ListItemText primary="Customer Ratings" className='ms-2' />
                        </ListItemButton>
                        <Collapse in={open.ratings} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {[4, 3].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem
                                            key={value}
                                            className="py-0"
                                        >
                                            <ListItemButton className='py-0' role={undefined} onClick={handleToggle("ratings", value)} dense>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.ratings.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                                <ListItemText id={labelId} primary={`${value} & above`} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Collapse> */}

                        <hr className='my-0' />

                        {/* <ListItemButton onClick={() => handleClick("material")}>
                            {open.material ? <ExpandLess /> : <ExpandMore />}
                            <ListItemText primary="Material" className='ms-2' />
                        </ListItemButton>
                        <Collapse in={open.material} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {[1, 2, 3, 4].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                        <ListItem
                                            key={value}
                                            className="py-0"
                                        >
                                            <ListItemButton className='py-0' role={undefined} onClick={handleToggle("material", value)} dense>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.material.indexOf(value) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                                <ListItemText id={labelId} primary={`Material`} />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Collapse> */}

                    </List>
                </div>
            </div>
        </>
    )
}

export default Filter