import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div className="homeConatiner">
      <Header />
      <h1>Find The Job That Fits Your Life</h1>
      <p>
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="button">Find Jobs</button>
      </Link>
    </div>
  )
}

export default withRouter(Home)
