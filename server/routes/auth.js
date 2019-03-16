const router = require('express').Router();
const {body} = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/UserSchema');

router.post('/register',
    [
        body('username')
            .trim()
            .not()
            .isEmpty()
            .isLength({min: 3})
            .isLength({max: 20})
            .withMessage('Please enter a valid username.')
            .custom((value, {req}) => {
                return User.findOne({username: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Username is already taken!');
                    }
                })
            }),
        body('firstName')
            .trim()
            .not()
            .isEmpty()
            .isLength({min: 2})
            .isLength({max: 20})
            .withMessage('Please enter first name'),
        body('lastName')
            .trim()
            .not()
            .isEmpty()
            .isLength({min: 2})
            .isLength({max: 20})
            .withMessage('Please enter last name'),
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.'),
        body('password')
            .trim()
            .isLength({min: 3})
            .isLength({max: 20})
            .withMessage('Please enter a valid password.'),
    ]
    , authController.register);
router.post('/login', authController.login);

module.exports = router;
