import MainCard from "components/Cards/MainCard";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import Typography from "@mui/material/Typography";
import Dropdown from "components/atoms/Dropdown";
import { actions } from "redux/Stock/action";
import { useSelector, useDispatch } from "react-redux";
// import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { actions as customerActions } from "redux/Customers/action";
import { actions as orderActions } from "redux/Order/action";
import { actions as reportAction } from "redux/Reports/action";
import { shopActions } from "redux/Shop/action";
// import BasicList from "components/List";
import Chip from "@mui/material/Chip";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useNavigate } from "react-router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stocks } = useSelector((state) => state.stock);
  const { customers } = useSelector((state) => state.customer);
  const { orders } = useSelector((state) => state.order);
  const { sales, counters, revenueOffline, revenueOnline, profit } =
    useSelector((state) => state.report);
  const { shopCounters, expenses } = useSelector((state) => state.shop);

  const [datePicker, setDatePicker] = useState("");
  const [datePickerOfExpenseCounter, setDatePickerOfExpenseCounter] =
    useState("");
  const [datePickerOfRevenue, setDatePickerOfRevenue] = useState("");

  let dataCustomer = customers?.filter((customer) => {
    return new Date(customer.createdAt).getMonth() < new Date().getMonth();
  });

  // console.log("shopExpense", expenses);
  // console.log("counters===**", counters);
  // console.log("sales===***", sales);

  let customerData = {
    total: customers?.length,
    percentage: Math.floor(
      ((customers?.length - dataCustomer?.length) / dataCustomer?.length) * 100
    ),
  };

  customerData.percentage = 100;

  let dataOrder = orders?.filter((order) => {
    return new Date(order.orderDate).getMonth() < new Date().getMonth();
  });

  let orderData = {
    total: orders?.length,
    percentage: Math.floor(
      ((orders?.length - dataOrder?.length) / dataOrder?.length) * 100
    ),
  };

  let salesPer = 0;

  // sales?.map(
  //   (sale) =>
  //     new Date(sale._id).getMonth() < new Date().getMonth() &&
  //     (salesPer += sale?.totalSalesAmount)
  // );
  // console.log("sales===", sales);
  
  sales?.map((sale) => {
    if (new Date(sale._id).getMonth() < new Date().getMonth())
      return (salesPer += sale?.totalSalesAmount);
  });

  let salesData = {
    total: 0,
    percentage: 0,
  };
  sales?.map((sale) => {
    return (salesData.total += sale?.totalSalesAmount);
  });

  salesData.percentage = Math.floor(
    ((salesPer - salesData?.total) / salesData?.total) * 100
  );

  const menuDropDownItems = [
    { name: "This Month", value: "thisMonth" },
    { name: "This Year", value: "thisYear" },
  ];

  const rows = counters.map((counter, i) => {
    const data = sales.find((sale) => {
      // console.log("sale", sale);
      return (
        new Date(sale._id).getDate() === new Date(counter.counterDate).getDate()
      );
    });
    // console.log("data", data);

    return {
      id: i + 1,
      salesDate: new Date(counter.counterDate).toDateString(),
      // salesDate: data?._id,
      onlineSalesQty: data?.totalQty ? data?.totalQty : 0,
      onlineSales: data?.totalSalesAmount ? data?.totalSalesAmount : 0,
      offlineSales: counter?.totalAmount ? counter?.totalAmount : 0,
      totalAmount:
        (data?.totalSalesAmount ? data?.totalSalesAmount : 0) +
        (counter?.totalAmount ? counter?.totalAmount : 0),
    };
  });

  const rowsOfRevenue = revenueOffline.map((counter, i) => {
    const data = revenueOnline.find((sale) => {
      return (
        new Date(sale._id).getDate() === new Date(counter.counterDate).getDate()
      );
    });

    return {
      id: i + 1,
      salesDate: new Date(counter.counterDate).toDateString(),
      // salesDate: data?._id,
      onlineSalesQty: data?.totalQty ? data?.totalQty : 0,
      onlineSales: data?.totalSalesAmount ? data?.totalSalesAmount : 0,
      offlineSales: counter?.totalAmount ? counter?.totalAmount : 0,
      totalAmount:
        (data?.totalSalesAmount ? data?.totalSalesAmount : 0) +
        (counter?.totalAmount ? counter?.totalAmount : 0),
    };
  });

  function getYearlySales(data, key) {
    let sales = [];
    let lastMonth = new Date(data[0]?.salesDate).getMonth();
    for (let i = 0; i <= lastMonth; i++) {
      let totalSales = 0;
      data.map(
        (order) =>
          new Date(order?.salesDate).getMonth() === i &&
          (totalSales += order[key])
        // if (new Date(order?.salesDate).getMonth() === i) {
        //   totalSales += order[key];
        // }
      );
      sales.push(totalSales);
    }
    return sales;
  }

  function getMonthlySales(data, month, key) {
    let sales = [];
    let lastDate = new Date(data[0]?.salesDate).getDate();
    for (let i = 1; i <= lastDate; i++) {
      let totalSales = 0;
      data.map((order) => {
        if (
          new Date(order?.salesDate).getDate() === i &&
          new Date(order?.salesDate).getMonth() + 1 === month
        ) {
          console.log("order==", order);
          totalSales += order[key];
        }
        // if (
        //   new Date(order?.salesDate).getDate() === i &&
        //   new Date(order?.salesDate).getMonth() === month
        // ) {
        //   totalSales += order[key];
        // }
      });
      sales.push(totalSales);
    }
    console.log("sales===", sales);
    return sales;
  }

  const getDayLabels = (data, month) => {
    let labels = [];
    let lastDate = new Date().getDate();
    for (let i = 1; i <= lastDate; i++) {
      labels.push(i < 10 ? month + " 0" + i : month + " " + i);
    }
    return labels;
  };

  const getMonthLabels = (data, month) => {
    let monthsLabels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let lastMonth = new Date(data[0]?.salesDate).getMonth() + 1;
    return monthsLabels.slice(0, lastMonth);
  };

  const dataArray = {
    labels:
      datePicker === "thisMonth"
        ? getDayLabels(rows, new Date().toDateString().split(" ")[1])
        : getMonthLabels(rows),
    datasets: [
      {
        label: "Online",
        data:
          datePicker === "thisMonth"
            ? getMonthlySales(rows, new Date().getMonth() + 1, "onlineSales")
            : getYearlySales(rows, "onlineSales"),
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(94,53,177)",
        borderColor: "rgb(94,53,177)",
        borderWidth: 3,
      },
      {
        label: "Offline",
        data:
          datePicker === "thisMonth"
            ? getMonthlySales(rows, new Date().getMonth() + 1, "offlineSales")
            : getYearlySales(rows, "offlineSales"),
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(30,136,229)",
        borderColor: "rgb(30,136,229)",
        borderWidth: 3,
      },
    ],
  };

  const configLine = {
    type: "line",
    data: dataArray,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    },
  };

  const getMonthlyCounter = (data) => {
    let totalCounter = 0;
    data.map(
      (data) =>
        new Date(data?.counterDate).getMonth() === new Date().getMonth() &&
        (totalCounter += data?.totalAmount)
    );
    return totalCounter;
  };

  const getYearlyCounter = (data) => {
    let totalCounter = 0;
    data.map(
      (data) =>
        new Date(data?.counterDate).getFullYear() ===
        new Date().getFullYear() && (totalCounter += data?.totalAmount)
    );
    return totalCounter;
  };

  const getMonthlyExpense = (data) => {
    let totalExpense = 0;
    data.map(
      (data) =>
        new Date(data?.expenseDate).getMonth() === new Date().getMonth() &&
        (totalExpense += data.totalAmount)
    );

    return totalExpense;
  };
  const getYearlyExpense = (data) => {
    let totalExpense = 0;
    data.map(
      (data) =>
        new Date(data.expenseDate).getFullYear() === new Date().getFullYear() &&
        (totalExpense += data?.totalAmount)
    );
    return totalExpense;
  };

  const doughnutState = {
    labels: ["Expense", "Counter"],
    datasets: [
      {
        label: "# of Votes",
        data:
          datePickerOfExpenseCounter === "thisMonth"
            ? [getMonthlyExpense(expenses), getMonthlyCounter(shopCounters)]
            : [getYearlyExpense(expenses), getYearlyCounter(shopCounters)],
        backgroundColor: ["rgb(220,53,69)", "rgb(39,162,67)"],
        borderColor: ["rgb(189,19,37)", "rgb(53,181,40)"],
        // borderWidth: 1,
      },
    ],
  };

  const dataArrayOfRevenue = {
    labels:
      datePickerOfRevenue === "thisMonth"
        ? getDayLabels(rowsOfRevenue, new Date().toDateString().split(" ")[1])
        : getMonthLabels(rowsOfRevenue),
    datasets: [
      {
        label: "Online",
        data:
          datePickerOfRevenue === "thisMonth"
            ? getMonthlySales(
                rowsOfRevenue,
                new Date().getMonth() + 1,
                "onlineSales"
              )
            : getYearlySales(rowsOfRevenue, "onlineSales"),
        backgroundColor: "rgb(94,53,177)",
      },
      {
        label: "Offline",
        data:
          datePickerOfRevenue === "thisMonth"
            ? getMonthlySales(
                rowsOfRevenue,
                new Date().getMonth() + 1,
                "offlineSales"
              )
            : getYearlySales(rowsOfRevenue, "offlineSales"),
        backgroundColor: "rgb(30,136,229)",
      },
    ],
  };
  // const configBar = {
  //   type: "line",
  //   data: dataArrayOfRevenue,
  //   options: {
  //     responsive: true,
  //     // maintainAspectRatio: false,
  //     plugins: {
  //       legend: {
  //         position: "top",
  //       },
  //       title: {

  //         display: true,
  //         text: "Chart.js Line Chart",
  //       },
  //     },
  //   },
  // };

  let profitData = profit &&
    profit?.totalProfit?.length > 0 && {
    total: profit?.totalProfit[profit?.totalProfit?.length - 1]?.totalProfit
      ? profit?.totalProfit[profit?.totalProfit?.length - 1]?.totalProfit
      : 0,
    percentage: Math.floor(
      ((profit?.totalProfit[profit?.totalProfit?.length - 1]?.totalProfit -
        profit?.totalProfit[profit?.totalProfit?.length - 2]?.totalProfit) /
        profit?.totalProfit[profit?.totalProfit?.length - 2]?.totalProfit) *
      100
    ),
  };
  useEffect(() => {
    dispatch(actions.getStock());
    dispatch(customerActions.getCustomers());
    dispatch(orderActions.getOrders());
    dispatch(
      reportAction.getSales({
        startDate: new Date("1 jan 2023"),
        endDate: new Date("31 dec 2023"),
      })
    );
    dispatch(reportAction.getCounters({ shopId: "" }));
    dispatch(
      reportAction.getRevenue({
        shopId: "",
        startDate: new Date("1 jan 2023"),
        endDate: new Date("31 dec 2023"),
      })
    );
    dispatch(shopActions.getShopCounters({ shopId: "" }));
    dispatch(shopActions.getShopExpense({ shopId: "" }));

    dispatch(
      reportAction.getProfit({
        startDate: new Date("1 jan 2023"),
        endDate: new Date("31 dec 2023"),
      })
    );
    // dispatch(
    //   reportAction.getSales({
    //     startDate: new Date("1 mar 2023"),
    //     endDate: new Date("31 mar 2023")
    //   })
    // );
    // dispatch(
    //   reportAction.getCounters({
    //     shopId: "",
    //     startDate: new Date("1 mar 2023"),
    //     endDate: new Date("31 mar 2023")
    //   })
    // );
  }, [dispatch]);

  return (
    <>
      <div>
        <Box sx={{ width: "100%", my: 3 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <MainCard
                bgColor={"rgb(94,53,177)"}
                bgIconColor="rgb(69,39,160)"
                title="TOTAL SALES"
                icon={<ShoppingBasketIcon />}
                data={salesData}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <MainCard
                bgColor="rgb(30,136,229)"
                bgIconColor="rgb(21,101,192)"
                title="TOTAL EARNING"
                icon={<CurrencyRupeeIcon />}
                data={profitData}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <MainCard
                bgColor={"rgb(220,53,69)"}
                bgIconColor="rgb(189 19 37)"
                title="TOTAL ORDERS"
                icon={<ShoppingBagIcon />}
                data={orderData}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <MainCard
                bgColor={"rgb(39,162,67)"}
                bgIconColor="rgb(53 181 40)"
                title="TOTAL CUSTOMERS"
                icon={<PeopleIcon />}
                data={customerData}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ margin: 5 }}
          >
            <Grid item xs={12} lg={8}>
              <Box
                sx={{
                  padding: 3,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  background: "#fff"
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{}}>
                    <Typography
                      sx={{ fontSize: 20, color: "black", m: 0 }}
                      //   color="text.secondary"
                      gutterBottom
                    >
                      {datePicker !== "thisYear"
                        ? "Sales this Month"
                        : "Sales this Year"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Sales from online and offline store
                    </Typography>
                  </Box>
                  <Dropdown
                    label={"Choose Date"}
                    menuItems={menuDropDownItems}
                    variant="standard"
                    style={{ width: 120, minWidth: 120 }}
                    defaultValue={"thisYear"}
                    onChange={(e) => {
                      // console.log(e.target.value);
                      setDatePicker(e.target.value);
                      dispatch(
                        reportAction.getCounters({
                          shopId: "",
                          startDate:
                            e.target.value === "thisMonth"
                              ? new Date("1 apr 2023")
                              : new Date("1 jan 2023"),
                          endDate:
                            e.target.value === "thisMonth"
                              ? new Date("30 apr 2023")
                              : new Date("1 jan 2024"),
                        })
                      );

                      dispatch(
                        reportAction.getSales({
                          startDate:
                            e.target.value === "thisMonth"
                              ? new Date("1 apr 2023")
                              : new Date("1 jan 2023"),
                          endDate:
                            e.target.value === "thisMonth"
                              ? new Date("30 apr 2023")
                              : new Date("1 jan 2024"),
                        })
                      );
                    }}
                  />
                </Box>
                <Box sx={{
                
                }}>

                  <Line data={dataArray} options={configLine} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  padding: 3,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  background: "#fff"

                }}
              >
                <Box
                  sx={{
                    marginBottom: 5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{}}>
                    <Typography
                      sx={{ fontSize: 16, color: "black", m: 0 }}
                      //   color="text.secondary"
                      gutterBottom
                    >
                      Expense and Counter
                    </Typography>
                    {/* <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Expense and counter from offline store
                    </Typography> */}
                  </Box>
                  <Dropdown
                    label={"Choose Date"}
                    menuItems={menuDropDownItems}
                    variant="standard"
                    defaultValue={"thisYear"}
                    style={{ width: 120, minWidth: 120 }}
                    onChange={(e) => {
                      setDatePickerOfExpenseCounter(e.target.value);
                      dispatch(
                        shopActions.getShopCounters({
                          shopId: "",
                          startDate:
                            e.target.value === "thisMonth"
                              ? new Date("1 apr 2023")
                              : new Date("1 jan 2023"),
                          endDate:
                            e.target.value === "thisMonth"
                              ? new Date("30 apr 2023")
                              : new Date("1 jan 2024"),
                        })
                      );
                    }}
                  />
                </Box>
                <Box>
                  <Doughnut
                    data={doughnutState}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ margin: 5 }}
          >
            <Grid item xs={12} lg={4}>
              <Box
                sx={{
                  px : "20px",
                  pt : "20px",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  background: "#fff"

                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <Box sx={{}}>
                    <Typography
                      sx={{ fontSize: 20, color: "black", m: 0 }}
                      //   color="text.secondary"
                      gutterBottom
                    >
                      New Customer Joined
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Total {customers.length} Customers
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", cursor: "pointer" }}
                    onClick={() => navigate("/customers")}
                  >
                    <Typography
                      sx={{ fontSize: 14, marginRight: 1 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      View All
                    </Typography>
                    <ArrowForwardOutlinedIcon
                      color="text.secondary"
                      fontSize="small"
                    />
                  </Box>
                </Box>
                <Box>
                  {/* <BasicList /> */}
                  <List
                    sx={{
                      width: "100%",
                      // maxWidth: 360,
                    }}
                  >
                    {customers.map((listItem, i) => {
                      return (
                        i < 5 && (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <AccountCircleIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                listItem?.fname?.replace(/\b\w/g, (c) =>
                                  c.toUpperCase()
                                ) +
                                " " +
                                listItem?.lname?.replace(/\b\w/g, (c) =>
                                  c.toUpperCase()
                                )
                              }
                              secondary={listItem?.email}
                            />
                          </ListItem>
                        )
                      );
                    })}
                  </List>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Box
                sx={{
                  px : "20px",
                  py : "20px",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  background: "#fff"

                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{}}>
                    <Typography
                      sx={{ fontSize: 20, color: "black", m: 0 }}
                      //   color="text.secondary"
                      gutterBottom
                    >
                      Recent Stock
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Total {stocks.length} Items in the Stock
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", cursor: "pointer" }}
                    onClick={() => navigate("/stock")}
                  >
                    <Typography
                      sx={{ fontSize: 14, marginRight: 1 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      View All
                    </Typography>
                    <ArrowForwardOutlinedIcon
                      color="text.secondary"
                      fontSize="small"
                    />
                  </Box>
                </Box>
                <Box sx={{ width: "100%", marginTop: "10px" }}>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {/* <TableCell>Id</TableCell> */}
                          <TableCell>Brand</TableCell>
                          <TableCell>Model</TableCell>
                          <TableCell>Category</TableCell>
                          <TableCell align="right">Buying Price</TableCell>
                          {/* <TableCell align="right">Selling Price</TableCell> */}
                          <TableCell align="right">Qty</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stocks.map(
                          (row, i) =>
                            i < 5 && (
                              <TableRow
                                key={row._id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                {/* <TableCell component="th" scope="row">
                                {row._id}
                              </TableCell> */}
                                <TableCell component="th" scope="row">
                                  {row?.brand?.name?.replace(/\b\w/g, (c) =>
                                    c.toUpperCase()
                                  )}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {row?.model?.name?.replace(/\b\w/g, (c) =>
                                    c.toUpperCase()
                                  )}
                                </TableCell>
                                <TableCell>
                                  {row?.category?.name?.replace(/\b\w/g, (c) =>
                                    c.toUpperCase()
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  {row?.buyPrice}
                                </TableCell>
                                {/* <TableCell align="right">
                                  {row?.sellPrice}
                                </TableCell> */}
                                <TableCell align="right">{row?.qty}</TableCell>
                                <TableCell>
                                  {/* bgcolor: "rgb(226,246,240)", color: "green" */}
                                  <Chip
                                    label="In Stock"
                                    size="small"
                                    sx={{
                                      bgcolor: "rgb(254,242,225)",
                                      color: "orange",
                                      fontWeight: "bold",
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ margin: 5 }}
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: 3,
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  background: "#fff"

                }}
              >
                <Box
                  sx={{
                    marginBottom: 5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{}}>
                    <Typography
                      sx={{ fontSize: 20, color: "black", m: 0 }}
                      //   color="text.secondary"
                      gutterBottom
                    >
                      {datePickerOfRevenue !== "thisYear"
                        ? "Revenue this month"
                        : "Revenue this Year"}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Revenue from online and offline store
                    </Typography>
                  </Box>
                  <Dropdown
                    label={"Choose Date"}
                    menuItems={menuDropDownItems}
                    variant="standard"
                    defaultValue={"thisYear"}
                    style={{ width: 120, minWidth: 120 }}
                    onChange={(e) => {
                      setDatePickerOfRevenue(e.target.value);
                      dispatch(
                        reportAction.getRevenue({
                          shopId: "",
                          startDate:
                            e.target.value === "thisMonth"
                              ? new Date("1 apr 2023")
                              : new Date("1 jan 2023"),
                          endDate:
                            e.target.value === "thisMonth"
                              ? new Date("30 apr 2023")
                              : new Date("1 jan 2024"),
                        })
                      );
                    }}
                  />
                </Box>
                <Bar data={dataArrayOfRevenue} options={configLine} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Home;
