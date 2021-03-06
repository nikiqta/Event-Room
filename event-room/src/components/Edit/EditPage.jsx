import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import {getEventThunk, editEventThunk} from '../../actions/eventActions';

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

class EditPage extends Component {
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

async  componentDidMount() {
    const {id} = this.props.match.params;

  await  this.props.getEvent(id);
  const { eventDetails } = this.props.event;

    this.setState({
        name: eventDetails.name,
        eventDate: eventDetails.eventDate,
        ticketPrice: eventDetails.ticketPrice,
        availableSeats: eventDetails.availableSeats,
        description: eventDetails.description,
        imageUrl: eventDetails.imageUrl,
    });
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

async onSubmitHandler(e) {
    e.preventDefault();
    const {id} = this.props.match.params;
    const data = {
        creator: this.props.user.userId || localStorage.getItem('userId'),
        name: this.state.name,
        eventDate: this.state.eventDate,
        ticketPrice: this.state.ticketPrice,
        availableSeats: this.state.availableSeats,
        description: this.state.description,
        imageUrl: this.state.imageUrl
    };

    try{
        await this.props.editEvent(data, id);
        this.props.notify('Event Edited Successfuly', 'success');
        this.props.history.push('/myEvents');
    } catch (err) {
        this.props.notify(err.message, 'error');
    }

  }

  render() {
    return (
      <div className="container">
        <div className="row space-top">
          <div className="col-md-12">
            <h1>Edit Event</h1>
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
            value="Edit"
            disabled={this.state.submitting}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return ({
        event: state.events,
        user: state.login
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        getEvent: (eventId) => dispatch(getEventThunk(eventId)),
        editEvent: (data, eventId) => dispatch(editEventThunk(data, eventId))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPage));