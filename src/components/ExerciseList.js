import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styling/exerciseList.css'

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    //this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      duration: 0,
      date: new Date(),
      exerciseList: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/', {
      headers: { "JWT-Token": localStorage.jwtToken }
    })

      .then(response => {
        console.log(response)
        //if (response.data.length > 0) {
          this.setState({
            //name: response.data.map(user => user.exerciseList),
            exerciseList: response.data.exerciseList
          })
       // }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  // onChangeUsername(e) {
  //this.setState({
  // name: e.target.value
  //})
  // }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      name: this.state.name,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise, {
      headers: { "JWT-Token": localStorage.jwtToken }
    })
      .then(res => console.log(res.data));

    // change to navigate window.location = '/';
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group"> */}
            {/* <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeUsername}>
              {
                this.state.user.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select> */}
          {/* </div> */}
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>


          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>


        <div className='App'>
        
          <table>
          <h2>My Track Record!</h2>
            <tr>
              <th>Activity</th>
              <th>Duration</th>
              <th>Date/Time</th>
              {/* <th>Time</th> */}
            </tr>
          
          {
            this.state.exerciseList.map((exercise, index) =>{
              return(

                <tr key={index}>
                  <td>{exercise.description}</td>
                  <td>{exercise.duration}</td>
                  <td>{exercise.date}</td>
                  {/* <td>{exercise.date.getTime}</td> */}
                </tr>
              )
            })}
            </table>
        </div>

      </div>

    )
  }
}