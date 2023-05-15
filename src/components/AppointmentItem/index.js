import './index.css'

const AppointmentItem = props => {
  const {eachData, getStarStatus} = props
  const clickStarBtn = () => {
    getStarStatus(eachData.id)
  }
  const starredImgSrc = eachData.isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li>
      <div className="item-container">
        <h1 className="item-heading">{eachData.title}</h1>
        <button
          type="button"
          data-testid="star"
          className="star-btn"
          onClick={clickStarBtn}
        >
          <img src={starredImgSrc} alt="star" className="star-log" />
        </button>
      </div>
      <p className="item-date">{eachData.date}</p>
    </li>
  )
}
export default AppointmentItem
