import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function DeleteModal({ msgId, text, deleteMsg, handleModal, postImg }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    handleModal();
  };

  const handleDelete = () => {
    deleteMsg(msgId);
    handleModal();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the message?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "white", fontSize: "1.2rem" }}
          >
            {text}
          </DialogContentText>
          {postImg ? (
            <img
              src={postImg}
              alt="img"
              style={{ height: "200px", width: "250px", borderRadius: "4px" }}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "white" }}>
            Cancel
          </Button>

          <Button
            onClick={handleDelete}
            color="primary"
            autoFocus
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteModal;
