import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Card from './UserCard'
import { getAllVacationSuccess, getAllVacationFailure, getAllVacationRequest, getFollowedVacationsRequest, getFollowedVacationsSuccess, getFollowedVacationsFailure } from '../redux/Actions'
import NavBar from './NavBar'
import AdminCard from './AdminCard'


const Vacations = (props) => {

    const ifLoggedIn = sessionStorage.getItem('token')
    const token = sessionStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)
    const id = JSON.parse(sessionStorage.getItem('u_id'))
    const getVacations = async () => {

        props.dispatch(getAllVacationRequest())
        await fetch('http://localhost:3001/api/vacations', {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                props.dispatch(getAllVacationSuccess(false, res, ''))

            })
            .catch(err => {
                props.dispatch(getAllVacationFailure(err.message))
            })

    }
    const getFollowedVacation = async () => {
        props.dispatch(getFollowedVacationsRequest())
        await fetch('http://localhost:3001/api/followers/' + id, {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                props.dispatch(getFollowedVacationsSuccess(false, res, ''))
            })
            .catch(err => {
                console.log(err);
                props.dispatch(getFollowedVacationsFailure(err.message))
            })
    }

    useEffect(() => {
        if (ifLoggedIn) {
            getFollowedVacation()
            getVacations()
        }
        else {
            props.history.push('/login')
        }
    }, [])


    return (
        <div className="vacation-com">
            <header>< NavBar /></header>
            <section>{+sessionStorage.getItem('isAdmin') ? < AdminCard /> : < Card />}</section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.vacations,
    }
}

export default connect(mapStateToProps)(Vacations)
