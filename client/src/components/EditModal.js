import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button } from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        margin: '0 auto',
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        }
    }
    ,
    paper: {
        backgroundColor: 'rgba(0, 0, 0, 0.85);',
        outline: 'none',
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
        width: '100%'
    },
}));

function EditModal(props) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // Open Modal
    const handleOpen = () => {
        setOpen(true);
    };
    // Close Modal
    const handleClose = () => {
        setOpen(false);
    };
    //Convert Date format
    const fromDate = props.vacation.from_date.split('/')[2]+'-'+props.vacation.from_date.split('/')[1]+'-'+props.vacation.from_date.split('/')[0]
    const untilDate = props.vacation.until_date.split('/')[2]+'-'+props.vacation.until_date.split('/')[1]+'-'+props.vacation.until_date.split('/')[0]

    // Initial Values
    const [destination, setDestination] = useState(props.vacation.destination)
    const [description, setDescription] = useState(props.vacation.description)
    const [img_url, setImg_url] = useState(props.vacation.img_url)
    const [from_date, setFrom_date] = useState(fromDate)
    const [until_date, setUntil_date] = useState(untilDate)
    const [price, setPrice] = useState(props.vacation.price)

    const token = sessionStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)

    const edit = async (e) => {
        e.preventDefault()
        const id = props.vacation.id
        const data = await fetch('http://localhost:3001/api/vacations', {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify({ id, destination, description, img_url, from_date, until_date, price })
        })
        if (data.ok) {
            alert('Edit has been completed')
            const res = await data.json()
        }
        else {
            console.log('err')
        }
        props.history.push('/')
    }


    return (
        <div>
            <IconButton onClick={handleOpen} >
                <EditIcon style={{ color: 'white', width: '100%' }} />
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                            <div className={classes.paper}>
                                <form className="edit-form" onSubmit={edit}>
                                    <label htmlFor="destination">Destination:</label>
                                    <input type="text" defaultValue={props.vacation.destination} onChange={e => setDestination(e.target.value)} />
                                    <label htmlFor="description">Description:</label>
                                    <input type="textarea" defaultValue={props.vacation.description} onChange={e => setDescription(e.target.value)} />
                                    <label htmlFor="img_url">image Url:</label>
                                    <input type="text" defaultValue={props.vacation.img_url} onChange={e => setImg_url(e.target.value)} />
                                    <label htmlFor="from_date">From: </label>
                                    <input type="date" defaultValue={fromDate} onChange={e => setFrom_date(e.target.value)} />
                                    <label htmlFor="until_date">To: </label>
                                    <input type="date" defaultValue={untilDate} onChange={e => setUntil_date(e.target.value)} />
                                    <label htmlFor="price">Price:</label>
                                    <input type="number" defaultValue={props.vacation.price} onChange={e => setPrice(e.target.value)} />
                                    <div className={classes.root}>
                                    </div>
                                    <Button type="submit" variant="outlined" color="primary" style={{ backgroundColor: 'primary', marginTop: '10px'}}>
                                        Apply Changes
                            </Button>
                                </form>
                            </div>
                </Fade>
            </Modal>
        </div>
    );
}
export default withRouter(EditModal)

