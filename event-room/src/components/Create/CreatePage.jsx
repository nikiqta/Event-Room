import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { createEventThunk } from '../../actions/eventActions';

class CreatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      eventDate: '',
      ticketPrice: '',
      availableSeats: '',
      description: '',
      imageUrl: ''
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

async onSubmitHandler(e) {
    e.preventDefault();
    const data = {
        creator: this.props.state.login.userId || localStorage.getItem('userId'),
        name: this.state.name,
        eventDate: this.state.eventDate,
        ticketPrice: this.state.ticketPrice,
        availableSeats: this.state.availableSeats,
        description: this.state.description,
        imageUrl: this.state.imageUrl
    };
    
    try{
        await this.props.createEvent(data);
        this.props.notify('Event Created Successfuly', 'success');
        this.props.history.push('/');
    } catch (err) {
        this.props.notify(err.message, 'error');
    }

  }

  render() {
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Create New Event</h1>
          </div>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <div className="row space-top">
            <div className="form-group col-6">
              <TextField
                className="inputFieldsWidth"
                id="name"
                type="text"
                name="name"
                value={this.state.name}
                label="Name"
                onChange={this.onChangeHandler}
                error={false}
                helperText={false}
              />
            </div>
            <div className="form-group col-6">
              <TextField
                className="inputFieldsWidth"
                id="eventDate"
                name="eventDate"
                value={this.state.eventDate}
                onChange={this.onChangeHandler}
                label="Event Date"
                type="date"
                defaultValue={Date.now()}
                InputLabelProps={{
                  shrink: true,
                }}
                error={false}
                helperText={false}
              />
            </div>
            <div className="form-group col-6">
              <TextField
                className="inputFieldsWidth"
                id="ticketPrice"
                type="number"
                name="ticketPrice"
                value={this.state.ticketPrice}
                label="Ticket Price"
                onChange={this.onChangeHandler}
                error={false}
                helperText={false}
              />
            </div>
            <div className="form-group col-6">
              <TextField
                className="inputFieldsWidth"
                id="availableSeats"
                type="number"
                name="availableSeats"
                value={this.state.availableSeats}
                label="Available Seats"
                onChange={this.onChangeHandler}
                error={false}
                helperText={false}
              />
            </div>
            <div className="form-group col-12">
              <TextField
                className="inputFieldsWidth"
                margin="normal"
                id="imageUrl"
                type="text"
                name="imageUrl"
                value={this.state.imageUrl}
                label="Image Url"
                onChange={this.onChangeHandler}
                error={false}
                helperText={false}
              />
            </div>
          </div>
          <div className="form-group col-8 m-auto">
            <TextField
              className="inputFieldsWidth"
              multiline
              rows={1}
              inputProps={{
                style: {
                  height: '100px'
                }
              }}
              fullWidth
              margin="normal"
              id="description"
              type="text"
              name="description"
              value={this.state.description}
              label="Description"
              onChange={this.onChangeHandler}
              error={false}
              helperText={false}
            />
          </div>
          <input
            type="submit"
            className="btn btn-success"
            value="Create"
            disabled={this.state.submitting}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return ({
        state
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        createEvent: (data) => dispatch(createEventThunk(data))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePage));
