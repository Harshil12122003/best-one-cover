import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Box, Typography } from "@mui/material";
import { actions } from "redux/Order/action";
import { useDispatch, useSelector } from "react-redux";
import shoppingBag from "assets/images/shopping-bag.png";
import store from "assets/images/store.png";


export default function Notification() {
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.order);

  React.useEffect(() => {
    dispatch(actions.getNotifications());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h5" component="h2">
          Notifications
        </Typography>

        <Box sx={{ textAlign: "center",  mx: "auto" }}>
          <List
            sx={{
              width: "100%",
              // maxWidth: 360,
              bgcolor: "background.paper",
              my: 3,
              boxShadow: "none"
            }}
          >
            {notifications?.length > 0 &&
              notifications?.map((notification) => {
                return (
                  <ListItem sx={{ my: 3 }}>
                    <ListItemAvatar>
                      <Avatar
                        alt={notification?._id}
                        src={ notification?.shop ? store : shoppingBag}
                        variant="rounded"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={notification?.message}
                      // secondary={timeAgo(
                      //   new Date(
                      //     notification?.time
                      //       ? notification?.time
                      //       : notification?.createdAt
                      //   )
                      // )}
                      secondary={new Date(
                        notification?.createdAt
                      ).toDateString()}
                    />
                  </ListItem>
                );
              })}

            {/* <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Work" secondary="Jan 7, 2014" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Vacation" secondary="July 20, 2014" />
          </ListItem> */}
          </List>
        </Box>
      </Box>
    </>
  );
}
