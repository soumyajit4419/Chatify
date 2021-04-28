import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    color: "#f0f0f0",
  },
  heading: {
    fontSize: "2.2em",
    fontWeight: "700",
  },
  subHeading: {
    fontSize: "1.6em",
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Typography component="h1" className={classes.heading}>
          Welcome to Chatify
        </Typography>
        <Typography component="h1" className={classes.subHeading}>
          Effortless live chat to hangout with friends!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Home;
