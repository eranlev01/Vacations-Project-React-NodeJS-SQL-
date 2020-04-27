import React, { useState } from 'react';
import { login } from "../redux/Actions";
import { connect } from 'react-redux';


const Register = (props) => {

    const [f_name, setF_name] = useState('')
    const [l_name, setL_name] = useState('')
    const [u_name, setU_name] = useState('')
    const [password, setPassword] = useState('')
    // Register + Auto Login
    const registerHandleClick = async (e) => {
        e.preventDefault()
        const data = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ f_name, l_name, u_name, password })
        })
        if (data.ok) {
            const res = await data.json()
            console.log(res);
            autoLogin()
        }
        else {
            console.log('err')
        }
    }
    // Login Function
    const autoLogin = async () => {
        const data = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ u_name, password })
        })
        if (data.ok) {
            alert('user has been connected')
            const res = await data.json()
            sessionStorage.token = res.token
            const admin = res.user[0].isAdmin
            sessionStorage.isAdmin = admin
            const u_id = res.user[0].id
            sessionStorage.u_id = u_id
            props.dispatch(login(u_name))
            props.history.push('/')
            console.log(u_id);
        }
        else {
            console.log('err')
        }
    }
    // Login Link
    const loginLink = () => {
        props.history.push('/login')
    }

    return (
        <div>
            <div className="register-div">
                <div className="register-child-div">
                    <h1>Register</h1>
                    <form className="register-form" onSubmit={registerHandleClick}>
                        <label htmlFor="username">First Name:</label>
                        <input type="text" placeholder="Enter Your Firstname" onChange={e => { setF_name(e.target.value) }} />
                        <label htmlFor="username">Last Name:</label>
                        <input type="text" placeholder="Enter Your Lastname" onChange={e => { setL_name(e.target.value) }} />
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="Enter Your Username" onChange={e => { setU_name(e.target.value) }} />
                        <label htmlFor="password">Password: </label>
                        <input type="password" placeholder="Enter Your Password" onChange={e => { setPassword(e.target.value) }} />
                        <div className="register-btns">
                            <input type="submit" value="Register" className="register-btn" />
                            <div className="existing-account" onClick={loginLink}>Already have an account?</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.vacations
    }
}

export default connect(mapStateToProps)(Register)
