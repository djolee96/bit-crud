import React from 'react';
import Button from './Button'
import { withRouter } from "react-router";
import { Link } from "react-router-dom";



const Header = (props) => {
    let button1 = ""
    let button2 = ""
    let link1 = ""
    let link2 = ""

    switch (props.isLogged) {
        case true:
            button1 = "Dashboard";
            button2 = "My Posts";
            link1 = "/dashboard"
            link2 = "/myposts"
            break
        case false:
            button1 = "Posts";
            button2 = "About";
            link1 = "/posts"
            link2 = "/about"
            break
        default:
    }


    return (
        <div className="row">
            <header className="header col">
                <span className='logoBitCrud'> BIT CRUD </span>
                <div className='navBarHeader'>
                    <Link to={link1}><Button value={button1} className='postsHeader' onClick={() => { return }} /></Link>
                    <Link to={link2}><Button value={button2} className='aboutHeader' onClick={() => { return }} /></Link>
                </div>
            </header>
        </div>
    )
}

export default withRouter(Header)