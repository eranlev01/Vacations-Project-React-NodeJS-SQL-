import React from 'react'
import { connect } from 'react-redux'
import { Card, makeStyles, CardContent } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        minWidth: 100,
        maxWidh: 400,
        width: 400,
        height: 350,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        color: 'white',
        overflow: 'auto',
        margin: '60px',
        padding: 0,
        transition: 'all 0.4s',
        "&:hover": {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        "&::-webkit-scrollbar": {
            display: 'none'
        }
    },
    card: {
        padding: '0px'
    },
    p: {
        margin: '10px'
    },
    f_icon: {
        color: 'white',
        borderRadius: 0,
        width: '100%',
        margin: 0,
        paddingLeft: '20px'
    },
});

const UserCard = (props) => {

    const classes = useStyles();
    const followedVacations = props.vacations.followedVacations
    const myHeaders = new Headers();
    const token = sessionStorage.getItem('token')
    const u_id = +sessionStorage.getItem('u_id')
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)

    // Checking  all the vacations checkboxes status
    const isChecked = vacationID => {
        let check = false;
        if (followedVacations) {
            followedVacations.forEach(f => {
                if (f.id === vacationID) {
                    check = true;
                    return true;
                }
            })
        }
        return check;
    }
    const follow = async (v_id) => {

        await fetch('http://localhost:3001/api/followers', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ u_id, v_id })
        })
            .then(data => data.json())
            .then(res => {
                console.log(res);
                console.log('succeed');

            })
            .catch(err => {
                console.log('err');
            })
            props.history.push('/')
    }
    const unfollow = async (v_id) => {

        await fetch('http://localhost:3001/api/followers', {
            method: 'DELETE',
            headers: myHeaders,
            body: JSON.stringify({ u_id, v_id })
        })
            .then(data => data.json())
            .then(res => {})
            .catch(err => {
                console.log(err);

            })
            props.history.push('/')

    }
    // checking this vacation checkbox status
    const handleChange = (v_id) => event => {

        if (event.target.checked) {
            follow(v_id)
        }
        else {
            unfollow(v_id)

        }


    };

    return (
        <div className="vacations-div">
            {props.vacations.followedVacations.map(v => (
                <Card className={classes.root} key={Math.random()}>
                    <CardContent className={classes.card}>
                        <img src={v.img_url} className="vacation-img" alt={v.destination} />
                        <h1>{v.destination}</h1>
                        <p className={classes.p}>{v.description}</p>
                        <h3>Dates: {v.from_date.split('T')[0]} - {v.until_date.split('T')[0]}</h3>
                        <h4>{v.price}$</h4>
                        <div className="likeIcon">
                            <FormControlLabel
                                control={<Checkbox className={classes.f_icon} icon={<FavoriteBorder className={classes.f_icon} />} defaultChecked={isChecked(v.id)} checkedIcon={<Favorite />} />}
                                id={v.id} onChange={handleChange(v.id)}
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
            {props.vacations.vacations.map(v => (
                <Card className={classes.root} key={Math.random()} style={{ display: isChecked(v.id) === true ? "none" : "" }}>
                    <CardContent className={classes.card}>
                        <img src={v.img_url} className="vacation-img" alt={v.destination}/>
                        <h1>{v.destination}</h1>
                        <p className={classes.p}>{v.description}</p>
                        <h3>Dates: {v.from_date} - {v.until_date}</h3>
                        <h4>{v.price}$</h4>
                        <div className="likeIcon">
                            <FormControlLabel
                                control={<Checkbox className={classes.f_icon} icon={<FavoriteBorder className={classes.f_icon} />} defaultChecked={isChecked()} checkedIcon={<Favorite />} />}
                                id={v.id} onChange={handleChange(v.id)} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.vacations
    }
}

const routerCard = withRouter(UserCard)

export default connect(mapStateToProps)(routerCard)
