const router = require('express').Router();
const {body} = require('express-validator/check');
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');
const Event = require('../models/EventSchema');

router.get('/events', feedController.getEvents);
router.post('/event/create', [
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a valid name.')
        .custom((value, {req}) => {
            return Event.findOne({name: value}).then(eventData => {
                if (eventData) {
                    return Promise.reject('Name is already taken!');
                }
            })
        }),
    body('eventDate')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter an event date'),
    body('ticketPrice')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a ticket price'),
    body('availableSeats')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a available seats'),
    body('description')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a description'),
    body('imageUrl')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter an event image url')
], feedController.createEvent);
router.post('/event/edit', [
    body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a valid name.')
        .custom((value, {req}) => {
            return Event.findOne({name: value}).then(eventData => {
                if (eventData) {
                    return Promise.reject('Name is already taken!');
                }
            })
        }),
    body('eventDate')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter an event date'),
    body('ticketPrice')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a ticket price'),
    body('availableSeats')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a available seats'),
    body('description')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a description'),
    body('imageUrl')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter an event image url')
], feedController.editEvent);
router.delete('/event/delete', feedController.removeEvent);
module.exports = router;