import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Messages from "./Messages";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import firebase from "firebase/app";

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
    display: "flex",
    paddingRight: "10px",
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
  const [allMessages, setAllMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [userNewMsg, setUserNewMsg] = useState("");

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
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setAllMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
  }, [params]);

  const sendMsg = (e) => {
    e.preventDefault();
    if (userNewMsg && params.id) {
      const userData = JSON.parse(localStorage.getItem("userDetails"));

      if (userData) {
        const displayName = userData.displayName;
        const imgUrl = userData.photoURL;

        const obj = {
          text: userNewMsg,
          timestamp: firebase.firestore.Timestamp.now(),
          userImg: imgUrl,
          userName: displayName,
        };

        db.collection("channels")
          .doc(params.id)
          .collection("messages")
          .add(obj);
      }

      setUserNewMsg("");
    }
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.roomName}>
        <h3 className={classes.roomNameText}>{channelName}</h3>
      </Grid>
      <Grid item xs={12} className={classes.chat}>
        {allMessages.map((message) => (
          <Messages key={message.id} values={message.data} />
        ))}
      </Grid>

      <Grid item xs={12} className={classes.footer}>
        <form
          autoComplete="off"
          style={{ width: "100%", display: "flex" }}
          onSubmit={(e) => sendMsg(e)}
        >
          <TextField
            className={classes.message}
            required
            id="outlined-basic"
            label="Enter Message"
            variant="outlined"
            value={userNewMsg}
            onChange={(e) => {
              setUserNewMsg(e.target.value);
            }}
          />
          <IconButton type="submit" color="primary" component="button">
            <SendIcon />
          </IconButton>
        </form>
      </Grid>
    </div>
  );
}

export default Chat;
