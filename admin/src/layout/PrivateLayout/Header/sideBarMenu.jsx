import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";


export const sidebarMenu = [
    {
      _id: 1,
      menuName: "dashboard",
      icon: <DashboardIcon />,
      navigate: "/",
    },
    {
      _id: 2,
      menuName: "product",
      icon: <ShoppingCartIcon />,
      subName: [
        {
          _id: 2.1,
          name: "add product",
          navigate: "/product/new",
        },
        {
          _id: 2.2,
          name: "show products",
          navigate: "/products",
        },
      ],
    },
    {
      _id: 3,
      menuName: "order",
      icon: <ListAltIcon />,
      subName: [
        {
          _id: 3.1,
          name: "customer orders",
          navigate: "/user/orders",
        },
        {
          _id: 3.2,
          name: "shop orders",
          navigate: "/shop/orders",
        },
      ],
    },
    {
      _id: 4,
      menuName: "stock",
      icon: <DashboardIcon />,
      subName: [
        {
          _id: 4.1,
          name: "add stock",
          navigate: "/stock/new",
        },
        {
          _id: 4.2,
          name: "show stocks",
          navigate: "/stocks",
        },
      ],
    },
    {
      _id: 5,
      menuName: "report",
      icon: <SummarizeIcon />,
      subName: [
        {
          _id: 5.1,
          name: "sales ",
          navigate: "/report/sales",
        },
        {
          _id: 5.2,
          name: "revenue ",
          navigate: "/report/revenue",
        },
        {
          _id: 5.3,
          name: "profit & loss ",
          navigate: "/report/profit-loss",
        },
      ],
    },
    {
      _id: 6,
      menuName: "user",
      icon: <ManageAccountsIcon />,
      subName: [
        {
          _id: 6.1,
          name: "show customers",
          navigate: "/customers",
        },
        {
          _id: 6.2,
          name: "show managers ",
          navigate: "/managers",
        },
      ],
    },
    {
      _id: 7,
      menuName: "shop",
      icon: <StoreIcon />,
      subName: [
        {
          _id: 7.1,
          name: "add shop",
          navigate: "/shop/new",
        },
        {
          _id: 7.2,
          name: "show shops",
          navigate: "/shops",
        },
        {
          _id: 7.3,
          name: "Counters",
          navigate: "/shop/counter",
        },
        {
          _id: 7.4,
          name: "Expenses",
          navigate: "/shop/expense",
        },
      ],
    },
  ];