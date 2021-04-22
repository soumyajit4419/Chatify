import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  chat: {
    position: "relative",
    overflowY: "scroll",
    height: "calc(100vh - 185px)",
    paddingLeft: "25px",
    paddingBottom: "10px",
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
  const list = [];
  for (var i = 1; i <= 100; i++) {
    list.push("hello");
  }
  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.roomName}>
        <h3 className={classes.roomNameText}>Room Name</h3>
      </Grid>
      <Grid item xs={12} className={classes.chat}>
        {/* {list.map((item) => (
          <li>{item}</li>
        ))} */}
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
