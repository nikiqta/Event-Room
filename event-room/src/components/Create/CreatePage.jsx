import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';

import { createEventThunk } from '../../actions/eventActions';

import {
  EVENT_NAME_ERROR,
    EVENT_DATE_ERROR,
    TICKET_PRICE_ERROR,
    AVAILABLE_SEATS_ERROR,
    IMAGE_URL_ERROR,
    DESCRIPTION_ERROR,
    CREATE_EVENT_CHECK,
    eventNameValidation,
    eventDateValidation,
    eventTicketPriceValidation,
    eventAvailableSeatsValidation,
    eventImageUrlValidation,
    eventDescriptionValidation,
    createCheck
} from './../../utils/validations';

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

    const noValidationErrors = createCheck(data);

    if(noValidationErrors) {
        try{
            await this.props.createEvent(data);
            this.props.notify('Event Created Successfully', 'success');
            this.props.history.push('/');
        } catch (err) {
            this.props.notify(err.message, 'error');
        }
    } else {
        this.props.notify(CREATE_EVENT_CHECK, 'error');
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
                error={eventNameValidation(this.state.name)}
                helperText={eventNameValidation(this.state.name) ? EVENT_NAME_ERROR : ''}
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
                error={eventDateValidation(this.state.eventDate)}
                helperText={eventDateValidation(this.state.eventDate) ? EVENT_DATE_ERROR : '' }
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
                error={eventTicketPriceValidation(this.state.ticketPrice)}
                helperText={eventTicketPriceValidation(this.state.ticketPrice) ? TICKET_PRICE_ERROR : ''}
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
                error={eventAvailableSeatsValidation(this.state.availableSeats)}
                helperText={eventAvailableSeatsValidation(this.state.availableSeats) ? AVAILABLE_SEATS_ERROR : ''}
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
                error={eventImageUrlValidation(this.state.imageUrl)}
                helperText={eventImageUrlValidation(this.state.imageUrl) ? IMAGE_URL_ERROR : ''}
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
              error={eventDescriptionValidation(this.state.description)}
              helperText={eventDescriptionValidation(this.state.description) ? DESCRIPTION_ERROR : ''}
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
