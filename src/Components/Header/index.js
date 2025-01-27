import {Link, withRouter, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="headersContainer">
      <Link to="/" className="linkEl">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websiteLogo"
          />
        </li>
      </Link>
      <ul className="headersList">
        <Link to="/" className="linkEl">
          <li>
            <p className="para">Home</p>
          </li>
        </Link>
        <Link to="/jobs" className="linkEl">
          <li>
            <p className="para">Jobs</p>
          </li>
        </Link>
      </ul>
      <button className="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
