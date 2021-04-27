import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import { db } from "../Firebase/Firebase";
import { useHistory } from "react-router-dom";
import { IoMdChatboxes } from "react-icons/io";
import { BiHash } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#3f51b5",
  },
}));

function Rooms() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [channelList, setChannelList] = useState([]);
  const history = useHistory();

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

  const goToChannel = (id) => {
    history.push(`/channel/${id}`);
  };

  const addChannel = () => {
    let cName = prompt("Enter New Channel Name");
    if (cName) {
      cName = cName.toLowerCase();
      for (var i = 0; i < channelList.length; i++) {
        if (cName === channelList[i].channelName) {
          alert(
            "Entered Channel Name Already Exits!! \n Please Enter A valid Name.."
          );
          return;
        }
      }
      db.collection("channels").add({ channelName: cName.toLowerCase() });
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
            <IoMdChatboxes className={classes.iconDesign} />
          </ListItemIcon>
          <ListItemText primary="CHANNELS" />
          {open ? (
            <ExpandLess color="primary" />
          ) : (
            <ExpandMore color="primary" />
          )}
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {channelList.map((channel) => (
              <ListItem
                key={channel.id}
                button
                className={classes.nested}
                onClick={() => goToChannel(channel.id)}
              >
                <ListItemIcon style={{ minWidth: "30px" }}>
                  <BiHash className={classes.iconDesign} />
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
