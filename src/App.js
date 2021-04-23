import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Application from "./Components/Application";
import Chat from "./Components/Chat";
import Login from "./Components/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState(true);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className={classes.root}>
            <Application />
            <main className={classes.content}>
              <div className={classes.toolbar} style={{ minHeight: "50px" }} />
              <Switch>
                <Route path="/" exact>
                  <h3>welcome</h3>
                </Route>
                <Route path="/channel/:id">
                  <Chat />
                </Route>
              </Switch>
            </main>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
