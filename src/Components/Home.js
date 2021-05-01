import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "50px",
    paddingBottom: "25px",
    color: "#f0f0f0",
  },
  heading: {
    fontSize: "2.2em",
    fontWeight: "700",
  },
  subHeading: {
    fontSize: "1.6em",
  },
  channelDiv: {
    padding: "15px",
  },
  channelContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
  square: {
    height: "80px",
    width: "80px",
  },
  rootChannel: {
    height: "calc(100vh - 185px)",
    position: "relative",
    padding: "15px",
    overflowY: "scroll",
  },
  channelText: {
    paddingTop: "3px",
    fontSize: "1.2rem",
  },
}));

function Home() {
  const classes = useStyles();
  const [channels, setChannels] = useState([
    "Geberal",
    "Fun",
    "Donkey",
    "Monkey",
    "Elephant",
    "House",
    "Rent",
    "erer",
    "dss",
    "dss",
    "frer",
    "fdfddf",
    "dffdff",
  ]);
  return (
    <div style={{ backgroundColor: "#36393f" }}>
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

      <Grid container className={classes.rootChannel}>
        {channels.map((channel) => (
          <Grid item xs={6} md={3} className={classes.channelDiv}>
            <Card>
              <CardActionArea style={{ display: "flex" }}>
                <CardContent className={classes.channelContent}>
                  <Avatar variant="square" className={classes.square}>
                    {channel.substr(0, 1).toUpperCase()}
                  </Avatar>
                  <Typography className={classes.channelText}>
                    {channel}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
