import Home from "./pages/Home";
import ErrorPage from "./pages/errorPage";
import CustomerOrders from "pages/Order/CustomerOrders";
import Customers from "pages/User/Customers";
import Stock from "pages/Stock/ShowStock";
import shopOrders from "pages/Order/ShopOrders";
import OrderDetails from "pages/Order/CustomerOrders/OrderDetails";
import ShopOrderDetails from "pages/Order/ShopOrders/OrderDetails";
import AddProduct from "pages/Product/AddProduct";
import Products from "./pages/Product/ShowProduct";
import Profile from "pages/Profile";
import AddStock from "pages/Stock/AddStock";
import AddShop from "pages/Shop/AddShop";
import Managers from "pages/User/BranchManagers";
import Counter from "pages/Shop/Counter";
import SalesReport from "pages/Reports/Sales";
import RevenueReport from "pages/Reports/Revenue";
import EditShop from "pages/Shop/EditShop";
import Shops from "pages/Shop/Shops";
import SignIn from "pages/Auth/SignIn";
import ForgotPassword from "pages/Auth/ForgotPassword";
import ResetPassword from "pages/Auth/ResetPassword";
import Expense from "pages/Shop/Expense";
import ProfitLossReport from "pages/Reports/Profit & Loss";
import Notification from "pages/Notification";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/signin",
    name: "signIn",
    component: SignIn,
    isPrivate: true,
    layout: "public",
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
    path: "/profile",
    name: "Profile",
    component: Profile,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/product/new",
    name: "addProducts",
    component: AddProduct,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/product/:id",
    name: "editProducts",
    component: AddProduct,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/user/orders",
    name: "Orders",
    component: CustomerOrders,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/shop/orders",
    name: "Shop Orders",
    component: shopOrders,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/shop/order/:orderId",
    name: "Shop Order Details",
    component: ShopOrderDetails,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/user/order/:orderId",
    name: "Order Details",
    component: OrderDetails,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/stock/new",
    name: "addStock",
    component: AddStock,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/stock/:id",
    name: "editStock",
    component: AddStock,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/stocks",
    name: "Stock",
    component: Stock,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/customers",
    name: "Customers",
    component: Customers,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/managers",
    name: "Managers",
    component: Managers,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/shop/new",
    name: "addShop",
    component: AddShop,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/shops",
    name: "Shops",
    component: Shops,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/shop/:id",
    name: "editShops",
    component: EditShop,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/shop/counter",
    name: "Shops Counter",
    component: Counter,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/shop/expense",
    name: "Shops Expense",
    component: Expense,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/report/sales",
    name: "Sales Report",
    component: SalesReport,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/report/revenue",
    name: "Revenue Report",
    component: RevenueReport,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/report/profit-loss",
    name: "Revenue Report",
    component: ProfitLossReport,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notification,
    isPrivate: true,
    layout: "private",
  },
  {
    path: "*",
    name: "Error",
    component: ErrorPage,
    isPrivate: false,
    layout: "private",
  },
];

export default routes;
