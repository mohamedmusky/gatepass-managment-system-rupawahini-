import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import "./Alert.css";

const Alert = ({ requestId, type, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [reason, setReason] = useState('');
    const [reasonError, setReasonError] = useState(true); // Initially set to true

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReasonChange = (event) => {
        const { value } = event.target;
        setReason(value);
        // Update the reasonError state based on whether the reason field is empty or not
        setReasonError(value.trim() === '');
    };

    const handleDelete = () => {
        if (!reasonError) { // Check if reason is not empty
            onDelete(requestId, type, reason.trim()); // Passing reason to onDelete
            setOpen(false);
        }
    };

    const paperStyle = {
        backgroundColor: 'white',
        width: '500px',
        maxHeight: '500px'
    };

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#973535",
                    marginLeft: "20px",
                    borderRadius: "20px",
                    border: "2px solid white",
                    width: "80px",
                    height: "4vh",
                    "&:hover": {
                        border: "4px solid #EEC01F",
                        backgroundColor: "white",
                        color: "#811F15",
                    },
                }}
                onClick={handleClickOpen}
            >
                Cancel
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                PaperProps={{ style: paperStyle }}
            >
                <DialogTitle id='dialog-title'>
                    Cancel Request
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='dialog-description'>
                        Do you wish to cancel the selected request?
                        <TextField
                            autoFocus
                            margin="dense"
                            id="reason"
                            label="Reason for cancel the request"
                            type="text"
                            fullWidth
                            value={reason}
                            onChange={handleReasonChange}
                            error={reasonError}
                            helperText={reasonError ? "Reason is required" : ""}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: "white",
                            backgroundColor: "#973535",
                            marginLeft: "20px",
                            borderRadius: "20px",
                            width: "150px",
                            "&:hover": { backgroundColor: "#811F15", color: "#EEC01F" },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        sx={{
                            color: "white",
                            backgroundColor: "#973535",
                            marginLeft: "20px",
                            borderRadius: "20px",
                            width: "150px",
                            "&:hover": { backgroundColor: "#811F15", color: "#EEC01F" },
                        }}
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Alert;
