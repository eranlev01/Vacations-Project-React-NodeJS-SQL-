import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from "../redux/Actions";
import { Box } from '@material-ui/core';

const Login = (props) => {

    const [u_name, setU_name] = useState('')
    const [password, setPassword] = useState('')
    
    // Login Function
    const handleClick = async (e) => {
        e.preventDefault()
        const data = await fetch('http://localhost:3001/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ u_name, password })
        })
        if (data.ok) {
            const res = await data.json()
            const f_name = res.user[0].f_name
            sessionStorage.name = f_name
            sessionStorage.token = res.token
            const admin = res.user[0].isAdmin
            sessionStorage.isAdmin = admin
            const u_id = res.user[0].id
            sessionStorage.u_id = u_id
            props.dispatch(login(u_name))
            props.history.push('/')
        }
        else {
            console.log('err')
        }
    }
    // Register Link
    const register = () => {
        props.history.push('register')
    }

    return (
        
      
        <div className="login-div">
        <Box color="text.primary" clone style={{color: 'white'}}>
            <div className="login-child-div">
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleClick}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" placeholder="Enter Your Username" onChange={e => { setU_name(e.target.value) }} />
                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="Enter Your Password" onChange={e => { setPassword(e.target.value) }} />
                    <div className="btns">
                        <input type="submit" value="Login" className="login-btn" />
                        <button className="login-btn" onClick={register}>Register</button>
                    </div>
                </form>
            </div>
        </Box >
        </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        vacations: state.vacations
    }
}

export default connect(mapStateToProps)(Login)
