import {format} from 'date-fns'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem/index'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentData: [],
    title: '',
    date: '',
  }

  submitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title !== '' || date !== '') {
      const newData = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }

      this.setState(prevState => ({
        appointmentData: [...prevState.appointmentData, newData],
        title: '',
        date: '',
      }))
    } else {
      this.setState(prevState => ({
        appointmentData: prevState.appointmentData,
      }))
    }
  }

  clickStarredBtn = () => {
    const {appointmentData} = this.state
    const filteredAppointmentData = appointmentData.filter(
      each => each.isStarred === true,
    )
    this.setState({appointmentData: filteredAppointmentData})
  }

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  getDate = event => {
    const userDate = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({date: userDate})
  }

  getStarStatus = id =>
    this.setState(prevState => ({
      appointmentData: prevState.appointmentData.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))

  render() {
    const {appointmentData, title} = this.state
    // console.log(appointmentData)
    return (
      <div className="bg-container">
        <div className="container">
          <h1>Add Appointments</h1>
          <div className="top-section">
            <form className="form-container" onSubmit={this.submitForm}>
              <label htmlFor="title" className="form-paragraph">
                TITLE
              </label>
              <input
                value={title}
                id="title"
                type="text"
                placeholder="Title"
                onChange={this.getTitle}
              />
              <label htmlFor="date" className="form-paragraph">
                DATE
              </label>
              <input id="date" type="date" onChange={this.getDate} />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <hr />
          <div className="section">
            <h1 className="sub-heading">Appointments</h1>
            <div>
              <button
                type="button"
                className="starred-btn"
                onClick={this.clickStarredBtn}
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="appointment-card-container">
            {appointmentData.map(eachData => (
              <AppointmentItem
                key={eachData.id}
                eachData={eachData}
                getStarStatus={this.getStarStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
