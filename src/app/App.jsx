import React from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import { withRouter } from 'react-router'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLogged: !!localStorage.getItem("isLogged") }
  }

  changeLogStatus = (status) => {
    this.setState({ isLogged: status })
  }

  render() {
    return (
      <div className="container" >
        <Header isLogged={this.state.isLogged} />
        <Main isLogged={this.state.isLogged} changeLogStatus={this.changeLogStatus} />
        <Footer isLogged={this.state.isLogged} changeLogStatus={this.changeLogStatus} />
      </div>
    );
  }
}

export default withRouter(App);
