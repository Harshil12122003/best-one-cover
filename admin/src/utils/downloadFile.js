import moment from "moment";
import { utils, writeFile } from "xlsx";

export function preferredOrder(obj, order) {
    var newObject = {};
    for (var i = 0; i < order.length; i++) {
      if (obj.hasOwnProperty(order[i])) {
        newObject[order[i]] = obj[order[i]];
      }
    }
    return newObject;
  }

export const downloadFile = (jsonData, Heading, filename) => {
    // const dataArrayCopy = structuredClone(dataArray);
    // let jsonData = dataArrayCopy.map((data) => {
    //     data.noOfProducts = data.orderItems.length;    
    //     data.paymentStatus = data.paymentInfo.status;    
    //     data.customerName = data.shippingInfo.name;    
    //     delete data.shippingInfo;
    //     delete data.orderItems;
    //     delete data.userId;
    //     delete data._id;
    //     delete data.paymentInfo;
    //     delete data.shippingDate;
    //     delete data.createdAt;
    //     delete data.updatedAt;
    //   data.orderDate = data.orderDate
    //     ? moment(new Date(data.orderDate), "DD-MM-YYYY").format("DD-MM-YYYY")
    //     : "-";


    //   let restructureData = preferredOrder(data, [
    //     "customerName",
    //     "noOfProducts",
    //     "itemsPrice",
    //     "taxPrice",
    //     "shippingPrice",
    //     "totalPrice",
    //     "paymentMethod",
    //     "orderStatus",
    //     "paymentStatus",
    //     "orderDate",
    //   ]);
    //   return restructureData;
    // });

    // const Heading = [
    //   [
    //     "Customer Name",
    //     "No of Products",
    //     "Items Price",
    //     "Tax Price",
    //     "Shipping Price",
    //     "Total",
    //     "Payment Method",
    //     "Order Status",
    //     "Payment Status",
    //     "Order Date",
    //   ],
    // ];
    // let filename = "Report.xlsx";
    var ws = utils.json_to_sheet(jsonData, {
      origin: "A2",
      skipHeader: true,
    });
    utils.sheet_add_aoa(ws, Heading, { origin: "A1" });
    var wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "People");

    writeFile(wb, filename, {
      type: "buffer",
      cellStyles: true,
    });
  };