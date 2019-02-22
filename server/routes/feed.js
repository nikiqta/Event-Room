const router = require('express').Router();
const {body} = require('express-validator/check');
const eventController = require('../controllers/event');
const commentController = require('../controllers/comment');
const ticketController = require('../controllers/ticket');
const isAuth = require('../middleware/is-auth');
const Event = require('../models/EventSchema');

router.post('/user/events', eventController.getUserEvents);
router.post('/user/event/tickets', ticketController.getMyEventTickets);
router.post('/user/tickets', ticketController.getUserTickets);

router.get('/events', eventController.getApprovedEvents);
router.get('/events/unapproved', eventController.getUnapprovedEvents);
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
], eventController.createEvent);
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
], eventController.editEvent);
router.delete('/event/delete', eventController.removeEvent);

router.post('/comments', commentController.getEventComments);
router.post('/comment/create', commentController.createComment);
router.put('/comment/edit', commentController.editComment);
router.delete('/comment/delete', commentController.deleteComment);

router.post('/ticket/create', [
    body('paymentCardNumber')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter a valide card number'),
    body('seat')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please choose a seat'),
], ticketController.createTicket);

module.exports = router;