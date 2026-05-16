import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "components/Modal";
// import BasicDatePicker from "components/BasicDatePicker";
import Dropdown from "components/atoms/Dropdown";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { shopActions } from "redux/Shop/action";
import { useSelector, useDispatch } from "react-redux";
import { DateRangePicker } from "react-date-range";
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
import { Bar } from "react-chartjs-2";
import BreadCrumb from "components/atoms/BreadCrumb";
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

function Expense() {
  const dispatch = useDispatch();
  // const { orders } = useSelector((state) => state.order);
  const { shops, expenses } = useSelector((state) => state.shop);

  // const [modalOpen, setModalOpen] = useState(false);

  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  // const [personName, setPersonName] = React.useState([]);

  console.log("expenses", expenses);

  let shopsMenuItems =
    shops &&
    shops?.map((shop) => {
      return {
        name: shop?.shopName.replace(/\b\w/g, (c) => c.toUpperCase()),
        value: shop?._id,
      };
    });

  shopsMenuItems = [{ name: "All Shops", value: "all" }, ...shopsMenuItems];
  const handleDate = () => {
    dispatch(
      shopActions.getShopExpense({
        shopId: "",
        // startDate: new Date(2023, new Date().getMonth(), 1),
        // endDate: new Date(2023, new Date().getMonth(), 31),
      })
    );
  };
  const [datePicker, setDatePicker] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 230,
    // },
    {
      field: "expenseDate",
      headerName: "Expense Date",
      width: 240,
    },
    {
      field: "expenseType",
      headerName: "Expense Type",
      width: 300,
    },
    {
      field: "expenseAmount",
      headerName: "Expense Amount",
      width: 220,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 200,
    },
  ];

  const getDayLabels = (data, month) => {
    console.log("data**************", data);
    let labels = [];
    let lastDate = new Date(data[0]?.expenseDate).getDate();
    // let lastDate = new Date().getDate();

    for (let i = 1; i <= lastDate; i++) {
      labels.push(i < 10 ? month + " 0" + i : month + " " + i);
    }
    return labels;
  };

  // const rowOfExpense = expenses.map((item) => {
  //   const sumsDate = [];
  //   console.log('item', item)
  //   const index = sumsDate.findIndex(
  //     (sum) =>
  //       new Date(sum.expenseDate).getDate() ===
  //       new Date(item.expenseDate).getDate()
  //   );
  //   console.log("index", index);
  //   if (index !== -1) {
  //     sumsDate[index].totalExpense += item.totalAmount;
  //   } else {
  //     sumsDate.push({
  //       expenseDate: item.expenseDate,
  //       totalExpense: item.totalAmount,
  //     });
  //   }
  //   // console.log("sumsDate", sumsDate);
  //   return sumsDate;
  // });

  // console.log('rowOfExpense', rowOfExpense)

  const sumsByDate = [];
  expenses.forEach((item) => {
    // console.log("item", item);
    const index = sumsByDate.findIndex(
      (sum) =>
        new Date(sum.expenseDate).getDate() ===
        new Date(item.expenseDate).getDate()
    );

    if (index !== -1) {
      sumsByDate[index].totalExpense += item.totalAmount;
    } else {
      sumsByDate.push({
        expenseDate: item.expenseDate,
        totalExpense: item.totalAmount,
      });
    }
  });

  console.log("sumsByDate===", sumsByDate);

  const rows =
    expenses != null &&
    expenses?.length > 0 &&
    expenses?.map((data) => {
      return {
        id: data?._id,
        shop: data?.shop,
        // expense: typeValue,
        expenseType: data?.expense?.map((types) => {
          return types.type;
        }),
        expenseAmount: data?.expense?.map((amounts) => {
          return amounts.amount;
        }),
        expenseDate: new Date(data?.expenseDate).toDateString(),
        totalAmount: data?.totalAmount,
      };
    });

  let totalExpense = [];
  getDayLabels(
    rows,
    new Date(datePicker[0].startDate).toDateString().split(" ")[1]
  ).forEach((data, i) => {
    let findData = sumsByDate.find(
      (expense) => i + 1 === new Date(expense.expenseDate).getDate()
    );

    if (findData) {
      totalExpense.push(findData.totalExpense);
    } else {
      totalExpense.push(0);
    }
  });
  console.log(totalExpense);
  console.log("Called",new Date(datePicker[0].startDate).getMonth() + 1);

  const getMonthLabels = (data, month) => {
    console.log(data);
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
    let lastMonth = new Date(data[0]?.expenseDate).getMonth();
    console.log("lastMonth***",lastMonth);
    return monthsLabels.slice(0, lastMonth + 1);
  };

  function getYearlySales(data, key) {
    let sales = [];
    let lastMonth = new Date(data[0]?.expenseDate).getMonth();
    for (let i = 0; i <= lastMonth + 1; i++) {
      let totalSales = 0;
      data.map((order) => {
        if (new Date(order?.expenseDate).getMonth() === i) {
          totalSales += order[key];
        }
      });
      sales.push(totalSales);
    }

    console.log("sales",sales);
    return sales;
  }

  const dataArray = {
    labels:
      // new Date(datePicker[0].startDate).getMonth() ===
      // new Date(datePicker[0].endDate).getMonth()
      //   ? getDayLabels(rows, new Date().toDateString().split(" ")[1])
      //   : getMonthLabels(rows),
      new Date(datePicker[0].startDate).getMonth() + 1 ===
        new Date(datePicker[0].endDate).getMonth() + 1 ?
      getDayLabels(
        rows,
        new Date(datePicker[0].startDate).toDateString().split(" ")[1]
      ) : getMonthLabels(rows),
    datasets: [
      {
        label: "Offline",
        // data: sumsByDate.map((expense) => expense.totalExpense),
        data: new Date(datePicker[0].startDate).getMonth() + 1 ===
        new Date(datePicker[0].endDate).getMonth() + 1  ?   totalExpense : getYearlySales(rows, "totalAmount"),
        backgroundColor: "rgb(30,136,229)",
      },
    ],
  };

  const config = {
    type: "line",
    data: dataArray,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  };

  useEffect(() => {
    dispatch(shopActions.getShops());
    dispatch(
      shopActions.getShopExpense({
        shopId: "",
        startDate: new Date(2023, new Date().getMonth(), 1),
        endDate: new Date(),
      })
    );
    // dispatch(reportAction.getCounters({ shopId: "" }));
  }, [dispatch]);

  return (
    <div style={{ paddingTop: "15px" }}>
      <div className="headingWithTitle">
        <Typography variant="h5" component="h2">
          Expenses
        </Typography>

        <BreadCrumb
          parentElement="Home"
          childLink="/shop/expense"
          childElement="Shop"
          child2Link="/shop/expense"
          child2Element="Expenses"
          data="Data"
        />
      </div>  

      <Box className="">
        <Box
          className="miniHeader"
          sx={{ display: "flex", justifyContent: "end",width: "92%" }}
        >
          <div className="d-flex">
            <Dropdown
              label={"Select Shop"}
              menuItems={shopsMenuItems}
              defaultValue={"all"}
              style={{ minWidth: 160 , background: "white", margin: "0px" }}
              onChange={(e) => {
                if (e.target.value === "all") {
                  // setShopId("");
                  dispatch(
                    shopActions.getShopExpense({
                      shopId: "",
                      startDate: new Date(2023, new Date().getMonth(), 1),
                      endDate: new Date(2023, new Date().getMonth(), 31),
                    })
                  );
                } else {
                  // setShopId(e.target.value);
                  dispatch(
                    shopActions.getShopExpense({
                      shopId: e.target.value,
                      startDate: new Date(2023, new Date().getMonth(), 1),
                      endDate: new Date(2023, new Date().getMonth(), 31),
                    })
                  );
                }
              }}
            />
            <Box
              variant="outlined"
              sx={{
                border: "1px solid #BCBCBC",
                p: 1.1,
                mx: 0.5,
                cursor: "pointer",
                borderRadius: 1,
                color: "gray",
                fontSize: 14,
                fontWeight: 300,
                background: "#fff" 
              }}
              size="large"
              onClick={(e) => {
                setOpenDatePicker(true);
                console.log("Clicked");
              }}
            >
              Pick Date Range - DD/MM/YY
            </Box>
            {openDatePicker && (
              <Modal
                open={openDatePicker}
                setOpen={setOpenDatePicker}
                handleDate={handleDate}
                onClick={() => {
                  dispatch(
                    shopActions.getShopExpense({
                      shopId: "",
                      startDate: datePicker[0].startDate,
                      endDate: datePicker[0].endDate,
                    })
                  );
                  setOpenDatePicker(false);
                }}
              >
                <DateRangePicker
                  editableDateInputs={true}
                  onChange={(item) => setDatePicker([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={datePicker}
                />
              </Modal>
            )}
          </div>

          {/* <Button
            variant="contained"
            startIcon={<InsertDriveFileOutlinedIcon />}
            // onClick={() => {
            //   downloadExcelFile();
            // }}
          >
            Export Report
          </Button> */}
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 5, marginTop: 2 }}
          justifyContent="center"
        >
          <Grid item xs={10} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                padding: 3,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                background : "#fff"

              }}
            >
              <Bar options={config} data={dataArray} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ height: 830, width: "83%", my: "20px",mx: "auto", background: "#fff",px:3 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          //   checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          rowHeight={72}
          sx={{
            // boxShadow: 2,
            border: 0,
          }}
        />
      </Box>
    </div>
  );
}

export default Expense;
