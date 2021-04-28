import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { AiFillLike } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

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
    fontSize: "1rem",
    color: "rgb(255 195 54)",
  },
  allEmoji: {
    backgroundColor: "#2d2e31ba",
    borderRadius: "5px",
    paddingLeft: "2px",
    paddingRight: "2px",
    display: "flex",
  },
}));

function Messages({ values, id }) {
  // console.log(values.likes["dfdffdfdf"]);
  const classes = useStyles();
  const date = values.timestamp.toDate();

  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const time = `${day}/${month}/${year}   ${hour}:${minute}`;

  const [style, setStyle] = useState({ display: "none" });

  const heartClick = () => {
    console.log(`clicked heart on msg ${id}`);
  };

  const fireClick = () => {
    console.log(`clicked fire on msg ${id}`);
  };

  const likeClick = () => {
    console.log(`clicked like on msg ${id}`);
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
            </div>
          </div>
        </div>

        <div>dfdfd</div>
      </div>
    </Grid>
  );
}

export default Messages;
