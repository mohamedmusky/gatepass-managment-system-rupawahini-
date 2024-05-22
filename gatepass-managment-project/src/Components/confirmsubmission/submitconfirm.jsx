import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmSubmission = ({ open, handleClose, handleConfirmSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Submission</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to submit the form?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmSubmission;
