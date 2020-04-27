import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getAllVacationSuccess, getAllVacationFailure, getAllVacationRequest, getFollowedVacationsSuccess } from '../redux/Actions'
import Button from '@material-ui/core/Button';
import { Redirect, NavLink, withRouter } from "react-router-dom";
import { makeStyles, fade, InputBase, Toolbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'rgb(0,0,0,0.0)',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        zIndex: '1000'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '50%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(0),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('xs')]: {
            width: 40,
            },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            width: 10,
            '&:focus': {
                width: 180,
            },
        },
    },
    link: {
        color: 'white',
        margin: '7%',
        textDecoration: 'none',
        [theme.breakpoints.down('xs')]: {
            fontSize: "13px",
            margin:0,
            marginRight:'10px',
            padding: 0
        },
        "&:Active": {
            opacity: 0.7,
            backgroundColor: '#009180'
        }
    },
    activeLink: {
        color: 'black',
        
    },
    hello:{
        [theme.breakpoints.down('xs')]: {
            fontSize: "13px",
            margin: '0px',
            padding: 0,

        },
    },
    logut: {
        [theme.breakpoints.down('xs')]: {
            fontSize: "11px",
            width: 1,
            margin: '0px'

        },
    }

}));


const NavBar = (props) => {

    const classes = useStyles();
    const [userLogout, setUserLogout] = useState(false)

    // Loguot Function
    const logout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('isAdmin')
        sessionStorage.removeItem('u_id')
        setUserLogout(true)
    }
    // Search Function
    const search = async event => {
        
        const searchVal = event.target.value
        const token = sessionStorage.getItem('token')
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token)

        props.dispatch(getAllVacationRequest())
        await fetch('http://localhost:3001/api/searchedvacations/' + searchVal, {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                props.dispatch(getAllVacationSuccess(false, res, ''))
                props.dispatch(getFollowedVacationsSuccess(false, '', ''))

            })
            .catch(err => {
                props.dispatch(getAllVacationFailure(err.message))
            })
    }

    if (userLogout) {
        return (<Redirect to="/login" push={true} />)
    }

    return (

        <div >

            <Toolbar style={{ backgroundColor: '#009688', width: '100vw' }} className={classes.root} >
                <div className={classes.hello} style={{ marginRight: '13%', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', width: '3px' }}>
                    Hello {sessionStorage.getItem(('name'))}
                </div>

                {+sessionStorage.getItem('isAdmin') ?
                    <div>
                        <NavLink to="/vacations" className={classes.link} activeClassName={classes.activeLink} >
                            Vacations
                        </NavLink>
                        <NavLink to="/reports" className={classes.link} activeClassName={classes.activeLink} >
                            Reports
                            </NavLink>
                    </div> : null}

                <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '0px'}}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={search}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}

                        />
                    </div>
                    <Button  onClick={logout} style={{ backgroundColor: '#33ab9f' }} className={classes.logut}>
                        Logout
            </Button>
                </div>
            </Toolbar>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.vacations
    }
}
const routerNavbar = withRouter(NavBar)

export default connect(mapStateToProps)(routerNavbar)
