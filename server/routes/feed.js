const router = require('express').Router();
const {body} = require('express-validator/check');
const eventController = require('../controllers/event');
const commentController = require('../controllers/comment');
const ticketController = require('../controllers/ticket');
const isAuth = require('../middleware/is-auth');
const Event = require('../models/EventSchema');

router.get('/user/events/:id', isAuth, eventController.getUserEvents);
router.post('/user/event/tickets', isAuth, ticketController.getMyEventTickets);
router.get('/user/tickets/:id', ticketController.getUserTickets);

router.get('/event/:id', eventController.getEventById);
router.get('/events', eventController.getApprovedEvents);
router.get('/events/unapproved', isAuth, eventController.getUnapprovedEvents);
router.post('/event/create', isAuth, [
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
        .isLength({min: 3})
        .isLength({max: 20})
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
        .isLength({min: 3})
        .isLength({max: 300})
        .withMessage('Please enter a description'),
    body('imageUrl')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Please enter an event image url')
], eventController.createEvent);
router.post('/event/edit/:id', isAuth, [
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
router.delete('/event/delete/:id', isAuth, eventController.removeEvent);

router.post('/comments', isAuth, commentController.getEventComments);
router.post('/comment/create', isAuth, commentController.createComment);
router.put('/comment/edit', isAuth, commentController.editComment);
router.delete('/comment/delete', isAuth, commentController.deleteComment);

router.post('/ticket/create', isAuth, [
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
router.post('/event/approve/:id', isAuth, eventController.approveEvent);
module.exports = router;