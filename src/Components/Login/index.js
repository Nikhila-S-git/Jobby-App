import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', displayErrorMsg: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const details = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({displayErrorMsg: true, errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, displayErrorMsg, errorMsg} = this.state
    return (
      <div className="bg-container">
        <form className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="inputsContainer">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="input"
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className="inputsContainer">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input"
              onChange={this.onChangePassword}
              value={password}
            />
          </div>
          <button className="button" onClick={this.submitForm}>
            Login
          </button>
          {displayErrorMsg && <p className="errorMsg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
