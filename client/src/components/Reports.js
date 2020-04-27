import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Bar } from 'react-chartjs-2';
import { getFollowedVacationsRequest, getFollowedVacationsSuccess, getFollowedVacationsFailure } from '../redux/Actions'
import NavBar from './NavBar';
const Reports = (props) => {

    useEffect(() => {
        getFollowedVacation()
    }, [])

    const token = sessionStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token)

    const getFollowedVacation = async () => {
        props.dispatch(getFollowedVacationsRequest())
        await fetch('http://localhost:3001/api/followedvacations', {
            method: 'GET',
            headers: myHeaders
        })
            .then(data => data.json())
            .then(res => {
                props.dispatch(getFollowedVacationsSuccess(false, res, ''))

            })
            .catch(err => {
                props.dispatch(getFollowedVacationsFailure(err.message))
            })
    }
    const allFollowedDestination = props.vacations.followedVacations.map(v => v.Destination)
    const numOfFollowers = props.vacations.followedVacations.map(v => v.Followers)
    const state = {
        labels: allFollowedDestination,
        datasets: [
            {
                label: 'Number Of Followers',
                backgroundColor: 'rgba(75,192,192,0.7)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                barThickness: 150,
                data: numOfFollowers
            }
        ]
    }

    return (
        <div className="chart">
            <header style={{ height: '5vh' }}>< NavBar /></header>
            <section className="graph-section">

                <Bar
                    position={'absolute'}
                    data={state}
                    options={{
                        title: {
                            display: true,
                            fontSize: 30,
                            fontColor: 'white',
                            text: 'Followed Vacations Reports',
                            padding: 80

                        },
                        legend: {
                            display: true,
                            position: 'right',
                            padding: 20,
                            labels: {
                                fontColor: 'white'
                            },

                        },
                        layout: {
                            padding: {
                                top: 5,
                                left: 'auto',
                                right: 'auto',
                                bottom: 5,
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: 'white'
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: 'white'
                                }
                            }]
                        }

                    }}
                />
            </section>
        </div>
    )

}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.vacations
    }
}


export default connect(mapStateToProps)(Reports)
