import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
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
    fontSize: "1.3em",
    fontWeight: "800",
  },
  chatTimming: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
    display: "inline-block",
    paddingLeft: "0.5em",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: "#3f51b5",
  },
}));

function Messages({ values }) {
  const classes = useStyles();
  const date = values.timestamp.toDate();

  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const time = `${day}-${month}-${year}   ${hour}:${minute}`;

  return (
    <Grid item xs={12}>
      <div className={classes.paper}>
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
          <div>{values.text}</div>
        </div>
      </div>
    </Grid>
  );
}

export default Messages;
