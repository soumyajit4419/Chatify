import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { storage } from "../Firebase/Firebase";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../Firebase/Firebase";

const useStyles = makeStyles((theme) => ({
  displayImage: {
    height: "105px",
    width: "180px",
  },
  imageName: {
    paddingLeft: "15px",
    fontSize: "1.3em",
  },
  imageDiv: {
    marginLeft: "16px",
    marginRight: "16px",
    marginTop: "-33px",
  },
}));

function FileUpload({ setState, file }) {
  const params = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressBar, setProgressBar] = useState({ display: "none" });
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
    setState();
  };

  const sendMsg = (downloadURL) => {
    if (params.id) {
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
        const postImg = downloadURL;
        const obj = {
          text: message,
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

      setMessage("");
    }
  };

  const fileObj = URL.createObjectURL(file);

  const handleUpload = () => {
    setProgressBar({ display: "block" });
    const uploadRef = storage.ref(`images/${file.name}`).put(file);
    uploadRef.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
          sendMsg(downloadURL);
        });
        handleClose();
      }
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.imageDiv}>
          <img src={fileObj} alt={file.name} className={classes.displayImage} />
          <Typography className={classes.imageName}>{file.name}</Typography>
        </div>

        <DialogTitle id="alert-dialog-title">Upload Image</DialogTitle>

        <DialogContent>
          <form autoComplete="off" onSubmit={handleUpload}>
            <TextField
              id="outlined-basic"
              label="Add A Message"
              fullWidth
              margin="normal"
              variant="outlined"
              style={{ backgroundColor: "#484c52", borderRadius: "5px" }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </form>

          <div style={progressBar}>
            <Box display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2">{Math.round(progress)}%</Typography>
              </Box>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleUpload}
            color="primary"
            autoFocus
            variant="contained"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FileUpload;
