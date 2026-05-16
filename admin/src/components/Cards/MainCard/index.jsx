import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./MainCard.css";
import Avatar from "@mui/material/Avatar";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function MainCard({bgColor, bgIconColor, title, icon, data}) {
  const addCommas = (nStr) => {
    nStr += "";
    let x = nStr.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        width: 300,
        padding: 1,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: "12px",
        backgroundColor: bgColor,
        color: "#fff"
      }}
    >
      <CardContent style={{ paddingBottom: 0 }}>
        <Box className="mainCardContent">
          <div>
            <Typography
              sx={{ fontSize: 15 }}
            //   color="text.secondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              sx={{ fontSize: 27, fontWeight: "bold" }}
            //   color="text.dark"
              gutterBottom
            >
              { data?.total ? addCommas((data?.total).toString()) : "0"}
            </Typography>
          </div>
          <div>
            <Avatar
              //   alt="Remy Sharp"
              //   src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56, backgroundColor: bgIconColor }}
            >
              {/* <AttachMoneyIcon /> */}
              {icon}
            </Avatar>
          </div>
        </Box>
        <Box sx={{display: "flex"}}>
        {data?.percentage < 0 ? <ArrowDownwardIcon sx={{color: "#9e0000"}}/> : <ArrowUpwardIcon sx={{color: "#55d300"}}/>}  
          <Typography sx={{ fontSize: 17, color: data?.percentage < 0 ? "#9e0000" : "#55d300", marginLeft: .5  }} gutterBottom>
            {data?.percentage ? data?.percentage+"%" : "0%"}
            <Typography
              variant="span"
              sx={{ fontSize: 14, color: "#c8c8c8", marginLeft: 1 }}
              gutterBottom
            >
              since last month
            </Typography>
          </Typography>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default MainCard;
