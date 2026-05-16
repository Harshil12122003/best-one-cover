import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Modal from "components/Modal";
import Dropdown from "components/atoms/Dropdown";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { shopActions } from "redux/Shop/action";
import { actions as orderAction } from "redux/Order/action";
import { actions as reportAction } from "redux/Reports/action";
import { useSelector, useDispatch } from "react-redux";
import { DateRange, DateRangePicker } from "react-date-range";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import "./SalesReport.css";
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
import moment from "moment";
import { downloadFile, preferredOrder } from "utils/downloadFile";
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

function ProfitLoss() {
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = React.useState(new Date());
  const { orders } = useSelector((state) => state.order);
  console.log("dateValue$$$$%%$%%%%%%%%%%", dateValue.$y);
  const { shops } = useSelector((state) => state.shop);
  const { sales, counters, profit } = useSelector((state) => state.report);
  // const [modalOpen, setModalOpen] = useState(false);
  const [shopId, setShopId] = useState("");

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
    // dispatch(actions.getOrders(state[0]));
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const labels = {
    monthsLabels: [
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
    ],
    daysLabels: ["01", "05", "10", "15", "20", "25", "31"],
    // selectedDays: []
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Month",
      type: "date",
      width: 200,
    },
    {
      field: "onlineProfit",
      headerName: "Online Profit",
      type: "number",
      width: 200,
    },
    {
      field: "offlineProfit",
      headerName: "Offline Profit",
      type: "number",
      width: 200,
    },
    {
      field: "totalProfit",
      headerName: "Total Profit",
      type: "number",
      width: 200,
    },
  ];

  const getMonth = (month) => {
    return labels.monthsLabels[month - 1];
  };

  const rows =
    profit?.totalProfit?.length > 0
      ? profit?.totalProfit.map((profitData, i) => {
        const dataArray =
          profit?.shopOrderProfit?.length > 0 &&
          profit?.shopOrderProfit.find((shopProfit) => {
            return shopProfit._id === profitData._id;
          });

        console.log("dfdhgk", dataArray);

        const data =
          profit?.orderProfit?.length > 0 &&
          profit?.orderProfit.find((onlineProfit) => {
            return onlineProfit._id === profitData._id;
          });

        return {
          id: i + 1,
          date: getMonth(profitData?._id),
          // salesDate: data?._id,
          month: profitData?._id,
          onlineProfit: data?.totalProfit ? data?.totalProfit : 0,
          offlineProfit: dataArray?.totalProfit ? dataArray?.totalProfit : 0,
          totalProfit: profitData?.totalProfit ? profitData?.totalProfit : 0,
        };
      })
      : [];

  const rowsOfShop =
    profit?.shopOrderProfit?.length > 0 &&
    profit?.shopOrderProfit.map((shopProfit, i) => {
      return {
        id: i + 1,
        date: getMonth(shopProfit?._id),
        month: shopProfit?._id,
        offlineProfit: shopProfit?.totalProfit ? shopProfit?.totalProfit : 0,
        totalProfit: shopProfit?.totalProfit ? shopProfit?.totalProfit : 0,
      };
    });

  useEffect(() => {
    dispatch(shopActions.getShops());
    dispatch(reportAction.getProfit({startDate: new Date("1 jan 2023"), endDate: new Date("31 dec 2023")}));
  }, [dispatch]);

  function getYearlySales(data, key) {
    let sales = [];
    for (let i = 1; i <= 12; i++) {
      let totalSales = 0;
      data.map((order) => {
        if (order?.month === i) {
          totalSales += order[key];
        }
      });
      sales.push(totalSales);
    }
    return sales;
  }

  // function getMonthlySales(data, month, key) {
  //   let sales = [];
  //   for (let i = 1; i <= 31; i++) {
  //     let totalSales = 0;
  //     data.map((order) => {
  //       if (
  //         new Date(order?.revenueDate).getDate() === i &&
  //         new Date(order?.revenueDate).getMonth() === month
  //       ) {
  //         totalSales += order[key];
  //       }
  //     });
  //     sales.push(totalSales);
  //   }
  //   return sales;
  // }

  const getDayLabels = (month) => {
    let labels = [];
    for (let i = 1; i <= 31; i++) {
      labels.push(i < 10 ? month + " 0" + i : month + " " + i);
    }
    return labels;
  };

  const dataArray = {
    labels: labels.monthsLabels,
    datasets: [
      {
        label: "Online",
        data: getYearlySales(rows, "onlineProfit"),
        backgroundColor: "rgb(94,53,177)",
      },
      {
        label: "Offline",
        data: getYearlySales(rows, "offlineProfit"),
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

  const downloadExcelFile = (data) => {
    const dataArrayCopy = structuredClone(data);
    let jsonData = dataArrayCopy.map((data) => {
      delete data.id;
      data.salesDate = data.salesDate
        ? moment(new Date(data.salesDate), "DD-MM-YYYY").format("DD-MM-YYYY")
        : "-";

      let restructureData = preferredOrder(data, [
        "revenueDate",
        "onlineRevenue",
        "offlineRevenue",
        "offlineSales",
        "totalRevenue",
      ]);
      return restructureData;
    });

    const Heading = [
      ["Revenue Date", "Online Revenue", "Offline Revenue", "Total Revenue"],
    ];

    downloadFile(jsonData, Heading, "Report.xlsx");
  };

  const columnsShops = structuredClone(columns);
  const dataArrayCopy = structuredClone(dataArray);
  dataArrayCopy.datasets = [dataArrayCopy.datasets[1]];
  columnsShops.splice(1, 1);

  return (
    <div style={{ paddingTop : "15px" }}>
      <div className="headingWithTitle">
        <Typography variant="h5" component="h2">
          Profit & Loss 
        </Typography>

        <BreadCrumb
          parentElement="Home"
          childLink="/report/profit-loss"
          childElement="Report"
          child2Link="/report/profit-loss"
          child2Element="Profit & Loss"
        />
      </div>

      <Box className="">
        <Box
          className="miniHeader"
          sx={{ display: "flex", justifyContent: "end" ,width: "95%" }}
        >
          <div className="d-flex">
            <div style={{ marginRight: '5px' }}>
              <Dropdown
                label={"Select Shop"}
                menuItems={shopsMenuItems}
                style={{ minWidth: 160, backgroundColor: 'white', margin: '0px' }}
                defaultValue={"all"}
                onChange={(e) => {
                  if (e.target.value === "all") {
                    setShopId("");
                    dispatch(reportAction.getProfit());
                  } else {
                    setShopId(e.target.value);
                    dispatch(
                      reportAction.getProfit({
                        shopId: e.target.value ? e.target.value : "",
                        startDate: new Date(`1 jan ${dateValue.$y ? dateValue.$y : "2023"}`),
                        endDate: new Date(`31 dec ${dateValue.$y ? dateValue.$y : "2023"}`),
                      })
                    );
                  }
                }}
              />
            </div>
            
    
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year"]}
                label="Year only"
                value={dateValue}
                style={{ backgroundColor: 'white' }}
                onChange={(newValue) => {
                  setDateValue(newValue);
                  dispatch(
                    reportAction.getProfit({
                      shopId: shopId,
                      startDate: new Date(`1 jan ${newValue.$y ? newValue.$y : "2023"}`),
                      endDate: new Date(`31 dec ${newValue.$y ? newValue.$y : "2023"}`),
                    })
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} size="small" sx={{ width: "40%" }} />
                )}
                minDate={new Date("1 jan 2010")}
                maxDate={new Date()}
              />
            </LocalizationProvider>
            
            
            {/* <Box
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
                    reportAction.getCounters({
                      shopId: shopId ? shopId : "",
                      startDate: state[0].startDate,
                      endDate: state[0].endDate,
                    })
                  );
                  dispatch(
                    reportAction.getSales({
                      startDate: state[0].startDate,
                      endDate: state[0].endDate,
                    })
                  );
                  setOpenDatePicker(false);
                }}
              >
                <DateRangePicker
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </Modal>
            )} */}
          </div>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: 5 }}
          justifyContent="center"
        >
          <Grid
            item
            xs={
              new Date(state[0].startDate).getMonth() ===
                new Date(state[0].endDate).getMonth()
                ? 10
                : 10
            }
            sx={{ textAlign: "center" }}
          >
            <Box
              sx={{
                padding: 3,
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                background : "#fff"
              }}
            >
              <Bar options={config} data={shopId ? dataArrayCopy : dataArray} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className="" sx={{ my: 3, width: "80%", mx: "auto" }}>
        <Box
          className="miniHeader"
          sx={{ display: "flex", justifyContent: "end" }}
        >
          {/* <div className="d-flex">
            <Dropdown
              label={"Select Shop"}
              menuItems={shopsMenuItems}
              style={{ minWidth: 160 }}
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
              >
                <DateRangePicker
                  editableDateInputs={true}
                  onChange={(item) => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </Modal>
            )}
          </div> */}

          {/* <Button
            variant="contained"
            startIcon={<InsertDriveFileOutlinedIcon />}
            onClick={() => {
              downloadExcelFile(rows);
            }}
          >
            Export Report
          </Button> */}
        </Box>
      </Box>

      <Box sx={{ height: 845, width: "75%",  my: "20px", mx: "auto", background: "#fff", px:3 }}>
        <DataGrid
          rows={shopId ? rowsOfShop : rows}
          columns={shopId ? columnsShops : columns}
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

export default ProfitLoss;
