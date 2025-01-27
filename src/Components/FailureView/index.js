import Header from '../Header'

import './index.css'

const FailureView = () => (
  <div>
    <Header />
    <div className="failureviewContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failureView"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="button">Retry</button>
    </div>
  </div>
)

export default FailureView
