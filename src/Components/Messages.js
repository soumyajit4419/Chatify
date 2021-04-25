import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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
}));

function Messages() {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <div className={classes.paper}>
        <div className={classes.avatar}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </div>
        <div className={classes.chat}>
          <div>
            <h6 className={classes.chatHeading}>dfdfdfdd</h6>
            <p className={classes.chatTimming}>11:36</p>
          </div>
          <div>
            e don't ever start a programming language thinking that we'll get
            this far. We almost start start a programming language because it's
            a hobby and we don't expect it to go anywhere. That's kind of how
            they started this Julia project. In Julia they broke a lot of new
            ground in terms of ease of use, performance, language design,
            tooling. he has always been working on Scientific Computing and
            thinking about how can one bring Computation and Sciences together.
            He started the Julia project with other collaborators which was a
            kind of a nights and weekends project. It was in collaboration with
            famous personalities from MIT and UC Sant Barbara colleague. Julia
            sits right in that mix, actually in the middle. So it's as fast to
            use as C or Fortran , it's as high performance as any of these but
            is as easy to use as Python or MATLAB for example. So, they wanted
            it to be as fast as C, as easy as Python, as good at Statistics as
            R, as good at string processing as PERL, as scalable as Hadoop or R.
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default Messages;
