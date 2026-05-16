import Home from "./pages/home";
import Profile from "pages/Profile";
import Checkout from "pages/Checkout";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Products from "pages/products/Products";
import Cart from "pages/Cart";
import ProductDetails from "pages/ProductDetails/ProductDetails";
import CartEmpty from "pages/Cart/CartEmpty";
import OrdersEmpty from "pages/Orders/OrdersEmpty";
import Orders from "pages/Orders";
import ForgotPassword from "pages/Auth/ForgotPassword";
import ResetPassword from "pages/Auth/ResetPassword";
import ProductsCategory from "pages/products/ProductsCategory";
import AboutUs from "pages/AboutUs";
import ContactUs from "pages/ContactUs";
import ShippingPolicy from "pages/ShippingPolicy";
import TearmCondition from "pages/TearmCondition";
import PrivatePolicy from "pages/PrivatePolicy";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/contactus",
    name: "ContactUs",
    component: ContactUs,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivatePolicy,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/terms-conditions",
    name: "TearmCondition",
    component: TearmCondition,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/shipping-policy",
    name: "ShippingPolicy",
    component: ShippingPolicy,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/cartempty",
    name: "CartEmpty",
    component: CartEmpty,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/orderempty",
    name: "OrderEmpty",
    component: OrdersEmpty,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    isPrivate: false,
    layout: "auth",
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUp,
    isPrivate: false,
    layout: "auth",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword,
    isPrivate: true,
    layout: "public",
  },
  {
    path: "/password-reset/:userId/:token",
    name: "Reset Password",
    component: ResetPassword,
    isPrivate: true,
    layout: "public",
  },
  {
    path: "/products/:brand/:model",
    name: "Products",
    component: Products,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/products/:keyword",
    name: "Products",
    component: Products,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/products/category/:category",
    name: "Products Category",
    component: ProductsCategory,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/product/:id",
    name: "Product",
    component: ProductDetails,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "*",
    name: "Error",
    component: Home,
    isPrivate: false,
    layout: "private",
  },
];

export default routes;
