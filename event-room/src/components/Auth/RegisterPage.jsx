import React, {Component, Fragment} from 'react';
import {TextField} from '@material-ui/core';
import {registerThunk} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    USERNAME_FIELD_ERROR,
    EMAIL_FIELD_ERROR,
    FIRST_NAME_VALIDATION,
    LAST_NAME_VALIDATION,
    PASSWORD_VALIDATION,
    REPPASS_PASSWORD_MATCH_ERROR,
    REGISTER_CHECK_MESSAGE,
    usernameValidation,
    emailValidation,
    firstNameValidation,
    lastNameValidation,
    passwordValidation,
    repeatPassValidation,
    registerCheck
} from './../../utils/validations';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            repPass: ''
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password
        };

        const noValidationErrors = registerCheck(data, this.state.repPass);

        if (noValidationErrors) {
            this.props.register(data);
        } else {
            this.props.notify(REGISTER_CHECK_MESSAGE, 'error');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user.success && this.props.user && prevProps.user) {
            this.props.notify(this.props.user.message, 'success');
            this.props.notify('Please Log in!', 'success');
            this.props.history.push('/login');
        } else if (this.props.user.message && prevProps !== this.props) {
            this.props.notify(this.props.user.errors[0].msg, 'error');
        }
    }

    render() {
        return (
            <Fragment>
                <div className="form-wrapper">
                    <h1>Register</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <TextField
                                className="inputFieldsWidth"
                                id="username"
                                type="text"
                                name="username"
                                value={this.state.username}
                                label="Username"
                                onChange={this.onChangeHandler}
                                error={usernameValidation(this.state.username)}
                                helperText={usernameValidation(this.state.username) ? USERNAME_FIELD_ERROR : ''}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                className="inputFieldsWidth"
                                id="email"
                                type="text"
                                name="email"
                                value={this.state.email}
                                label="E-mail"
                                onChange={this.onChangeHandler}
                                error={emailValidation(this.state.email)}
                                helperText={emailValidation(this.state.email) ? EMAIL_FIELD_ERROR : ''}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                className="inputFieldsWidth"
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                label="First Name"
                                onChange={this.onChangeHandler}
                                error={firstNameValidation(this.state.firstName)}
                                helperText={firstNameValidation(this.state.firstName) ? FIRST_NAME_VALIDATION : ''}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                className="inputFieldsWidth"
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                label="Last Name"
                                onChange={this.onChangeHandler}
                                error={lastNameValidation(this.state.lastName)}
                                helperText={lastNameValidation(this.state.lastName) ? LAST_NAME_VALIDATION : ''}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                className="inputFieldsWidth"
                                id="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                label="Password"
                                onChange={this.onChangeHandler}
                                error={passwordValidation(this.state.password)}
                                helperText={passwordValidation(this.state.password) ? PASSWORD_VALIDATION : ''}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                className="inputFieldsWidth"
                                id="repPass"
                                type="password"
                                name="repPass"
                                value={this.state.repPass}
                                label="Repeat Password"
                                onChange={this.onChangeHandler}
                                error={repeatPassValidation(this.state.repPass, this.state.password)}
                                helperText={repeatPassValidation(this.state.repPass, this.state.password) ? REPPASS_PASSWORD_MATCH_ERROR : ''}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Register"
                        />
                    </form>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.register
    };
}

function mapDispatchToProps(dispatch) {
    return {
        register: (data) => dispatch(registerThunk(data))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginPage));
