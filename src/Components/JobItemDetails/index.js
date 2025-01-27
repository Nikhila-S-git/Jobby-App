import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {MdWork, MdLocationOn} from 'react-icons/md'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import NoJobsFound from '../NoJobsFound'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    apiStatus: apiStatusConstants.initial,
    similarJobs: [],
    skills: [],
    lifeAtCompany: {},
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {job_details, similar_jobs} = data
      const {skills, life_at_company} = job_details
      this.setState({
        jobDetails: job_details,
        apiStatus: apiStatusConstants.success,
        similarJobs: similar_jobs,
        skills,
        lifeAtCompany: life_at_company,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs, skills, lifeAtCompany} = this.state
    console.log(similarJobs)
    console.log(skills)

    return (
      <div className="JobDetailsContainer">
        <div className="jobDetailsContainer">
          <div className="logo-title-container">
            <img
              src={jobDetails.company_logo_url}
              className="companyLogo"
              alt="job details company logo"
            />
            <div className="title-ratings-container">
              <h1>{jobDetails.title}</h1>
              <div className="ratingsContainer">
                <FaStar />
                <p>{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="locationSalaryContainer">
            <div className="locationEmployementType">
              <div className="location">
                <MdLocationOn />
                <p>{jobDetails.location}</p>
              </div>
              <div className="location">
                <MdWork />
                <p>{jobDetails.employment_type}</p>
              </div>
            </div>
            <p>{jobDetails.package_per_annum}</p>
          </div>
          <hr style={{width: '92vw'}} />
          <div className="description-companyUrlContainer">
            <h1>Description</h1>
            <a href={jobDetails.company_website_url}>
              <div className="spanCont">
                <p>Visit</p>
                <BsBoxArrowUpRight />
              </div>
            </a>
          </div>
          <p>{jobDetails.job_description}</p>
          <h1>Skills</h1>
          <ul className="skillsContainer">
            {skills.map(each => (
              <li className="listItem" key={each.name}>
                <img
                  src={each.image_url}
                  className="listImage"
                  alt={each.name}
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <div />
          <h1>Life at Company</h1>
          <div className="lifeAtCompanyContainer">
            <p>{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              className="lifeAtCompanyImage"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="heading">Similar Jobs</h1>
        <ul className="similarJobsCont">
          {similarJobs.map(each => (
            <li className="similarJobsListEl" key={each.id}>
              <div className="logo-title-container">
                <img
                  src={each.company_logo_url}
                  className="CompanyLogo"
                  alt="similar job company logo"
                />
                <div className="title-ratings-container">
                  <h1 className="title">{each.title}</h1>
                  <div className="rating-container">
                    <FaStar className="starIcon" />
                    <p>{each.rating}</p>
                  </div>
                </div>
              </div>
              <h1>Description</h1>
              <p>{each.job_description}</p>
              <div className="location-employementType-container">
                <div className="iconsTextWrap">
                  <div className="icon-text-container">
                    <MdLocationOn className="icons" />
                    <p>{each.location}</p>
                  </div>
                  <div className="icon-text-container">
                    <MdWork className="icons" />
                    <p>{each.employment_type}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retryBtn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  onClickRetry = () => this.getJobDetails()

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobDetailsBgContainer">
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default JobItemDetails
