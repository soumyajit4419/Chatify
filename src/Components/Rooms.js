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

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function Rooms() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [channelList, setChannelList] = useState([]);

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
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const goToChannel = (index, id) => {
    setSelectedIndex(index);
    console.log(id);
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
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItemText primary="Add Channel" />
        <IconButton edge="end" aria-label="add" onClick={addChannel}>
          <AddIcon />
        </IconButton>
      </ListItem>

      <Divider />

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="Channels" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          {channelList.map((channel, index) => (
            <ListItem
              key={channel.id}
              button
              className={classes.nested}
              selected={selectedIndex === index}
              onClick={() => goToChannel(index, channel.id)}
            >
              <ListItemIcon>
                <LabelImportantIcon />
              </ListItemIcon>
              <ListItemText primary={channel.channelName} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}

export default Rooms;
