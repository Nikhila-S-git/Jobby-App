import './index.css'

const SalaryRange = props => {
  const {range, handleRadioStatus, isActive} = props
  const {salaryRangeId, label} = range
  const onChangeEvent = event => {
    handleRadioStatus(event.target.value)
  }
  return (
    <li className="listItems">
      <input
        type="radio"
        id={salaryRangeId}
        onChange={onChangeEvent}
        name="salaryRange"
        value={salaryRangeId}
        checked={isActive}
      />
      <p htmlFor={salaryRangeId}>{label}</p>
    </li>
  )
}

export default SalaryRange
