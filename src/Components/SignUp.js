import React from "react";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import loginImg from "../Assets/login.png";
import Topography from "@material-ui/core/Typography";
import { auth, provider } from "../Firebase/Firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#23272a",
    boxShadow: "0 0 15px rgb(0 0 0 / 58%)",
    color: "white",
  },
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "25px",
    paddingTop: "35px",
  },
  mainImg: {
    width: "100%",
    height: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#d9d9d9",
  },
}));

function SignUp() {
  const classes = useStyles();

  const login = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="div" maxWidth="xs" className={classes.root}>
      <div className={classes.paper}>
        <img src={loginImg} className={classes.mainImg} alt="signup img" />
        <Topography variant="h5" style={{ paddingTop: "15px" }}>
          Sign In To Soumyajit's Chatify
        </Topography>
        <Button
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<FcGoogle />}
          onClick={login}
        >
          Sign In With Google
        </Button>
      </div>
    </Container>
  );
}

export default SignUp;
