import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function BasicList({listItems}) {
  return (
    <List
      sx={{
        width: "100%",
        // maxWidth: 360,
      }}
    >
      {listItems.map((listItem, i) => {
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
                  listItem?.title?.replace(/\b\w/g, (c) => c.toUpperCase()) +
                  " " +
                  listItem?.subTitle?.replace(/\b\w/g, (c) => c.toUpperCase())
                }
                secondary={listItem?.email}
              />
            </ListItem>
          )
        );
      })}
    </List>
  );
}

export default BasicList;
