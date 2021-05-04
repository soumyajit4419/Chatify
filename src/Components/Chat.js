import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Messages from "./Messages";
import IconButton from "@material-ui/core/IconButton";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import firebase from "firebase/app";
import ScrollableFeed from "react-scrollable-feed";
import { BiHash } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { Picker } from "emoji-mart";
import { RiImageAddLine } from "react-icons/ri";
import FileUpload from "./FileUpload";
import "emoji-mart/css/emoji-mart.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  chat: {
    position: "relative",
    height: "calc(100vh - 180px)",
    paddingLeft: "10px",
    paddingBottom: "5px",
    paddingTop: "5px",
  },
  footer: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingTop: "5px",
  },
  message: {
    width: "100%",
    color: "white",
  },
  roomName: {
    border: "1px solid #0000004a",
    borderLeft: 0,
    borderRight: 0,
    padding: "15px",
    display: "flex",
    color: "#e5e5e5",
  },
  roomNameText: {
    marginBlockEnd: 0,
    marginBlockStart: 0,
    paddingLeft: "5px",
  },
  iconDesign: {
    fontSize: "1.5em",
    color: "#e5e5e5",
  },
  footerContent: {
    display: "flex",
    backgroundColor: "#40444b",
    borderRadius: "5px",
  },
  inputFile: {
    display: "none",
  },
}));

function Chat() {
  const classes = useStyles();
  const params = useParams();
  const [allMessages, setAllMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [userNewMsg, setUserNewMsg] = useState("");
  const [emojiBtn, setEmojiBtn] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [file, setFileName] = useState(null);

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
        const uid = userData.uid;
        const likeCount = 0;
        const likes = {};
        const fireCount = 0;
        const fire = {};
        const heartCount = 0;
        const heart = {};
        const postImg = null;
        const obj = {
          text: userNewMsg,
          timestamp: firebase.firestore.Timestamp.now(),
          userImg: imgUrl,
          userName: displayName,
          uid: uid,
          likeCount: likeCount,
          likes: likes,
          fireCount: fireCount,
          fire: fire,
          heartCount: heartCount,
          heart: heart,
          postImg: postImg,
        };

        db.collection("channels")
          .doc(params.id)
          .collection("messages")
          .add(obj);
      }

      setUserNewMsg("");
      setEmojiBtn(false);
    }
  };

  const addEmoji = (e) => {
    setUserNewMsg(userNewMsg + e.native);
  };

  const openModal = () => {
    setModalState(!modalState);
  };

  const handelFileUpload = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0]);
      openModal();
    }
    e.target.value = null;
  };

  return (
    <div className={classes.root}>
      {modalState ? <FileUpload setState={openModal} file={file} /> : null}
      <Grid item xs={12} className={classes.roomName}>
        <BiHash className={classes.iconDesign} />
        <h3 className={classes.roomNameText}>{channelName}</h3>
      </Grid>
      <Grid item xs={12} className={classes.chat}>
        <ScrollableFeed>
          {allMessages.map((message) => (
            <Messages
              key={message.id}
              values={message.data}
              msgId={message.id}
            />
          ))}
        </ScrollableFeed>
      </Grid>
      <div className={classes.footer}>
        <Grid item xs={12} className={classes.footerContent}>
          <input
            accept="image/*"
            className={classes.inputFile}
            id="icon-button-file"
            type="file"
            onChange={(e) => handelFileUpload(e)}
          />
          <label htmlFor="icon-button-file" style={{ paddingTop: "3px" }}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <RiImageAddLine style={{ color: "#b9bbbe" }} />
            </IconButton>
          </label>

          <IconButton
            color="primary"
            component="button"
            onClick={() => setEmojiBtn(!emojiBtn)}
          >
            <GrEmoji style={{ color: "#b9bbbe" }} />
          </IconButton>
          {emojiBtn ? <Picker onSelect={addEmoji} theme="dark" /> : null}

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
            <IconButton type="submit" component="button">
              <FiSend style={{ color: "#b9bbbe" }} />
            </IconButton>
          </form>
        </Grid>
      </div>
    </div>
  );
}

export default Chat;
