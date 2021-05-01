import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { AiFillLike } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { db } from "../Firebase/Firebase";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    padding: "8px",
  },
  paper: {
    padding: "10px",
    "&:hover": {
      backgroundColor: "#33353b",
    },
  },
  avatar: {
    display: "inline-block",
    verticalAlign: "top",
  },
  chat: {
    display: "inline-block",
    paddingLeft: "1rem",
    width: "calc(100% - 50px)",
  },
  chatHeading: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    display: "inline-block",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
  },
  chatTimming: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    display: "inline-block",
    paddingLeft: "0.5em",
    color: "white",
  },
  chatText: {
    color: "#dcddde",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: "#3f51b5",
  },
  emojiDiv: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  emojiDivInner: {
    position: "absolute",
    right: 0,
    padding: "0 35px 0 32px",
  },
  emojiBtn: {
    fontSize: "1.1rem",
    color: "rgb(255 195 54)",
  },
  allEmoji: {
    backgroundColor: "#2d2e31ba",
    borderRadius: "5px",
    paddingLeft: "2px",
    paddingRight: "2px",
    display: "flex",
  },
  countEmojiBtn: {
    padding: "3px",
    borderRadius: "4px",
    fontSize: "0.8em",
    backgroundColor: "#ffffff4a",
    color: "#cacaca",
    paddingLeft: "5px",
    paddingRight: "5px",
    "&:hover": {
      backgroundColor: "#ffffff4a",
      color: "#e7e7e7",
    },
  },
}));

function Messages({ values, msgId }) {
  const [style, setStyle] = useState({ display: "none" });
  const classes = useStyles();

  const uid = JSON.parse(localStorage.getItem("userDetails")).uid;
  const messegerUid = values.uid;
  const date = values.timestamp.toDate();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const time = `${day}/${month}/${year}   ${hour}:${minute}`;

  const numLikes = values.likeCount;
  const numFire = values.fireCount;
  const numHeart = values.heartCount;

  const userLiked = values.likes[uid];
  const userFire = values.fire[uid];
  const userHeart = values.heart[uid];

  const channelId = useParams().id;

  const selectedLike = userLiked
    ? { color: "#8ff879", backgroundColor: "#545454" }
    : null;

  const selectedHeart = userHeart
    ? { color: "#ff527d", backgroundColor: "#545454" }
    : null;

  const selectedFire = userFire
    ? { color: "#ffc336", backgroundColor: "#545454" }
    : null;

  const heartClick = () => {
    const messageDoc = db
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .doc(msgId);
    if (userHeart) {
      return db
        .runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(messageDoc).then((doc) => {
            if (!doc) {
              console.log("doc not found");
              return;
            }

            let newHeartCount = doc.data().heartCount - 1;
            let newHeart = doc.data().heart ? doc.data().heart : {};
            newHeart[uid] = false;

            transaction.update(messageDoc, {
              heartCount: newHeartCount,
              heart: newHeart,
            });
          });
        })
        .then(() => {
          console.log("Disiked");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return db
        .runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(messageDoc).then((doc) => {
            if (!doc) {
              console.log("doc not found");
              return;
            }

            let newHeartCount = doc.data().heartCount + 1;
            let newHeart = doc.data().heart ? doc.data().heart : {};
            newHeart[uid] = true;

            transaction.update(messageDoc, {
              heartCount: newHeartCount,
              heart: newHeart,
            });
          });
        })
        .then(() => {
          console.log("Liked");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fireClick = () => {
    const messageDoc = db
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .doc(msgId);
    if (userFire) {
      return db
        .runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(messageDoc).then((doc) => {
            if (!doc) {
              console.log("doc not found");
              return;
            }

            let newFireCount = doc.data().fireCount - 1;
            let newFire = doc.data().fire ? doc.data().fire : {};
            newFire[uid] = false;

            transaction.update(messageDoc, {
              fireCount: newFireCount,
              fire: newFire,
            });
          });
        })
        .then(() => {
          console.log("Disiked");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return db
        .runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(messageDoc).then((doc) => {
            if (!doc) {
              console.log("doc not found");
              return;
            }

            let newFireCount = doc.data().fireCount + 1;
            let newFire = doc.data().fire ? doc.data().fire : {};
            newFire[uid] = true;

            transaction.update(messageDoc, {
              fireCount: newFireCount,
              fire: newFire,
            });
          });
        })
        .then(() => {
          console.log("Liked");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const likeClick = () => {
    const messageDoc = db
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .doc(msgId);
    if (userLiked) {
      return db
        .runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(messageDoc).then((doc) => {
            if (!doc) {
              console.log("doc not found");
              return;
            }

            let newLikeCount = doc.data().likeCount - 1;
            let newLikes = doc.data().likes ? doc.data().likes : {};
            newLikes[uid] = false;

            transaction.update(messageDoc, {
              likeCount: newLikeCount,
              likes: newLikes,
            });
          });
        })
        .then(() => {
          console.log("Disiked");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return db
        .runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(messageDoc).then((doc) => {
            if (!doc) {
              console.log("doc not found");
              return;
            }

            let newLikeCount = doc.data().likeCount + 1;
            let newLikes = doc.data().likes ? doc.data().likes : {};
            newLikes[uid] = true;

            transaction.update(messageDoc, {
              likeCount: newLikeCount,
              likes: newLikes,
            });
          });
        })
        .then(() => {
          console.log("Liked");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteMsg = (id) => {
    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .doc(id)
      .delete()
      .then((res) => {
        console.log("deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <div
        className={classes.paper}
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
        }}
        onMouseLeave={(e) => {
          setStyle({ display: "none" });
        }}
      >
        <div className={classes.avatar}>
          <Avatar
            alt={values.userName}
            src={values.userImg}
            className={classes.purple}
          />
        </div>

        <div className={classes.chat}>
          <div>
            <h6 className={classes.chatHeading}>{values.userName}</h6>
            <p className={classes.chatTimming}>{time}</p>
          </div>
          <div className={classes.chatText}>{values.text}</div>

          <div style={{ paddingTop: "5px", display: "flex" }}>
            {numLikes > 0 ? (
              <div style={{ padding: "3px" }}>
                <IconButton
                  component="span"
                  onClick={likeClick}
                  className={classes.countEmojiBtn}
                  style={selectedLike}
                >
                  <AiFillLike />
                  <div style={{ paddingLeft: "2px" }}>{numLikes}</div>
                </IconButton>
              </div>
            ) : null}

            {numFire > 0 ? (
              <div style={{ padding: "3px" }}>
                <IconButton
                  component="span"
                  onClick={fireClick}
                  className={classes.countEmojiBtn}
                  style={selectedFire}
                >
                  <AiFillFire />
                  <div style={{ paddingLeft: "2px" }}>{numFire}</div>
                </IconButton>
              </div>
            ) : null}

            {numHeart > 0 ? (
              <div style={{ padding: "3px" }}>
                <IconButton
                  component="span"
                  onClick={heartClick}
                  className={classes.countEmojiBtn}
                  style={selectedHeart}
                >
                  <AiFillHeart />
                  <div style={{ paddingLeft: "2px" }}>{numHeart}</div>
                </IconButton>
              </div>
            ) : null}
          </div>
        </div>

        <div className={classes.emojiDiv} style={style}>
          <div className={classes.emojiDivInner}>
            <div className={classes.allEmoji}>
              <IconButton
                component="span"
                style={{ padding: "4px" }}
                onClick={likeClick}
              >
                <AiFillLike className={classes.emojiBtn} />
              </IconButton>
              <IconButton
                component="span"
                style={{ padding: "4px" }}
                onClick={fireClick}
              >
                <AiFillFire className={classes.emojiBtn} />
              </IconButton>
              <IconButton
                component="span"
                style={{ padding: "4px" }}
                onClick={heartClick}
              >
                <AiFillHeart className={classes.emojiBtn} />
              </IconButton>
              {uid === messegerUid ? (
                <IconButton
                  component="span"
                  style={{ padding: "4px" }}
                  onClick={() => deleteMsg(msgId)}
                >
                  <AiFillDelete
                    className={classes.emojiBtn}
                    color="#c3c3c3f0"
                  />
                </IconButton>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default Messages;
