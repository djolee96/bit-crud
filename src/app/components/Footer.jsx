import React from 'react';
import Button from './Button'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

const Footer = (props) => {

    let button = "";
    let link = "";

    switch (props.isLogged) {
        case true:
            button = "Sign Out";
            link = "/"
            break
        case false:
            button = "Sign In";
            link = "/login"
            break
        default:
    }

    const logOut = () => {
        localStorage.removeItem('isLogged')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('userId')
        props.changeLogStatus(false);
        props.history.push('/')
    }

    return (
        <div className="row">
            <footer className="footer col">
                <h4>{new Date().getFullYear()}© PlazmaTeam</h4>
                <Link to={link}><Button value={button} className='signInButton' onClick={() => logOut()} /></Link>
            </footer>
        </div>
    )
}

export default withRouter(Footer)