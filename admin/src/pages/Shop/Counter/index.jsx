import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Modal from "components/Modal";
import BasicDatePicker from "components/BasicDatePicker";
import Dropdown from "components/atoms/Dropdown";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { shopActions } from "redux/Shop/action";
import { useSelector, useDispatch } from "react-redux";
import { DateRange, DateRangePicker } from "react-date-range";
import BreadCrumb from "components/atoms/BreadCrumb";
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


function Counter() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { shops, shopCounters } = useSelector((state) => state.shop);
  // const [modalOpen, setModalOpen] = useState(false); 

  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  // const [personName, setPersonName] = React.useState([]);

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
    dispatch(shopActions.getOrders(datePicker[0]));
  };
  const [datePicker, setDatePicker] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "counterDate",
      headerName: "Counter Date",
      type: "date",
      width: 250,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      type: "number",
      width: 250,
    },
  ];


  const getDayLabels = (data, month) => {
    // console.log("data**************", data);
    let labels = [];
    let lastDate = new Date(data[0]?.counterDate).getDate();
    console.log("month", month);
    for (let i = 1; i <= lastDate; i++) {
      labels.push(i < 10 ? month + " 0" + i : month + " " + i);
    }
    return labels;
  };

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
    let lastMonth = new Date(data[0]?.counterDate).getMonth();
    console.log("lastMonth***",lastMonth);
    return monthsLabels.slice(0, lastMonth);
  };

  function getYearlySales(data, key) {
    let sales = [];
    console.log("data**", data);
    let lastMonth = new Date(data[0]?.counterDate).getMonth();
    for (let i = 0; i <= lastMonth + 1; i++) {
      let totalSales = 0;
      data.map((order) => {
        if (new Date(order?.counterDate).getMonth() === i) {
          totalSales += order[key];
        }
      });
      sales.push(totalSales);
    }

    console.log("sales",sales);
    return sales;
  }

  // const getMonthlyCounter = (data) => {
  //   let totalCounter = 0;
  //   data.map((data) => {
  //     if (new Date(data?.counterDate).getMonth() === new Date().getMonth()) {
  //       totalCounter += data?.totalAmount;
  //     }
  //   });
  //   return totalCounter;
  // };

  // const getYearlyCounter = (data) => {
  //   let totalCounter = 0;
  //   data.map((data) => {
  //     if (
  //       new Date(data?.counterDate).getFullYear() === new Date().getFullYear()
  //     ) {
  //       totalCounter += data?.totalAmount;
  //     }
  //   });
  //   return totalCounter;
  // };

  // const counters = shopCounters.map((counter) => {});
  // console.log("counters---------", counters);
  // Array to store sums for each date
  const sumsByDate = [];
  console.log("shopCounters****",shopCounters);
  // Loop through the array and calculate the sums for each date
  shopCounters.forEach((item) => {
    const index = sumsByDate.findIndex(
      (sum) =>
        new Date(sum.counterDate).getDate() ===
        new Date(item.counterDate).getDate()
    );
    console.log("index",index);
    if (index !== -1) {
      sumsByDate[index].totalAmount += item.totalAmount;
    } else {
      sumsByDate.push({
        counterDate: item.counterDate,
        totalAmount: item.totalAmount,
      });
    }
  });

  console.log("sumsByDate",sumsByDate);

  const rows = sumsByDate.map((data, i) => {
    return {
      id: i + 1,
      counterDate: new Date(data?.counterDate).toDateString(),
      totalAmount: data?.totalAmount,
    };
  });


  // Output the sums for each date
  // console.log("counters-----", sumsByDate);
  // console.log("rows-----", rows);
  // console.log("new Date(datePicker[0].startDate).getMonth()",new Date(datePicker[0].startDate).getMonth());
  // console.log("sumsByDate.map((counter) => counter.totalAmount)",sumsByDate.map((counter) => counter.totalAmount));
  const dataArray = {
    labels:
      new Date(datePicker[0].startDate).getMonth() + 1 ===
        new Date(datePicker[0].endDate).getMonth() + 1
        ? getDayLabels(sumsByDate, new Date(datePicker[0].startDate).toDateString().split(" ")[1])
        : getMonthLabels(rows),
    datasets: [
      {
        label: "Offline",
        data: new Date(datePicker[0].startDate).getMonth() + 1 ===
        new Date(datePicker[0].endDate).getMonth() + 1 ? sumsByDate.map((counter) => counter.totalAmount).reverse() : getYearlySales(rows, "totalAmount"),
        // state === "thisMonth"
        // ? shopCounters.map((counter)=>counter.totalAmount)
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
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    },
  };

  useEffect(() => {
    dispatch(shopActions.getShops());
    dispatch(
      shopActions.getShopCounters({
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
          Counters
        </Typography>
        <BreadCrumb
          parentElement="Home"
          childLink="/shop/counter"
          childElement="Shop"
          child2Link="/shop/counter"
          child2Element="Counters"
          data="Data"
        />
      </div>

      <Box className="">
        <Box className="miniHeader" sx={{ display: "flex", justifyContent: "end", width: "92%" }}>
          <div className="d-flex">
            <Dropdown
              label={"Select Shop"}
              menuItems={shopsMenuItems}
              style={{ minWidth: 160, background: "white", margin: "0px" }}
              defaultValue={"all"}
              onChange={(e) => {
                if (e.target.value === "all") {
                  // setShopId("");
                  dispatch(
                    shopActions.getShopCounters({
                      shopId: "",
                      startDate: new Date(2023, new Date().getMonth(), 1),
                      endDate: new Date(2023, new Date().getMonth(), 31),
                    })
                  );
                } else {
                  // setShopId(e.target.value);
                  dispatch(
                    shopActions.getShopCounters({
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
                background: "white"
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
                    shopActions.getShopCounters({
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
                background: "#fff"
              }}
            >
              <Bar options={config} data={dataArray} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ height: 830, width: "50%", my: "20px", mx: "auto", background: "#fff", px: 3 }}>
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

export default Counter;
