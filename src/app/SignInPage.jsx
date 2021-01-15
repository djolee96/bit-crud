import React from 'react'
import LockLogo from '../images/lock.jpg'
import Input from './components/Input'
import Checkbox from './components/Checkbox'
import Button from './components/Button'
import { loginUser, fetchUsers } from "../services/userServices"
import { Link } from 'react-router-dom'

class SignInPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            pass: "",
            error: "",
            userId: "",
            remember: ""
        }
    }
    getEmail = (e) => {
        this.setState({ email: e })
    }
    getPassword = (e) => {
        this.setState({ pass: e })
    }
    getCheckValue = (x) => {
        this.setState({ remember: x })
    }

    signIn = () => {
        let data = {
            email: this.state.email,
            password: this.state.pass
        }

        loginUser(data)
            .then(res => {
                if (res.error) {
                    this.setState({ error: res.error })
                }
                else {
                    localStorage.setItem("currentUser", res.accessToken)
                    localStorage.setItem("isLogged", true)
                    fetchUsers()
                        .then(usersList => usersList.filter(user => user.email === this.state.email))
                        .then(result => localStorage.setItem("userId", result[0].id))
                    this.props.changeLogStatus(true);
                    this.props.history.push('/dashboard/')
                }
            })
    }

    render() {
        return (
            <div className="signInPage row">
                <div className="col">
                    <img src={LockLogo} alt='logo'></img>
                    <h2>Sign in</h2>
                    <form>
                        <fieldset>
                            <legend>Email Address *</legend>
                            <Input className="inputEmail" type="text" onChange={this.getEmail} />
                        </fieldset>
                        <Input className="passwordSignIn" type="password" placeholder="Password *" onChange={this.getPassword} required />
                        <p className="error">{this.state.error}</p>
                        <p><Checkbox onChange={this.getCheckValue} /> Remember me</p>
                        <Button value='SIGN IN' className='signInButton' onClick={this.signIn} />
                        <div className="signInContainer">
                            <span className="forgotPassword">Forgot password</span>
                            <Link to="/newUser" > <span className="haveNotAccount">Don't have an account? Sign Up</span></Link>
                        </div>
                    </form>
                </div>
            </div >
        )
    }

}

export default SignInPage