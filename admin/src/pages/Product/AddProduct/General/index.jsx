import React, { useState, useEffect } from "react";
import UploadImg from "assets/images/placeholder.png";
import styles from "./General.module.scss";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import RadioButtonsGroup from "components/atoms/Radio";
import Slider from "@mui/material/Slider";
import BaseButton from "components/atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "redux/Products/action";
import { useNavigate, useParams } from "react-router";
import { Autocomplete, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Input from "components/atoms/Input";
import uuid from "utils/uuid";
import Dropzone from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { actions as actionLoader } from "redux/Loader/action";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { networkProgressDialog } = useSelector((state) => state.loader);
  const { brands, categories, product } = useSelector(
    (state) => state.products
  );
  const [discountType, setDiscountType] = useState("");
  const [modelList, setModelList] = useState([]);
  const [percentage, setPercentage] = useState(false);
  const [fixedPrice, setFixedPrice] = useState(false);
  const [images, setImages] = useState(
    product?.images ? product?.images.slice(1) : []
  );
  const [imagesPreview, setImagesPreview] = useState(
    product?.images ? product?.images.slice(1) : []
  );
  const [thumbnail, setThumbnail] = useState(
    params?.id && product?.images ? product?.images[0] : ""
  );
  const [defaultPercentage, setDefaultPercentage] = useState(0);
  const [fixedPriceDiscount, setFixedPriceDiscount] = useState(0);
  const [isNoDiscountActive, setIsNoDiscountActive] = useState(false);
  const [isPercentageActive, setIsPercentageActive] = useState(false);
  const [isDiscountedActive, setIsDiscountedActive] = useState(false);

  const [value, setValue] = useState("");
  // console.log("fixedPriceDiscount", fixedPriceDiscount);
  // console.log("brands",brands)
  // console.log("categories",categories)

  const [productValue, setProductValue] = useState({
    name: product?.name ? product?.name : "",
    desc: product?.desc ? product?.desc : "",
    brand: {
      id: product ? product?.brand?.id : "",
      name: product ? product?.brand : "",
    },
    model: {
      id: product ? product?.model?.id : "",
      name: product ? product?.model : "",
    },
    category: {
      id: product ? product?.category?.id : "",
      name: product ? product?.category : "",
    },
    coverBrand: product?.coverBrand ? product?.coverBrand : "",
    color: product?.color ? product?.color : "",
    qty: product?.qty ? product?.qty : 0,
    price: product?.price ? product?.price : "",
    discount: {
      discountType: product?.discount?.type
        ? product?.discount?.type
        : "noDiscount",
      value: product?.discount?.value ? product?.discount?.value : 0,
    },
    images: "",
    finalPrice: product?.finalPrice ? product?.finalPrice : 0,
  });

  const [error, setError] = useState({
    name: "",
    desc: "",
    brand: "",
    category: "",
    model: "",
    images: "",
    color: "",
    qty: "",
    price: "",
    thumbnail: "",
  });

  const arr =
    params?.id &&
    product &&
    product?.images?.length > 0 &&
    product?.images?.map((data) => {
      return 1;
    });

  arr && arr?.pop();

  const [uploadImgs, setUploadImgs] = useState(
    params?.id && product ? (arr.length > 0 ? arr : []) : []
  );

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

  const handleSliderChange = (event, newValue) => {
    setDefaultPercentage(newValue);
    let priceDiscount = parseInt(
      (productValue.price * Number(event.target.value)) / 100
    );
    const finalProductPrice = parseInt(productValue.price - priceDiscount);
    console.log("finalProductPrice", finalProductPrice);
    setProductValue({
      ...productValue,
      finalPrice: finalProductPrice !== NaN ? parseInt(finalProductPrice) : 0,
      discount: {
        type: percentage ? "percentage" : "noDiscount",
        value: Number(event.target.value),
      },
    });
  };

  const handleInputChange = (event) => {
    setDefaultPercentage(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
    let priceDiscount = parseInt(
      (productValue.price * Number(event.target.value)) / 100
    );
    const finalProductPrice = parseInt(productValue.price - priceDiscount);
    setProductValue({
      ...productValue,
      finalPrice: finalProductPrice !== NaN ? parseInt(finalProductPrice) : 0,
      discount: {
        type: percentage ? "percentage" : "noDiscount",
        value: Number(event.target.value),
      },
    });
  };
  const handleFixedPriceDiscount = (event) => {
    setFixedPriceDiscount(
      event.target.value === "" ? 0 : Number(event.target.value)
    );
    const finalProductPrice = parseInt(
      productValue.price - Number(event.target.value)
    );
    setProductValue({
      ...productValue,
      finalPrice: finalProductPrice !== NaN ? parseInt(finalProductPrice) : 0,
      discount: {
        type: fixedPrice ? "fixedPrice" : "noDiscount",
        value: Number(event.target.value),
      },
    });
  };

  const handleBlur = () => {
    if (defaultPercentage < 0) {
      setDefaultPercentage(0);
    } else if (defaultPercentage > 100) {
      setDefaultPercentage(100);
    }
  };

  const handleDiscountChange = (event) => {
    let priceDiscount = 0;
    setDiscountType(event);

    if (event === "No Discount") {
      setIsNoDiscountActive(true);
      setDefaultPercentage(0);
      setFixedPriceDiscount(0);
      priceDiscount = 0;
    } else {
      setIsNoDiscountActive(false);
    }

    if (event === "Percentage") {
      setIsPercentageActive(true);
      setPercentage(true);
      setDefaultPercentage(0);

      // priceDiscount = parseInt((productValue.price * defaultPercentage) / 100);
    } else {
      setIsPercentageActive(false);

      setPercentage(false);
    }
    if (event === "Discounted Price") {
      setIsDiscountedActive(true);
      setFixedPrice(true);
      setFixedPriceDiscount(0);
      // priceDiscount = parseInt(productValue.price - fixedPriceDiscount);
    } else {
      setIsDiscountedActive(false);

      setFixedPrice(false);
    }
    // setFixedPriceDiscount({ ...fixedPriceDiscount, [name]: value });
    // setProductValue({ ...productValue, [name]: {} });

    const finalProductPrice = parseInt(productValue.price - priceDiscount);

    setProductValue({
      ...productValue,
      finalPrice: finalProductPrice !== NaN ? parseInt(finalProductPrice) : 0,
      discount: {
        type:
          event === "Percentage"
            ? "percentage"
            : event === "Fixed Price"
            ? "fixedPrice"
            : "noDiscount",
        value:
          event === "Percentage"
            ? defaultPercentage
              ? defaultPercentage
              : 0
            : event === "Discounted Price"
            ? fixedPriceDiscount
              ? fixedPriceDiscount
              : 0
            : 0,
      },
    });
    // console.log('productValue', productValue)
  };

  // const addUploadImgs = (event) => {
  //   event.preventDefault();
  //   let newField = 0;
  //   setUploadImgs([...uploadImgs, { id: uuid(), image: "" }]);
  // };

  let brandsList =
    brands &&
    brands?.length > 0 &&
    brands?.map((brand) => {
      return {
        value: brand.brand,
        // value: brand?._id,
        label: brand.brand.replace(/\b\w/g, (c) => c.toUpperCase()),
        id: brand?._id,
      };
    });

  let categoriesList =
    categories &&
    categories?.length > 0 &&
    categories?.map((category) => {
      return {
        value: category.name,
        label: category.name.replace(/\b\w/g, (c) => c.toUpperCase()),
        id: category?._id,
      };
    });
  // let modelList = [];
  const handleClick = () => {
    setProductValue({
      name: product?.name && params.id ? product?.name : "",
      desc: product?.desc && params.id ? product?.desc : "",
      brand: {
        id: product && params.id ? product?.brand?.id : "",
        name: product && params.id ? product?.brand : "",
      },
      model: {
        id: product && params.id ? product?.model?.id : "",
        name: product && params.id ? product?.model : "",
      },
      category: {
        id: product && params.id ? product?.category?.id : "",
        name: product && params.id ? product?.category : "",
      },
      coverBrand: product?.coverBrand && params.id ? product?.coverBrand : "",
      color: product?.color && params.id ? product?.color : "",
      qty: product?.qty && params.id ? product?.qty : 0,
      price: product?.price && params.id ? product?.price : "",
      discount: product?.discount && params.id ? product?.discount : 0,
      images: "",
      finalPrice: product?.finalPrice && params.id ? product?.finalPrice : 0,
    });
    setImagesPreview(product?.images ? product?.images.slice(1) : []);
    setImages(product?.images ? product?.images.slice(1) : []);
    setUploadImgs(
      params?.id && product?.images ? (arr.length > 0 ? arr : []) : []
    );
    setThumbnail(params?.id && product?.images ? product?.images[0] : "");
  };

  const handleBrandModel = (value) => {
    // console.log(value);
    // e =  e.target;
    setProductValue({
      ...productValue,
      brand: { name: value.value, id: value.id },
    });
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

    setModelList([...modelListData]);
    setError({ ...error, brand: "" });
  };

  // const createProductImagesChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const file = e.target.files[0];
  //   // setImages([]);
  //   // setImagesPreview([]);
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       // if (!params?.id) {
  //       setImagesPreview([...imagesPreview, reader.result]);
  //       setImages([...images, reader.result]);
  //       // } else {
  //       //   // imagesPreview.slice(1);
  //       //   setImagesPreview(imagesPreview);
  //       //   // setEditImagesPreview([...editImagesPreview, reader.result]);
  //       // }
  //       // setImagesPreview([...imagesPreview, reader.result]);
  //       // setImages([...images, reader.result]);
  //       setError({ ...error, images: "" });
  //       // setImagesPreview((old) => [...old, reader.result]);
  //       // setImages((old) => [...old, reader.result]);
  //     }
  //   };

  //   reader.readAsDataURL(file);
  // };

  // console.log(imagesPreview);

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

  // const {
  // values,
  // errors,
  // setErrors,
  // handleBlur,
  // handleChange,
  // handleSubmit,
  //   touched,
  // } = useFormik({
  //   initialValues: productValue,
  //   validationSchema: addProductSchema,

  // onBlur: () => {
  //   if (defaultPercentage < 0) {
  //     setDefaultPercentage(0);
  //   } else if (defaultPercentage > 100) {
  //     setDefaultPercentage(100);
  //   }
  // },

  // onChange: (event) => {
  //   const { name, value } = event.target;
  //   // setProductValue({ ...productValue, brand: event.value });
  //   // let brandModel =
  //   //   brands &&
  //   //   brands?.length > 0 &&
  //   //   brands?.find((brand) => {
  //   //     return brand.brand === event.value;
  //   //   });
  //   // console.log(brandModel);
  //   // let modelListData = brandModel?.models?.map((model) => {
  //   //   return {
  //   //     value: model?.name,
  //   //     label: model?.name.replace(/\b\w/g, (c) => c.toUpperCase()),
  //   //   };
  //   // });
  //   // setModelList([...modelListData]);

  //   // const files = Array.from(event.target.files);
  //   // const file = event.target.files[0];
  //   // console.log(event.target.files);
  //   // setImages([]);
  //   // setImagesPreview([]);
  //   // const reader = new FileReader();

  //   // reader.onload = () => {
  //   //   if (reader.readyState === 2) {
  //   //     console.log("---------", [...imagesPreview, reader.result]);
  //   //     setImagesPreview([...imagesPreview, reader.result]);
  //   //     setImages([...images, reader.result]);
  //   //     // setImagesPreview((old) => [...old, reader.result]);
  //   //     // setImages((old) => [...old, reader.result]);
  //   //   }
  //   // };

  //   // reader.readAsDataURL(file);
  //   // console.log("file@@@$$$", file)

  //   setProductValue({ ...productValue, [name]: value });
  // },
  // onSubmit: (event, action) => {
  // event.preventDefault();
  // console.log("On submit-----------");
  // const myForm = new FormData();
  // myForm.set("name", values.name);
  // myForm.set("price", parseInt(values.price));
  // myForm.set("desc", values.desc);
  // myForm.set(
  //   "category",
  //   params?.id
  //     ? productValue.category.name
  //     : JSON.stringify(productValue.category)
  // );
  // myForm.set(
  //   "brand",
  //   params?.id
  //     ? productValue.brand.name
  //     : JSON.stringify(productValue.brand)
  // );
  // myForm.set(
  //   "model",
  //   params?.id
  //     ? productValue.model.name
  //     : JSON.stringify(productValue.model)
  // );
  // console.log(value.finalPrice);
  // myForm.set("coverBrand", values.coverBrand);
  // myForm.set("color", productValue.color);
  // myForm.set("qty", parseInt(values.qty));
  // myForm.set("discount", JSON.stringify(productValue.discount));
  // myForm.set("finalPrice", parseInt(productValue.finalPrice));
  // // !params.id &&
  // //   images.forEach((image) => {
  // //     myForm.append("images", image);
  // //   });
  // if (thumbnail.includes("base64")) {
  //   myForm.append("images", thumbnail);
  //   !params?.id &&
  //     images.forEach((image) => {
  //       myForm.append("images", image);
  //     });
  // }
  // console.log(myForm);
  // !params.id
  //   ? dispatch(actions.createProduct(myForm))
  //   : dispatch(actions.updateProduct({ id: params?.id, myForm }, navigate));
  // action.resetForm();
  // setImages([]);
  // setImagesPreview([]);
  // setValue("");
  // setProductValue({
  //   ...productValue,
  //   brand: { name: "", id: "" },
  //   model: { name: "", id: "" },
  //   category: { name: "", id: "" },
  //   coverBrand: "",
  //   qty: "",
  //   color: "",
  //   discount: {
  //     type: "",
  //     value: 0,
  //   },
  // });
  // },
  // });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductValue({ ...productValue, [name]: value });

    // if (productValue.name.length === 0) {
    //   setError({
    //     ...error,
    //     name: productValue.name.length === 0 ? "Name is compulsory" : "",
    //   });
    //   // return;
    // }
    // console.log("name@@@@@", error);

    setError({ ...error, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked---");
    if (
      productValue.name === "" ||
      productValue.desc === "" ||
      productValue.brand.name === undefined ||
      productValue.brand.name === "" ||
      productValue.model.name === undefined ||
      productValue.model.name === "" ||
      productValue.category.name === undefined ||
      productValue.category.name === "" ||
      productValue.color === "" ||
      productValue.price === "" ||
      productValue.qty <= 0 ||
      images.length <= 0
    ) {
      setError({
        ...error,
        name: productValue.name === "" ? "Name is required" : "",
        desc: productValue.desc === "" ? "Description is required" : "",

        brand:
          productValue.brand.name === undefined ||
          productValue.brand.name === ""
            ? "Please select the brand"
            : "",
        model:
          productValue.model.name === undefined ||
          productValue.model.name === ""
            ? "Please select the model"
            : "",
        category:
          productValue.category.name === undefined ||
          productValue.category.name === ""
            ? "Please select the category"
            : "",
        images: images.length <= 0 ? "File is required" : "",
        color: productValue.color === "" ? "Color is required" : "",
        qty: productValue.qty <= 0 ? "Quantity is required" : "",
        price: productValue.price <= 0 ? "Price is required" : "",
        thumbnail: productValue.color === "" ? "Thumbnail is required" : "",
      });
      return;
    }
    const myForm = new FormData();
    myForm.set("name", productValue.name);
    myForm.set("price", parseInt(productValue.price));
    myForm.set("desc", productValue.desc);
    myForm.set(
      "category",
      params?.id
        ? productValue.category.name
        : JSON.stringify(productValue.category)
    );
    myForm.set(
      "brand",
      params?.id ? productValue.brand.name : JSON.stringify(productValue.brand)
    );
    myForm.set(
      "model",
      params?.id ? productValue.model.name : JSON.stringify(productValue.model)
    );
    myForm.set("coverBrand", productValue.coverBrand);
    myForm.set("color", productValue.color);
    myForm.set("qty", parseInt(productValue.qty));
    myForm.set("discount", JSON.stringify(productValue.discount));
    myForm.set("finalPrice", parseInt(productValue.finalPrice));

    // !params.id &&
    //   images.forEach((image) => {
    //     myForm.append("images", image);
    //   });
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
    !params.id
      ? dispatch(actions.createProduct(myForm, navigate))
      : dispatch(actions.updateProduct({ id: params?.id, myForm }, navigate));
    if (networkProgressDialog) {
      setImages([]);
      setImagesPreview([]);
      setValue("");
    }
    {
      networkProgressDialog &&
        setProductValue({
          // ...productValue,
          name: "",
          desc: "",
          brand: { name: "", id: "" },
          model: { name: "", id: "" },
          category: { name: "", id: "" },
          coverBrand: "",
          qty: "",
          color: "",
          price: "",
          discount: {
            type: "",
            value: 0,
          },
          finalPrice: "",
        });
    }
  };

  // useEffect(() => {
  //   console.log("defaultPercentage---", defaultPercentage);
  //   let priceDiscount = parseInt(
  //     (productValue.price * defaultPercentage) / 100
  //   );
  //   const finalProductPrice = parseInt(productValue.price - priceDiscount);
  //   console.log("finalProductPrice", finalProductPrice);
  //   setProductValue({
  //     ...productValue,
  //     finalPrice: parseInt(finalProductPrice),
  //     discount: {
  //       type: percentage ? "percentage" : "noDiscount",
  //       value: defaultPercentage,
  //     },
  //   });
  // }, [productValue?.price, defaultPercentage]);

  // useEffect(() => {
  //   const finalProductPrice = parseInt(productValue.price - fixedPriceDiscount);
  //   setProductValue({
  //     ...productValue,
  //     finalPrice: finalProductPrice,
  //     discount: {
  //       type: fixedPrice ? "fixedPrice" : "noDiscount",
  //       value: fixedPriceDiscount,
  //     },
  //   });
  // }, [productValue?.price, fixedPriceDiscount]);

  useEffect(() => {
    dispatch(actions.getCategories());
    dispatch(actions.getBrands());
    params?.id && dispatch(actions.getProductDetails(params?.id));
  }, [dispatch]);

  useEffect(() => {
    setProductValue({
      name: product?.name && params.id ? product?.name : "",
      desc: product?.desc && params.id ? product?.desc : "",
      brand: {
        id: product && params.id ? product?.brand?.id : "",
        name: product && params.id ? product?.brand : "",
      },
      model: {
        id: product && params.id ? product?.model?.id : "",
        name: product && params.id ? product?.model : "",
      },
      category: {
        id: product && params.id ? product?.category?.id : "",
        name: product && params.id ? product?.category : "",
      },
      coverBrand: product?.coverBrand && params.id ? product?.coverBrand : "",
      color: product?.color && params.id ? product?.color : "",
      qty: product?.qty && params.id ? product?.qty : 0,
      price: product?.price && params.id ? product?.price : "",
      discount: product?.discount && params.id ? product?.discount : 0,
      images: "",
      finalPrice: product?.finalPrice && params.id ? product?.finalPrice : 0,
    });
    setImagesPreview(product?.images ? product?.images.slice(1) : []);
    setImages(product?.images ? product?.images.slice(1) : []);
    setUploadImgs(
      params?.id && product?.images ? (arr.length > 0 ? arr : []) : []
    );
    setThumbnail(params?.id && product?.images ? product?.images[0] : "");
  }, [product]);

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
    <div className={styles.general}>
      <form
        className={styles.generalContainer}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={styles.generalFormWrapper}>
          <div className={styles.leftLayout}>
            <div className={styles.basicInfo}>
              <h3>Basic Info</h3>

              <div className={styles.priceName}>
                <Input
                  variant="outlined"
                  name="name"
                  label="Product Name"
                  required
                  onChange={handleChange}
                  value={productValue.name}
                  error={error.name ? true : false}
                  helperText={error.name}
                />
              </div>
              <div className={styles.Description}>
                <Input
                  variant="outlined"
                  label="Description"
                  name="desc"
                  multiline
                  rows={4}
                  value={productValue.desc}
                  onChange={handleChange}
                  error={error.desc ? true : false}
                  helperText={error.desc}
                  required
                />
              </div>
            </div>
            <div className={styles.productDetails}>
              <h3>Product Details</h3>
              <div className={styles.productDetailsWrapper}>
                <div className={styles.mobileBrandModel}>
                  <div className={styles.brand}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo1"
                      size="small"
                      placeholder="Select Brand"
                      options={brandsList}
                      fullWidth
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
                      value={
                        productValue.brand.name ? productValue.brand.name : ""
                      }
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
                  <div className={styles.model}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo1"
                      size="small"
                      placeholder="Select Model"
                      fullWidth
                      options={modelList}
                      value={
                        productValue.model.name ? productValue.model.name : ""
                      }
                      onChange={(event, newValue) => {
                        setProductValue({
                          ...productValue,
                          model: { name: newValue.value, id: newValue.id },
                        });
                        setError({ ...error, model: "" });
                      }}
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
                </div>
                <div className={styles.coverCatagoryBrand}>
                  <div className={styles.category}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      size="small"
                      placeholder="Select Category"
                      fullWidth
                      options={categoriesList}
                      onChange={(event, newValue) => {
                        setProductValue({
                          ...productValue,
                          category: { name: newValue.value, id: newValue.id },
                        });
                        setError({ ...error, category: "" });
                      }}
                      value={
                        productValue.category.name
                          ? productValue.category.name
                          : ""
                      }
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
                  <div className={styles.coverBrand}>
                    <Input
                      variant="outlined"
                      name="coverBrand"
                      label="Cover Brand"
                      value={productValue.coverBrand}
                      onChange={handleChange}
                      // required
                      error={error.coverBrand ? true : false}
                      helperText={
                        error.coverBrand ? error.coverBrand : "optional"
                      }
                    />
                  </div>
                </div>
                <div className={styles.productColorQty}>
                  <div className={styles.color}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      size="small"
                      placeholder="Select Color"
                      options={color}
                      fullWidth
                      onChange={(event, newValue) => {
                        setProductValue({ ...productValue, color: newValue });
                        setError({ ...error, color: "" });
                      }}
                      value={productValue.color}
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
                  <div className={styles.qty}>
                    <Input
                      variant="outlined"
                      name="qty"
                      label="Quantity"
                      value={productValue.qty}
                      type="number"
                      onChange={(e) => {
                        e.target.value =
                          e.target.value < 1 ? 1 : e.target.value;
                        handleChange(e);
                        // setProductValue({ ...productValue, qty: e.target.value });
                      }}
                      required
                      error={error.qty ? true : false}
                      helperText={error.qty}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.pricing}>
              <h3>Pricing</h3>
              <div className={styles.pricingWrapper}>
                <div className={styles.basePrice}>
                  <Input
                    variant="outlined"
                    name="price"
                    type="number"
                    label="Base Product Price"
                    value={productValue.price}
                    onChange={(e) => {
                      e.target.value = e.target.value < 1 ? 1 : e.target.value;
                      handleChange(e);
                    }}
                    required
                    error={error.price ? true : false}
                    helperText={error.price}
                  />
                </div>
                <div className={styles.discountType}>
                  <h4>discount type</h4>
                  <div className={styles.discountTypeWrapper}>
                    <div
                      className={
                        isNoDiscountActive ? styles.setDiscount : styles.noDiscount
                      }
                      onClick={() => handleDiscountChange("No Discount")}
                    >
                      <FormControl>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={discountType === "No Discount"}
                              // onClick={handleDiscountChange}
                              value="No Discount"
                              name="discount"
                            />
                          }
                          label="No Discount"
                        />
                      </FormControl>
                    </div>
                    <div
                      // className={styles.percentage}
                      className={
                        isPercentageActive ? styles.setDiscount : styles.percentage
                      }
                      onClick={() => handleDiscountChange("Percentage")}
                    >
                      <FormControl>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={discountType === "Percentage"}
                              // onClick={handleDiscountChange}
                              value="Percentage"
                              name="discount"
                            />
                          }
                          label="Percentage %"
                        />
                      </FormControl>
                    </div>
                    <div
                      // className={styles.fixedPrice}
                      className={
                        isDiscountedActive ? styles.setDiscount : styles.fixedPrice
                      }
                      onClick={() => handleDiscountChange("Discounted Price")}
                      //
                    >
                      <FormControl>
                        <FormControlLabel
                          control={
                            <Radio
                              checked={discountType === "Discounted Price"}
                              // onClick={handleDiscountChange}
                              value="Discounted Price"
                              name="discount"
                            />
                          }
                          label="Discounted Price"
                        />
                      </FormControl>
                    </div>
                  </div>
                  {percentage && (
                    <div className={styles.percentageWrapper}>
                      <div className={styles.percentageTitle}>
                        <p>set discount percentage</p>
                      </div>
                      <div className={styles.percentageField}>
                        <Input
                          value={defaultPercentage}
                          onChange={(e) => {
                            e.target.value =
                              e.target.value < 1 ? 1 : e.target.value;
                            handleInputChange(e);
                          }}
                          onBlur={handleBlur}
                          inputProps={{
                            min: 0,
                            max: 100,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </div>
                      <div className={styles.percentageSlider}>
                        <Slider
                          value={
                            typeof defaultPercentage === "number"
                              ? defaultPercentage
                              : 0
                          }
                          onChange={handleSliderChange}
                          aria-labelledby="input-slider"
                        />
                      </div>
                    </div>
                  )}
                  {fixedPrice && (
                    <div className={styles.fixedPrice}>
                      <div className={styles.fixedPriceTitle}>
                        <p>fixed discounted price</p>
                      </div>
                      <div className={styles.fixedPriceField}>
                        <Input
                          variant="outlined"
                          name="fixedprice"
                          label="Fixed Discount Price"
                          value={fixedPriceDiscount}
                          onChange={(e) => {
                            e.target.value =
                              e.target.value < 1 ? 1 : e.target.value;
                            handleFixedPriceDiscount(e);
                          }}

                          // error={error.email ? true : false}
                          // helperText={error.email}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.finalPrice}>
                <h3>
                  final price :{" "}
                  {typeof productValue?.finalPrice === "number"
                    ? productValue?.finalPrice
                    : 0}
                </h3>
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
        <div className={styles.productBtn}>
          <div className={styles.productBtnWrapper}>
            <BaseButton variant="outlined" onClick={handleClick}>
              cancel
            </BaseButton>
            <BaseButton variant="contained" type="submit">
              {params?.id ? "Save" : "add product"}
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
              marginTop: 22,
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}
    </div>
  );
};

export default General;
