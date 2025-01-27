import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import {MdWork, MdLocationOn} from 'react-icons/md'
import Profile from '../Profile'
import JobItemDetails from '../JobItemDetails'
import TypeOfEmployement from '../TypesOfEmployement'
import JobDetails from '../JobDetails'
import SalaryRange from '../SalarayRange'
import NoJobsFound from '../NoJobsFound'
import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsData: [],
    profileDataFetched: [],
    isChecked: false,
    activeId: '',
    params: [],
    rangeParams: '',
    searchParam: '',
    isNotPresent: false,
    toRedirect: false,
    jobsInfo: {},
    profileFailed: false,
    errorFound: false,
    isLoading: true,
    checkedValue: '',
    noJobsFound: false,
  }

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    this.fetchJobsData()
    this.fetchProfileData()
  }

  fetchJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {
      isChecked,
      params,
      activeId,
      jobsData,
      rangeParams,
      searchParam,
      checkedValue,
    } = this.state
    const queryParams = params.join(',')
    const jobsUrl = `https://apis.ccbp.in/jobs?employment_type=${queryParams}&minimum_package=${rangeParams}&search=${searchParam}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employementType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  fetchProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileUrl, options)
    const profileData = await response.json()
    if (response.ok) {
      const {profile_details} = profileData
      const fetchedData = {
        profileImageurl: profile_details.profile_image_url,
        name: profile_details.name,
        shortBio: profile_details.short_bio,
      }
      this.setState({profileDataFetched: fetchedData, isLoading: false})
    } else {
      this.setState({profileFailed: true, isLoading: false})
    }
  }

  handleCheckedStatus = (value, id) => {
    const {params} = this.state
    this.setState(
      {params: [...params, id], isChecked: value},
      this.fetchJobsData,
    )
  }

  handleRadioStatus = value => {
    this.setState({rangeParams: value}, this.fetchJobsData)
  }

  onChangeInput = event => {
    this.setState({searchParam: event.target.value.toLowerCase()})
  }

  onClickSearch = () => {
    const {searchParam} = this.state
    if (searchParam === '') {
      this.setState({params: [], rangeParams: '', searchParam: ''})
      this.fetchJobsData()
    }
    this.fetchJobsData()
  }

  isRedirected = (jobsInfo, errorFound) => (
    <JobDetails data={jobsInfo} error={errorFound} />
  )

  renderSuccessView = () => {
    const {
      jobsData,
      profileDataFetched,
      searchParam,
      isNotPresent,
      toRedirect,
      jobsInfo,
      profileFailed,
      errorFound,
      isLoading,
      params,
      rangeParams,
      isChecked,
    } = this.state
    console.log(isChecked)
    console.log(rangeParams)
    if (toRedirect) {
      return (
        (<Redirect to="/jobs/:{id}" />), this.isRedirected(jobsInfo, errorFound)
      )
    }
    return (
      <div className=" jobs-bg-container">
        <div>
          <div className="containers">
            <div className="leftContainer">
              {profileFailed ? (
                <div className="loader-container" data-testid="loader">
                  <Loader
                    type="ThreeDots"
                    color="#ffffff"
                    height="50"
                    width="50"
                  />
                </div>
              ) : (
                <Profile details={profileDataFetched} />
              )}
              <hr />
              <div>
                <h1 className="heading">Type of Employement</h1>
                <ul>
                  {employmentTypesList.map(each => (
                    <TypeOfEmployement
                      item={each}
                      handleCheckedStatus={this.handleCheckedStatus}
                      key={each.id}
                    />
                  ))}
                </ul>
              </div>
              <hr />
              <div>
                <h1 className="heading">Salary Range</h1>
                <ul>
                  {salaryRangesList.map(each => (
                    <SalaryRange
                      range={each}
                      handleRadioStatus={this.handleRadioStatus}
                      key={each.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="jobsDisplayContainer">
              <div className="searchContainer">
                <input
                  type="search"
                  className="searchCont"
                  placeholder="Search"
                  onChange={this.onChangeInput}
                  value={searchParam}
                />
                <button
                  className="searchIcon"
                  onClick={this.onClickSearch}
                  data-testid="searchButton"
                  type="button"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <ul>
                {jobsData.map(eachItem => (
                  <Link to={`/jobs/${eachItem.id}`}>
                    <li className="jobItemContainer" key={eachItem.id}>
                      <div className="logo-title-container">
                        <img
                          src={eachItem.companyLogoUrl}
                          className="CompanyLogo"
                          alt="company logo"
                        />
                        <div className="title-ratings-container">
                          <h1 className="title">{eachItem.title}</h1>
                          <div className="rating-container">
                            <FaStar className="starIcon" />
                            <p>{eachItem.rating}</p>
                          </div>
                        </div>
                      </div>
                      <div className="location-employementType-container">
                        <div className="iconsTextWrap">
                          <div className="icon-text-container">
                            <MdLocationOn className="icons" />
                            <p>{eachItem.location}</p>
                          </div>
                          <div className="icon-text-container">
                            <MdWork className="icons" />
                            <p>{eachItem.employementType}</p>
                          </div>
                        </div>
                        <p>{eachItem.packagePerAnnum}</p>
                      </div>
                      <hr />
                      <h1>Description</h1>
                      <p>{eachItem.jobDescription}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
            {jobsData.length === 0 && <NoJobsFound />}
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retryBtn">Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
    }
  }

  render() {
    return (
      <div className=" jobs-bg-container">
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default Jobs
