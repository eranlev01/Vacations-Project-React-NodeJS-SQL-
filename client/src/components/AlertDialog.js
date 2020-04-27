import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import { DeleteSharp } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);
    // Token + Headers
    const token = sessionStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)

    // Open Dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    // Close Dialog
    const handleClose = async event => {
        setOpen(false);
        const eventTargetId = event.target.parentElement.parentElement.parentElement.id
        await fetch(`http://localhost:3001/api/vacations/${props.id}`,
            {
                method: "delete",
                headers: myHeaders
            })
            .then(data => data.json())
            .then(res => {
                props.history.push('/')
            })
            .catch(err => {
                console.log(err);
            })
    };
    const handleNo = () => {
        setOpen(false);
        props.history.push('/')
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <DeleteSharp style={{ color: 'white' }} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove this vacation from your list?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo} color="primary">
                        No
                    </Button >
                    <Button onClick={handleClose} color="primary" autoFocus id={props.id}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default withRouter(AlertDialog)