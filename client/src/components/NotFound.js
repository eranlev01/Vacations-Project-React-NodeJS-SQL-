import React from 'react'
import { connect } from 'react-redux'


const NotFound = (props) => {

    const loginLink = () => {
        props.history.push('/login')
    }

    return (
        <div>
            <div className="page404">
                <div className="notFoundContent" style={{width:'100vw', height:'88vh'}}>
                    <div>
                    <h1 >The page you are looking for doesn't exist!</h1>
                    <div className="loginLink404" onClick={loginLink}>Click for login page</div>
                    </div>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1" frameBorder="0" allow="autoplay" title="Page not Found"></iframe>
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


export default connect(mapStateToProps)(NotFound)
