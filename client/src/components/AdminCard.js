import React from 'react'
import { connect } from 'react-redux'
import { CardContent, Card, makeStyles, Grid } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import EditModal from './EditModal';
import AddModal from './AddModal';
import AlertDialog from './AlertDialog';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        minWidth: 100,
        maxWidh: 400,
        width: 400,
        height: 350,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        color: 'white',
        overflow: 'scroll',
        margin: '60px',
        padding: 0,
        transition: 'all 0.4s',
        "&:hover": {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }
    },
    card: {
        padding: '0px'
    },
    p: {
        margin: '10px'
    },
    img: {
        width: '100%',
        height: '150px'
    },

});

const AdminCard = (props) => {

    const classes = useStyles();
    // Token + Headers
    const token = sessionStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)


    return (
        <div className='vacations-root'>
            <div className="vacations-div">
                {props.vacations.vacations.map(v => (
                    <Card className={classes.root} key={v.id}>
                        <CardContent className={classes.card}>
                            <img src={v.img_url} className={classes.img} alt={v.destination}/>
                            <h1>{v.destination}</h1>
                            <p className={classes.p}>{v.description}</p>
                            <h3>Dates: {v.from_date} - {v.until_date}</h3>
                            <h4>{v.price}$</h4>
                            <div className="admin-icon">
                                <EditModal vacation={v} component={Link} style={{ display: 'block', padding: '0', margin: ' 0'}}/>
                                <AlertDialog id={v.id}/>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Grid item container xs={6} alignItems="flex-end" direction="column">
                <Grid item>
                    <AddModal />
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.vacations
    }
}

export default connect(mapStateToProps)(AdminCard)
