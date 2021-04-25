import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CommentIcon from "@material-ui/icons/Comment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import AddIcon from "@material-ui/icons/Add";
import { db } from "../Firebase/Firebase";
import { useHistory, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Rooms() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [channelList, setChannelList] = useState([]);
  const history = useHistory();
  const routeMatch = useRouteMatch("/channel/:id");

  useEffect(() => {
    db.collection("channels")
      .orderBy("channelName", "asc")
      .onSnapshot((snapshot) => {
        setChannelList(
          snapshot.docs.map((channel) => ({
            channelName: channel.data().channelName,
            id: channel.id,
          }))
        );
      });

    if (routeMatch) {
      setSelectedIndex(routeMatch.params.id);
    }
  }, [routeMatch]);

  const handleClick = () => {
    setOpen(!open);
  };

  const goToChannel = (id) => {
    setSelectedIndex(id);
    history.push(`/channel/${id}`);
  };

  const addChannel = () => {
    let cName = prompt("Enter Channel Name");
    if (cName) {
      cName = cName.toUpperCase();
      for (var i = 0; i < channelList.length; i++) {
        if (cName === channelList[i].channelName) {
          alert("Name Already Exits, Please Enter A valid Name");
          return;
        }
      }
      db.collection("channels").add({ channelName: cName.toUpperCase() });
    }
  };

  return (
    <div>
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItemText primary="Create New Channel" />
        <IconButton edge="end" aria-label="add" onClick={addChannel}>
          <AddIcon color="primary" />
        </IconButton>
      </ListItem>
      <Divider />

      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <CommentIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Channels" />
          {open ? (
            <ExpandLess color="primary" />
          ) : (
            <ExpandMore color="primary" />
          )}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {channelList.map((channel, index) => (
              <ListItem
                key={channel.id}
                button
                className={classes.nested}
                selected={selectedIndex === channel.id}
                onClick={() => goToChannel(channel.id)}
              >
                <ListItemIcon>
                  <LabelImportantIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={channel.channelName} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </div>
  );
}

export default Rooms;
