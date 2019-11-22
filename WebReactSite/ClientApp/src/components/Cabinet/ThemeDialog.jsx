import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const { open, handleClose, handleInputChange, values } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Theme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your New theme Header, Description and Icon
          </DialogContentText>
          <TextField
            name="header"
            autoFocus
            margin="dense"
            label="Header"
            fullWidth
            onChange={handleInputChange}
            value={values.name}
          />
          <TextField
            name="description"
            margin="dense"
            label="Description"
            fullWidth
            onChange={handleInputChange}
            value={values.name}
          />
          <TextField
            name="icon"
            margin="dense"
            label="Icon"
            fullWidth
            onChange={handleInputChange}
            value={values.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
