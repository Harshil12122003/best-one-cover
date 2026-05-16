import React, { useEffect, useState } from "react";
import UploadImg from "assets/images/placeholder.png";
import styles from "./AddStock.module.scss";
import BaseButton from "components/atoms/Button";
import BasicModal from "components/atoms/Modal";
import Input from "components/atoms/Input";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import { actions as stockAction } from "redux/Stock/action";
import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import BreadCrumb from "components/atoms/BreadCrumb";
import uuid from "utils/uuid";
import Dropzone from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { actions as actionLoader } from "redux/Loader/action";

const AddStock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { networkProgressDialog } = useSelector((state) => state.loader);
  const { brands, categories } = useSelector((state) => state.products);
  const { stock } = useSelector((state) => state.stock);
  const [defaultValueOfBrand, setDefaultValueOfBrand] = useState({
    value: "dfdf",
    label: "dfdf",
  });
  const arr =
    params?.id &&
    stock &&
    stock?.images?.length > 0 &&
    stock?.images?.map((data) => {
      return 1;
    });

  arr && arr?.pop();

  // console.log("stock@@@@", stock);
  // console.log("stock@@@@", stock?.images);

  // stock?.images?.length > 0 && stock?.images?.slice(1,)

  const [uploadImgs, setUploadImgs] = useState(
    params?.id && stock ? (arr.length > 0 ? arr : []) : []
  );
  const [openModal, setOpenModal] = useState(false);
  const [modelData, setModelData] = useState({
    brand: "",
    model: "",
    category: "",
    modelBrand: "",
  });
  const [inputItem, setInputItem] = useState({
    inputItemData: null,
    title: "",
    dispatchItem: "",
  });
  const [thumbnail, setThumbnail] = useState(
    params?.id && stock?.images ? stock?.images[0] : ""
  );
  const [images, setImages] = useState(
    params?.id && stock?.images ? stock?.images.slice(1) : []
  );
  const [imagesPreview, setImagesPreview] = useState(
    params?.id && stock?.images ? stock?.images.slice(1) : []
  );

  // const [editImagesPreview, setEditImagesPreview] = useState([]);

  const [modelList, setModelList] = useState([]);

  const [stockValue, setStockValue] = useState({
    brand: {
      id: params?.id && stock ? stock?.brand?.id : "",
      name: params?.id && stock ? stock?.brand?.name : "",
    },
    model: {
      id: params?.id && stock ? stock?.model?.id : "",
      name: params?.id && stock ? stock?.model?.name : "",
    },
    category: {
      id: params?.id && stock ? stock?.category?.id : "",
      name: params?.id && stock ? stock?.category?.name : "",
    },
    coverBrand: params?.id && stock ? stock?.coverBrand : "",
    buyPrice: params?.id && stock ? stock?.buyPrice : "",
    qty: params?.id && stock ? stock?.qty : "",
    color: params?.id && stock ? stock?.color : "",
    images: "",
  });

  const [error, setError] = useState({
    brand: "",
    model: "",
    category: "",
    coverBrand: "",
    buyPrice: "",
    qty: "",
    color: "",
    images: "",
  });

  let brandsList =
    brands &&
    brands.length > 0 &&
    brands.map((brand) => {
      // return brand.brand
      return {
        value: brand?.brand,
        label: brand?.brand,
        id: brand?._id,
      };
    });
  // console.log(brandsList);

  let categoryList =
    categories &&
    categories.length > 0 &&
    categories.map((category) => {
      return {
        value: category?.name,
        label: category?.name,
        id: category?._id,
      };
    });

  // const addFields = () => {
  //   let newField = 0;
  //   setUploadImgs([...uploadImgs, newField + 1]);
  // };

  // const addUploadImgs = (event) => {
  //   event.preventDefault();
  //   let newField = 0;
  //   setUploadImgs([...uploadImgs, newField + 1]);
  // };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        // if (!params?.id) {
        setImagesPreview([...imagesPreview, reader.result]);
        images.length < 4 &&
          setImages([...images, { _id: uuid(), url: reader.result }]);
        setError({ ...error, images: "" });
      }
    };

    reader.readAsDataURL(file);

    // const newImages = acceptedFiles.map((file) => ({
    //   id: uuid(),
    //   file,
    // }));
    // console.log("newImages", newImages);
    // setImages([...images, ...newImages]);
  };

  const handleDropThumbnail = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setThumbnail({ id: uuid(), url: reader.result });
        setError({ ...error, images: "" });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = (id) => {
    const updatedImages = images.filter((image) => image._id !== id);
    setImages(updatedImages);
  };

  const handleAddVariant = (event, index) => {
    setOpenModal(true);
    addItems.map((item) => {
      return (
        item.id === index &&
        setInputItem({
          ...inputItem,
          title: item.title,
          dispatchItem: item.dispatchItem,
          inputItemData: (
            <>
              {item.id === 2 && (
                <div
                  style={{
                    position: "relative",
                    zIndex: 444,
                    marginBottom: "20px",
                  }}
                >
                  <Select
                    options={brandsList}
                    placeholder="Select Brand *"
                    isSearchable={true}
                    onChange={(e) => {
                      console.log(e);
                      setModelData({ ...modelData, modelBrand: e.value });
                    }}
                  />
                  {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo1"
                        size="small"
                        placeholder="Select Brand"
                        fullWidth
                        options={brandsList}
                        // sx={{ width: 300 }}
                        // onChange={handleBrandModel}
                        onChange={(event, newValue) => {
                          // setValue(newValue);
                          // setStockValue({
                          //   ...stockValue,
                          //   brand: { name: newValue },
                          // });
                          handleBrandModel(newValue);
                          // setProductValue({ ...productValue, brand: { name: newValue, id: newValue } });
                          // handleBrandModel(event)
                        }}
                        value={stockValue.brand.name}
                        // defaultValue={"apple"}
                        renderInput={(params) => (
                          <Input
                            {...params}
                            label="Select Brand"
                            required
                            error={error.brand ? true : false}
                            helperText={error.brand}
                          />
                        )}
                      /> */}
                  {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo1"
                    size="small"
                    placeholder="Select Brand"
                    fullWidth
                    options={brandsList}
                    onChange={(event, newValue) => {
                      setModelData({ ...modelData, modelBrand: event.target.value, });
                    }}
                    value={modelData.model.name}
                    renderInput={(params) => (
                      <Input
                        {...params}
                        label="Select Brand"
                        required
                        error={error.brand ? true : false}
                        helperText={error.brand}
                      />
                    )}
                  /> */}
                </div>
              )}
              <Input
                variant="outlined"
                name={item.key}
                label={item.label}
                required
                // value={modelData[item.key]}
                onChange={(e) => {
                  setModelData({
                    ...modelData,
                    [e.target.name]: e.target.value,
                  });
                }}
              // error={error.email ? true : false}
              // helperText={error.email}
              />
            </>
          ),
        })
      );
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleBrandModel = (value) => {
    console.log(value);
    // console.log(e.value);
    setStockValue({
      ...stockValue,
      brand: { name: value.value, id: value.id },
    });
    setError({ ...error, brand: "" });

    let brandModel =
      brands &&
      brands?.length > 0 &&
      brands?.find((brand) => {
        return brand._id === value.id;
      });
    // console.log(brandModel);
    let modelListData = brandModel?.models?.map((model) => {
      return {
        value: model?.name,
        label: model?.name.replace(/\b\w/g, (c) => c.toUpperCase()),
        id: model?._id,
      };
    });

    // console.log(modelListData);
    console.log("error===", error);
    setModelList([...modelListData]);
  };

  // const createProductImagesChange = (e) => {
  //   // const files = Array.from(e.target.files);
  //   const file = e.target.files[0];
  //   console.log(e);
  //   const reader = new FileReader();
  //   // if (params?.id && stock.images > 0) {
  //   //   console.log(imagesPreview.slice(1));
  //   //   setImagesPreview(imagesPreview.slice(1));
  //   // }
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       console.log("---------", [...imagesPreview, reader.result]);
  //       if (!params?.id && !stock) {
  //         console.log(imagesPreview, "fjdkfnk");
  //         setImagesPreview([...imagesPreview, reader.result]);
  //         setImages([...images, reader.result]);
  //       } else {
  //         imagesPreview.slice(1);
  //         setImagesPreview(imagesPreview);
  //         setEditImagesPreview([...editImagesPreview, reader.result]);
  //       }
  //       setError({ ...error, images: "" });
  //       // setImagesPreview((old) => [...old, reader.res+ult]);
  //       // setImages((old) => [...old, reader.result]);
  //     }
  //   };

  //   reader.readAsDataURL(file);
  //   // files.forEach((file) => {
  //   //     const reader = new FileReader();
  //   //     reader.onload = () => {
  //   //         if (reader.readyState === 2) {
  //   //             setImagesPreview((old) => [...old, reader.result]);
  //   //             setImages((old) => [...old, reader.result]);
  //   //         }
  //   //     };
  //   //     reader.readAsDataURL(file);
  //   // });
  // };

  const createProductThumbnailChange = (e) => {
    // const files = Array.from(e.target.files);
    const file = e.target.files[0];
    console.log(e);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setThumbnail({ id: uuid(), url: reader.result });
        setError({ ...error, images: "" });
      }
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStockValue({ ...stockValue, [name]: value });
    console.log("stockValue", stockValue);
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(stockValue);
    if (
      stockValue.brand.name === "" ||
      stockValue.model.name === "" ||
      stockValue.category.name === "" ||
      stockValue.buyPrice === "" ||
      stockValue.color === "" ||
      stockValue.qty === "" ||
      images.length <= 0
    ) {
      setError({
        ...error,
        brand: stockValue.brand.name === "" ? "Please select brand" : "",
        category:
          stockValue.category.name === "" ? "Please select category" : "",
        model: stockValue.model.name === "" ? "Please select model" : "",
        buyPrice: stockValue.buyPrice === "" ? "Please add buyPrice" : "",
        color: stockValue.color === "" ? "Please add color" : "",
        qty: stockValue.qty === "" ? "Please add qty" : "",
        images: images.length <= 0 ? "File is required" : "",
      });
      return;
    }
    console.log("stockValue******", stockValue);
    const myForm = new FormData();
    stockValue.qty = parseInt(stockValue.qty);
    myForm.set("brand", JSON.stringify(stockValue.brand));
    myForm.set("model", JSON.stringify(stockValue.model));
    myForm.set("category", JSON.stringify(stockValue.category));
    myForm.set("coverBrand", stockValue.coverBrand);
    myForm.set("buyPrice", parseInt(stockValue.buyPrice));
    myForm.set("color", stockValue.color);
    myForm.set("qty", stockValue.qty);

    if (thumbnail.url.includes("base64") && !params.id) {
      myForm.append("images", thumbnail.url);
      !params?.id &&
        images.forEach((image) => {
          myForm.append("images", image.url);
        });
    }

    if (params.id) {
      let imagesData = [thumbnail, ...images];
      myForm.set("images", JSON.stringify(imagesData));
    }

    dispatch(actionLoader.startLoader());

    if (params?.id && stock) {
      dispatch(stockAction.updateStock({ id: params?.id, myForm }, navigate));
      console.log("called");
    } else {
      dispatch(stockAction.createStock(myForm, navigate));
    }
    // (!params?.id && !stock)
    //   ? dispatch(stockAction.createStock(myForm, navigate))
    //   : dispatch(stockAction.updateStock({ id: params?.id, myForm }, navigate));
    console.log("myForm", myForm);
    if (networkProgressDialog) {
      setImagesPreview([]);
      setImages([]);
      setThumbnail("");
    }
    {
      networkProgressDialog &&
        setStockValue({
          ...stockValue,
          brand: { name: "", id: "" },
          model: { name: "", id: "" },
          category: { name: "", id: "" },
          coverBrand: "",
          buyPrice: "",
          qty: "",
          color: "",
        });
    }
  };

  useEffect(() => {
    dispatch(actions.getBrands());
    dispatch(actions.getCategories());
    params?.id && dispatch(stockAction.getSingleStock(params?.id));
  }, [dispatch]);

  useEffect(() => {
    setStockValue({
      brand: {
        id: params?.id && stock ? stock?.brand?.id : "",
        name: params?.id && stock ? stock?.brand?.name : "",
      },
      model: {
        id: params?.id && stock ? stock?.model?.id : "",
        name: params?.id && stock ? stock?.model?.name : "",
      },
      category: {
        id: params?.id && stock ? stock?.category?.id : "",
        name: params?.id && stock ? stock?.category?.name : "",
      },
      coverBrand: params?.id && stock ? stock?.coverBrand : "",
      buyPrice: params?.id && stock ? stock?.buyPrice : "",
      qty: params?.id && stock ? stock?.qty : "",
      color: params?.id && stock ? stock?.color : "",
      images: "",
    });
    setImagesPreview(params?.id && stock?.images ? stock?.images.slice(1) : []);
    setImages(params?.id && stock?.images ? stock?.images.slice(1) : []);
    setDefaultValueOfBrand({
      value: stock?.brand?.name,
      label: stock?.brand?.name,
    });
    setUploadImgs(
      params?.id && stock?.images ? (arr.length > 0 ? arr : []) : []
    );
    setThumbnail(params?.id && stock?.images ? stock?.images[0] : "");
    // const data = imagesPreview.slice(1, )
    // console.log(data);
    // setImagesPreview(data);
  }, [stock]);

  console.log("params?.id ===", params?.id);

  const addItems = [
    {
      id: 1,
      name: "addMobileBrand",
      label: "Add Mobile Brand",
      title: "Add a Mobile Brand",
      key: "brand",
      dispatchItem: "createBrand",
    },
    {
      id: 2,
      name: "addMobileModal",
      label: "Add Mobile Modal",
      title: "Add a Mobile Modal",
      key: "model",
      dispatchItem: "createModel",
    },
    {
      id: 3,
      name: "addCoverCategory",
      label: "Add cover category",
      title: "Add a cover category",
      key: "category",
      dispatchItem: "createCategory",
    },
  ];

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

  const handleCancel = () => {
    setStockValue({
      brand: {
        id: params?.id && stock ? stock?.brand?.id : "",
        name: params?.id && stock ? stock?.brand?.name : "",
      },
      model: {
        id: params?.id && stock ? stock?.model?.id : "",
        name: params?.id && stock ? stock?.model?.name : "",
      },
      category: {
        id: params?.id && stock ? stock?.category?.id : "",
        name: params?.id && stock ? stock?.category?.name : "",
      },
      coverBrand: params?.id && stock ? stock?.coverBrand : "",
      buyPrice: params?.id && stock ? stock?.buyPrice : "",
      qty: params?.id && stock ? stock?.qty : "",
      color: params?.id && stock ? stock?.color : "",
      images: "",
    });
  };

  return (
    <div className={styles.addStock}>
      <div className={styles.addStockHeadLine}>
        <Typography variant="h5" component="h2">
          {stock && params?.id ? "Update Stock" : "add stock"}
        </Typography>
        <div className={styles.BreadCrumb}>
          <BreadCrumb
            parentElement="Home"
            childLink={
              stock && params?.id ? `/stock/${params?.id}` : "/stock/new"
            }
            childElement="Stock"
            child2Link={
              stock && params?.id ? `/stock/${params?.id}` : "/stock/new"
            }
            child2Element={stock && params?.id ? "Update Stock" : "Add Stock"}
          />
        </div>
      </div>
      <form
        className={styles.addStockContainer}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={styles.addStockForm}>
          <div className={styles.leftLayout}>
            <div className={styles.stockDetails}>
              <h3>Add Stock Details</h3>
              <div className={styles.stockDetailsWrapper}>
                <div className={styles.addItems}>
                  <div className={styles.mobileBrand}>
                    <div className={styles.brand}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo1"
                        size="small"
                        placeholder="Select Brand"
                        fullWidth
                        options={brandsList}
                        // sx={{ width: 300 }}
                        // onChange={handleBrandModel}
                        onChange={(event, newValue) => {
                          // setValue(newValue);
                          // setStockValue({
                          //   ...stockValue,
                          //   brand: { name: newValue },
                          // });
                          handleBrandModel(newValue);
                          // setProductValue({ ...productValue, brand: { name: newValue, id: newValue } });
                          // handleBrandModel(event)
                        }}
                        value={stockValue.brand.name}
                        // defaultValue={"apple"}
                        renderInput={(params) => (
                          <Input
                            {...params}
                            label="Select Brand"
                            required
                            error={error.brand ? true : false}
                            helperText={error.brand}
                          />
                        )}
                      />
                    </div>
                    <div className={styles.addBrand}>
                      {!params?.id && (
                        <BaseButton
                          variant="contained"
                          startIcon={<AddIcon />}
                          className={styles.brandBtn}

                          onClick={(event) => handleAddVariant(event, 1)}
                        >
                          add brand
                        </BaseButton>
                      )}
                    </div>
                  </div>
                  <div className={styles.mobileModel}>
                    <div className={styles.model}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo1"
                        size="small"
                        placeholder="Select Model"
                        fullWidth
                        options={modelList}
                        onChange={(event, newValue) => {
                          setStockValue({
                            ...stockValue,
                            model: { name: newValue.value, id: newValue.id },
                          });
                          setError({ ...error, model: "" });
                        }}
                        value={stockValue.model.name}
                        renderInput={(params) => (
                          <Input
                            {...params}
                            label="Select Model"
                            required
                            error={error.model ? true : false}
                            helperText={error.model}
                          />
                        )}
                      />
                    </div>

                    <div className={styles.addModel}>
                      {!params?.id && (
                        <BaseButton
                          variant="contained"
                          startIcon={<AddIcon />}
                          className={styles.modelBtn}

                          onClick={(event) => handleAddVariant(event, 2)}
                        >
                          add model
                        </BaseButton>
                      )}
                    </div>
                  </div>
                  <div className={styles.coverCategory}>
                    <div className={styles.category}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        size="small"
                        placeholder="Select Category"
                        fullWidth
                        options={categoryList}
                        onChange={(event, newValue) => {
                          // setValue(newValue);
                          setStockValue({
                            ...stockValue,
                            category: { name: newValue.value, id: newValue.id },
                          });
                          setError({ ...error, category: "" });
                        }}
                        value={stockValue.category.name}
                        renderInput={(params) => (
                          <Input
                            {...params}
                            label="Select Category"
                            required
                            error={error.category ? true : false}
                            helperText={error.category}
                          />
                        )}
                      />
                    </div>
                    <div className={styles.addCategory}>
                      {!params?.id && (
                        <BaseButton
                          variant="contained"
                          startIcon={<AddIcon />}
                          className={styles.categoryBtn}
                          onClick={(event) => handleAddVariant(event, 3)}
                        >
                          add category
                        </BaseButton>
                      )}
                    </div>
                  </div>

                  <div className={styles.coverBrand}>
                    <div className={styles.productColor}>
                      <Input
                        variant="outlined"
                        name="coverBrand"
                        label="Cover Brand"
                        required
                        value={stockValue.coverBrand}
                        onChange={handleChange}
                        error={error.coverBrand ? true : false}
                        helperText={error.coverBrand}
                      />
                    </div>
                  </div>

                  {/* <Modal
                    open={openModal}
                    setOpen={setOpenModal}
                    title={inputItem.title}
                    // onClick={() => {
                    //   setOpenModal(false);
                    // }}
                    onClick={() => {
                      setOpenModal(false);
                      console.log(modelData);
                      dispatch(actions[inputItem.dispatchItem](modelData));
                    }}
                    sx={{ "& .MuiDialog-paper": { width: "25%" } }}
                    dividers={false}
                  >
                    {inputItem.inputItemData}
                  </Modal> */}

                  <BasicModal
                    openModal={openModal}
                    title={inputItem.title}
                    handleCloseModal={handleCloseModal}
                    setModelData={setModelData}
                    modelData={modelData}
                    handleClick={() => {
                      setOpenModal(false);
                      dispatch(actions[inputItem.dispatchItem](modelData));
                    }}
                  >
                    {inputItem.inputItemData}
                  </BasicModal>
                </div>
                <div className={styles.productQty}>
                  <div className={styles.buyPrice}>
                    <Input
                      variant="outlined"
                      name="buyPrice"
                      type="number"
                      label="Cost Price"
                      value={stockValue.buyPrice}
                      onChange={(e) => {
                        e.target.value =
                          e.target.value < 1 ? 1 : e.target.value;
                        handleChange(e);
                      }}
                      error={error.buyPrice ? true : false}
                      helperText={error.buyPrice}
                      required
                      InputProps={{
                        inputProps: {
                          // max: 100,
                          min: 0,
                        },
                      }}
                    />
                  </div>
                  <div className={styles.quantity}>
                    <Input
                      variant="outlined"
                      name="qty"
                      label="Quantity"
                      type="number"
                      required
                      value={stockValue.qty}
                      onChange={(e) => {
                        e.target.value =
                          e.target.value < 1 ? 1 : e.target.value;
                        handleChange(e);
                      }}
                      error={error.qty ? true : false}
                      helperText={error.qty}
                      InputProps={{
                        inputProps: {
                          // max: 100,
                          min: 0,
                        },
                      }}
                    />
                  </div>
                </div>
                <div className={styles.productColor}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    size="small"
                    placeholder="Select Color"
                    options={color}
                    onChange={(event, newValue) => {
                      setStockValue({ ...stockValue, color: newValue });
                      setError({ ...error, color: "" });
                    }}
                    value={stockValue.color}
                    renderInput={(params) => (
                      <Input
                        {...params}
                        label="Select Color"
                        required
                        error={error.color ? true : false}
                        helperText={error.color}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightLayout}>
            <div className={styles.media}>
              <h3>thumbnail</h3>
              <label htmlFor="images" className={styles.uploadMedia}>
                {thumbnail && (
                  <div className={styles.editDiv}>
                    <div
                      style={{
                        padding: "10px",
                        backgroundColor: "#fff",
                        borderRadius: "100%",
                        display: "flex",
                      }}
                    >
                      <EditIcon />
                    </div>
                    <input
                      type="file"
                      name="images"
                      id="images"
                      // value={values.images}
                      className={styles.upload}
                      onChange={createProductThumbnailChange}
                      accept="image/png, image/jpeg ,image/jpeg"
                    />
                  </div>
                )}
                {thumbnail && (
                  <img
                    src={params?.id ? thumbnail?.url : thumbnail?.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                )}
                {!thumbnail && (
                  <>
                    {/* <input
                      type="file"
                      name="images"
                      id="images"
                      value={productValue.images}
                      className={styles.upload}
                      onChange={createProductThumbnailChange}
                      accept="image/png, image/jpeg ,image/jpeg"
                    />

                    <div className={styles.uploadLogo}>
                      <img src={UploadImg} alt="uploadImg" />
                   
                      <p>click file to upload</p>
                    </div> */}
                    <Dropzone onDrop={handleDropThumbnail}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} style={{ height: "100%" }}>
                          <div
                            style={{
                              // border: "1px dashed #aaa",
                              // padding: "10px 20px",
                              // textAlign: "center",
                              // backgroundColor: "#FAFAFA",
                              // color: "#e2e2e2"
                              height: "100%",
                            }}
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className={styles.uploadLogo}>
                              <img src={UploadImg} alt="uploadImg" />

                              <p>
                                Drag and drop some files here, or click to
                                select files
                              </p>
                            </div>
                            {/* <p
                              style={{
                                fontSize: "15px",
                                margin: 0,
                                color: "gray",
                              }}
                            >
                              Drag and drop some files here, or click to select
                              files
                            </p> */}
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  </>
                )}
              </label>
              <h3>media</h3>

              <div>
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <div
                        style={{
                          border: "1px dashed #aaa",
                          padding: "10px 20px",
                          textAlign: "center",
                          backgroundColor: "#FAFAFA",
                          // color: "#e2e2e2"
                        }}
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <p
                          style={{ fontSize: "15px", margin: 0, color: "gray" }}
                        >
                          Drag and drop some files here, or click to select
                          files
                        </p>
                        <p
                          style={{ fontSize: "12px", margin: 0, color: "gray" }}
                        >
                          You can upload maximum 4 images
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
                <div className={styles.uploadList}>
                  <div className={styles.uploadPicList}>
                    {images.map((image) => (
                      <>
                        <div key={image._id} className={styles.uploadPic}>
                          <img
                            src={image.url}
                            alt={""}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                          <button
                            className={styles.previewImg}
                            onClick={() => handleDelete(image._id)}
                          >
                            <CloseIcon
                              sx={{
                                backgroundColor: "#fff",
                                borderRadius: "100%",
                              }}
                            />
                          </button>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              {/* <div className={styles.uploadList}>
                <div className={styles.uploadPicList}>
                  {uploadImgs.map((input, index) => {
                    return (
                      <label
                        htmlFor="imagesData"
                        className={styles.uploadPic}
                        key={index}
                      >
                        {imagesPreview?.length > index && (
                          <img
                            src={
                              params?.id
                                ? imagesPreview[index].url
                                : imagesPreview[index]
                            }
                            alt=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        )}
                        {imagesPreview?.length <= index && (
                          <>
                            <input
                              type="file"
                              name="imagesData"
                              id="imagesData"
                              // value={values.images}
                              accept="image/png, image/jpeg ,image/jpeg"
                              className={styles.uploadSingle}
                              onChange={createProductImagesChange}
                            />
                            <AddPhotoAlternateIcon />
                          </>
                        )}
                      </label>
                    );
                  })}
                </div>
                {uploadImgs.length !== 4 && (
                  <button onClick={addUploadImgs} className={styles.addBtn}>
                    +
                  </button>
                )}
              </div> */}
              {/* {errors.images && touched.images ? (
                <div className={styles.errorMsg}>{errors.images}</div>
              ) : null} */}
              {error.images ? (
                <div className={styles.errorMsg}>{error.images}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className={styles.addForm}>
          <div className={styles.addBtn}>
            <BaseButton variant="outlined" onClick={handleCancel}>
              cancel
            </BaseButton>
            <BaseButton variant="contained" type="submit">
              {params?.id && stock ? "Update Stock" : "add stock"}
            </BaseButton>
          </div>
        </div>
      </form>
      {networkProgressDialog && (
        <div className={styles.loader}>
          <Box
            sx={{
              display: "grid",
              height: "100%",
              width: "100%",
              placeItems: "center",
              marginTop: 10,
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
};

export default AddStock;
