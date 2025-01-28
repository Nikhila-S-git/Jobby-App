import './index.css'

const TypeOfEmployement = props => {
  const {item, handleCheckedStatus} = props
  const {label, employmentTypeId, isChecked} = item
  const onChangeStatus = event => {
    handleCheckedStatus(item)
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
