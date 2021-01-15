import React from "react"
import Input from './components/Input'
import Button from './components/Button'
import Checkbox from './components/Checkbox'
import userLogo from '../images/userLogo.png'
import { createUser } from '../services/userServices'
import validateInputs from '../shared/passwordValidation'

class SignUpPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            check: false
        }
    }
    getFirstName = (x) => {
        document.querySelector('.firstName').classList.remove('invalidInput')
        document.querySelector('.firstName').setAttribute('placeholder', 'First Name *')
        this.setState({ firstName: x })
    }

    getLastName = (x) => {
        this.setState({ lastName: x })
    }

    getEmail = (x) => {
        document.querySelector('.email').classList.remove('invalidInput')
        document.querySelector('.email').setAttribute('placeholder', 'Email Address *')
        this.setState({ email: x })
    }

    getPassword = (x) => {
        document.querySelector('.password').classList.remove('invalidInput')
        document.querySelector('.password').setAttribute('placeholder', 'Password *')
        this.setState({ password: x })
    }

    getCheckStatus = (x) => {
        this.setState({ check: x })
    }

    getRegistrationData = () => {
        let data = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.firstName,
        };

        const isValid = validateInputs(data.email, data.password, data.name)

        if (isValid) {

            createUser(data)
                .then(token => {
                    if (token.statusCode === 422) {
                        document.querySelector('.email').classList.add('invalidInput')
                        document.querySelector('.email').setAttribute('title', 'Incorrect email address or email address is already registered!')
                    } else {
                        this.props.history.push('/login/')
                    }
                }
                )
        }

    }


    render() {
        return (
            <div className="signUpPage row">
                <div className="col signUpContainer">
                    <img src={userLogo} className="userLogo" alt=""></img>
                    <h2 className="h2SignUp">Sign up</h2>
                    <Input type="text" placeholder="First Name *" className="firstName" onChange={this.getFirstName} />
                    <Input type="text" placeholder="Last Name *" className="lastName" onChange={this.getLastName} />
                    <br />
                    <Input type="email" placeholder="Email Address *" className="email" onChange={this.getEmail} required />
                    <Input type="password" placeholder="Password *" className="password" onChange={this.getPassword} required />
                    <p><Checkbox className="checkBox" onChange={this.getCheckStatus} /> I want to receive inspiration, marketing promotions and updates via email.</p>
                    <Button value="SIGN UP" className="signUp" onClick={this.getRegistrationData} />
                    <p>Already have an account? Sign in</p>
                </div>
            </div>
        )
    }
}

export default SignUpPage