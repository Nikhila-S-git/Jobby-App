import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdWork, MdLocationOn} from 'react-icons/md'

import './index.css'

const JobDetails = props => {
  const {item, getJobInfo} = props
  const {
    companyLogoUrl,
    employementType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item
  const onClickJob = () => {
    getJobInfo(id)
  }
  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobItemContainer" key={id}>
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            className="CompanyLogo"
            alt="company logo"
          />
          <div className="title-ratings-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaStar className="starIcon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employementType-container">
          <div className="iconsTextWrap">
            <div className="icon-text-container">
              <MdLocationOn className="icons" />
              <p>{location}</p>
            </div>
            <div className="icon-text-container">
              <MdWork className="icons" />
              <p>{employementType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobDetails
