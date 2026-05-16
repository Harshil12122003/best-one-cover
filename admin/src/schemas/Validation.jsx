import * as Yup from 'yup'

// export const addProductSchema = Yup.object({
  // name: Yup.string().required("Please Enter the Name"),
  // desc: Yup.string().required("Please Enter the Description"),
  // brand: Yup.object().required('Please select the brand.'),
  // model: Yup.object().required("Please select the modal"),
  // category: Yup.object().required("Please select the category"),
  // coverBrand: Yup.string().required("Please Enter the Cover"),
  // color: Yup.string().required("Please Enter the color"),
  // qty: Yup.number().typeError("Quantity must be a number").min(1, "Quantity must be greater than or equal to 1").required("Please Select Quantity"),
  // price: Yup.number().typeError("Price must be a number").required("Please Enter the  price"),
  // images: Yup.mixed().required('File is required'),
// })

// export const addStockSchema = Yup.object({
//   brand: Yup.object().required('Please select the Mobile Brand.'),
//   model: Yup.object().required("Please select the Mobile Modal"),
//   category: Yup.object().required("Please select the Cover Category"),
//   coverBrand: Yup.object().required("Please Enter the CoverBrand"),
//   buyPrice: Yup.number().typeError("CostPrice must be a number").required("Please Enter the Costprice"),
//   qty: Yup.number().typeError("Quantity must be a number").min(1, "Quantity must be greater than or equal to 1").required("Please Select Quantity"),
//   color: Yup.string().required("Please Enter the color"),
//   images: Yup.mixed().required('File is required'),

// })

export const addShopSchema = Yup.object({
  email: Yup.string().email().required("Please Enter the Email."),
  shopName: Yup.string().required("Please Enter the Shop Name."),
  address: Yup.string().required("Please Enter the Address."),
  pincode: Yup.string().matches(/^\d{6}$/, 'Must be a 6 digit number').required("Please Enter the Pincode"),
  landmark: Yup.string().required("Please Enter the Landmark"),
  city: Yup.string().required("Please Enter the City"),
  state: Yup.string().required("Please Enter the State"),

})

export const editShopSchema = Yup.object({
  shopName: Yup.string().required("Please Enter the Shop Name."),
  address: Yup.string().required("Please Enter the Address."),
  pincode: Yup.string().matches(/^\d{6}$/, 'Must be a 6 digit number').required("Please Enter the Pincode"),
  landmark: Yup.string().required("Please Enter the Landmark"),
  city: Yup.string().required("Please Enter the City"),
  state: Yup.string().required("Please Enter the State"),

})

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please Enter the Email."),
  password : Yup.string().min(5).required("Please Enter the Password.")
})

export const editProfileSchema = Yup.object({
  fname: Yup.string().required("Please Enter the First Name"),
  lname: Yup.string().required("Please Enter the Last Name"),
  email: Yup.string().email().required("Please Enter the Email."),
  mobile : Yup.string().matches(/^\d{10}$/, 'Must be a 10 digit number').required("Please Enter the Mobile No.")
})


export const passwordSchema = Yup.object({
  oldPassword : Yup.string().min(5).required("Please Enter the Old Password."),
  newPassword : Yup.string().min(5).required("Please Enter the New Password."),
  cPassword : Yup.string().min(5).required("Please Enter the Confirm Password."),

})

export const editCategorySchema = Yup.object({
  category : Yup.string().required("Please Enter the Category."),
})
