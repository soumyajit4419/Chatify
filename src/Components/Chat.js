import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  chat: {
    position: "relative",
    overflowY: "scroll",
    height: "calc(100vh - 175px)",
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingTop: "5px",
  },
  footer: {
    paddingRight: "25px",
    paddingLeft: "25px",
    paddingTop: "5px",
  },
  message: {
    width: "100%",
  },
  roomName: {
    border: "1px solid #0000002b",
    borderLeft: 0,
    borderRight: 0,
    padding: "15px",
  },
  roomNameText: {
    marginBlockEnd: 0,
    marginBlockStart: 0,
  },
}));

function Chat() {
  const classes = useStyles();
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    if (params.id) {
      db.collection("channels")
        .doc(params.id)
        .onSnapshot((snapshot) => {
          setChannelName(snapshot.data().channelName);
        });

      db.collection("channels")
        .doc(params.id)
        .collection("messages")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
  }, [params]);

  console.log(messages);

  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.roomName}>
        <h3 className={classes.roomNameText}>{channelName}</h3>
      </Grid>
      <Grid item xs={12} className={classes.chat}>
        <Messages></Messages>
        <Messages></Messages>
        <Messages></Messages>
        <Messages></Messages>
        <Messages></Messages>
        <Messages></Messages>
        <Messages></Messages>
        <Messages></Messages>
        <Messages></Messages>
      </Grid>

      <Grid item xs={12} className={classes.footer}>
        <TextField
          className={classes.message}
          required
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
      </Grid>
    </div>
  );
}

export default Chat;
