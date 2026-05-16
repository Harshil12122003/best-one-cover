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
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import "./SalesReport.css";
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
import {  Bar } from "react-chartjs-2";
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

function Sales() {
  const dispatch = useDispatch();
  // const { orders } = useSelector((state) => state.order);
  const { shops } = useSelector((state) => state.shop);
  const { sales, counters } = useSelector((state) => state.report);
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

  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: "selection",
  //   },
  // ]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "salesDate",
      headerName: "Sales Date",
      type: "date",
      width: 180,
    },
    {
      field: "onlineSalesQty",
      headerName: "Online Sales Qty",
      type: "number",
      width: 180,
    },
    {
      field: "onlineSales",
      headerName: "Online Sales",
      type: "number",
      width: 180,
    },
    {
      field: "offlineSales",
      headerName: "Offline Sales",
      type: "number",
      width: 200,
    },

    {
      field: "totalAmount",
      headerName: "Total Sales",
      type: "number",
      width: 200,
    },
  ];

  const rows = counters.map((counter, i) => {
    const data = sales.find((sale) => {
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

  const rowsOfShop = counters.map((counter, i) => {
    return {
      id: i + 1,
      salesDate: new Date(counter.counterDate).toDateString(),
      // salesDate: data?._id,
      offlineSales: counter?.totalAmount ? counter?.totalAmount : 0,
      totalAmount: counter?.totalAmount,
    };
  });

  // const rows = counters.map((data, i) => {
  //   return {
  //     id: i + 1,
  //     salesDate: data?.counterDate,
  //     totalAmount: data?.totalAmount,
  //   };
  // });

  useEffect(() => {
    dispatch(shopActions.getShops());
    dispatch(reportAction.getSales());
    dispatch(reportAction.getCounters({ shopId: shopId ? shopId : "" }));
  }, []);

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

  function getYearlySales(data, key) {
    let sales = [];
    for (let i = 1; i <= 12; i++) {
      let totalSales = 0;
      data.map((order) => {
        if (new Date(order?.salesDate).getMonth() === i) {
          totalSales += order[key];
        }
      });
      sales.push(totalSales);
    }
    return sales;
  }

  function getMonthlySales(data, month, key) {
    let sales = [];
    for (let i = 1; i <= 31; i++) {
      let totalSales = 0;
      data.map((order) => {
        if (
          new Date(order?.salesDate).getDate() === i &&
          new Date(order?.salesDate).getMonth() === month
        ) {
          totalSales += order[key];
        }
      });
      sales.push(totalSales);
    }
    return sales;
  }

  const getDayLabels = (month) => {
    let labels = [];
    for (let i = 1; i <= 31; i++) {
      labels.push(i < 10 ? month + " 0" + i : month + " " + i);
    }
    return labels;
  };

  const dataArray = {
    labels:
      new Date(state[0].startDate).getMonth() ===
      new Date(state[0].endDate).getMonth()
        ? getDayLabels(new Date(state[0].endDate).toDateString().split(" ")[1])
        : labels.monthsLabels,
    datasets: [
      {
        label: "Online",
        data:
          new Date(state[0].startDate).getMonth() ===
          new Date(state[0].endDate).getMonth()
            ? getMonthlySales(
                rows,
                new Date(state[0].startDate).getMonth(),
                "onlineSales"
              )
            : getYearlySales(rows, "onlineSales"),
        backgroundColor: "rgb(94,53,177)",
      },
      {
        label: "Offline",
        data:
          new Date(state[0].startDate).getMonth() ===
          new Date(state[0].endDate).getMonth()
            ? getMonthlySales(
                rows,
                new Date(state[0].startDate).getMonth(),
                "offlineSales"
              )
            : getYearlySales(rows, "offlineSales"),
        backgroundColor: "rgb(30,136,229)",
      },
    ],
  };

  const config = {
    // type: "bar",
    data: dataArray,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
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
        "salesDate",
        "onlineSalesQty",
        "onlineSales",
        "offlineSales",
        "totalAmount",
      ]);
      return restructureData;
    });

    const Heading = [
      [
        "Sales Date",
        "Online Sales Qty",
        "Online Sales",
        "Offline Sales",
        "Total Sales",
      ],
    ];

    downloadFile(jsonData, Heading, "Report.xlsx");
  };

  const columnsShops = structuredClone(columns);
  const dataArrayCopy = structuredClone(dataArray);
  dataArrayCopy.datasets = [dataArrayCopy.datasets[1]];
  columnsShops.splice(1, 2);

  return (
    <div style={{ paddingTop : "15px" }}>
      <div className="headingWithTitle">
        <Typography variant="h5" component="h2">
          Sales 
        </Typography>

        <BreadCrumb
          parentElement="Home"
          childLink="/report/sales"
          childElement="Report"
          child2Link="/report/sales"
          child2Element="Sales"
          data="Data"
        />
      </div>

      <Box className="">
        <Box className="miniHeader" sx={{ display: "flex", justifyContent: "end" , width: "92%" }}>
          <div className="d-flex">
            <Dropdown
              label={"Select Shop"}
              menuItems={shopsMenuItems}
              defaultValue={"all"}
              style={{ minWidth: 160, backgroundColor: 'white', margin: '0px' }}
              onChange={(e) => {
                if (e.target.value === "all") {
                  setShopId("");
                  dispatch(reportAction.getCounters());
                } else {
                  setShopId(e.target.value);
                  dispatch(
                    reportAction.getCounters({
                      shopId: e.target.value ? e.target.value : "",
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
                background : "White" 
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
                onClick={()=>{
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
                  setOpenDatePicker(false)
                }}
              >
                <DateRangePicker
                  editableDateInputs={true}
                  onChange={(item) => {
                    setState([item.selection]);
                    // dispatch(
                    //   reportAction.getCounters({
                    //     shopId: shopId ? shopId : "",
                    //     startDate: item.selection.startDate,
                    //     endDate: item.selection.endDate,
                    //   })
                    // );
                    // dispatch(
                    //   reportAction.getSales({
                    //     startDate: item.selection.startDate,
                    //     endDate: item.selection.endDate,
                    //   })
                    // );
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                />
              </Modal>
            )}
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
        <Box className="miniHeader" sx={{ display: "flex", justifyContent: "end" }}>
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

          <Button
            variant="contained"
            startIcon={<InsertDriveFileOutlinedIcon />}
            onClick={() => {
              downloadExcelFile(rows);
            }}
            sx={{ textAlign: "end" }}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: 830, width: "83%",  my: "20px", mx: "auto", background: "#fff", px:3  }}>
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

export default Sales;
