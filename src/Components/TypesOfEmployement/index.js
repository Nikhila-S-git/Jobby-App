import './index.css'

const TypeOfEmployement = props => {
  const {item, handleCheckedStatus, isChecked} = props
  const {label, employmentTypeId} = item
  const onChangeStatus = event => {
    handleCheckedStatus(event.target.checked, event.target.value)
  }
  return (
    <li key={employmentTypeId} className="listItems">
      <label>
        <input
          type="checkbox"
          id={employmentTypeId}
          onChange={onChangeStatus}
          value={employmentTypeId}
          checked={isChecked}
        />
        {label}
      </label>
    </li>
  )
}

export default TypeOfEmployement
