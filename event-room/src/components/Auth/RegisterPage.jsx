import React, { Component, Fragment } from 'react';
import { TextField } from '@material-ui/core';
import { registerThunk } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
        this.setState({ [e.target.name]: e.target.value });
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
        this.props.register(data);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user.success) {
            this.props.notify(this.props.user.message, 'success');
            this.props.history.push('/');
        } else if (this.props.user.message && prevProps !== this.props) {
            this.props.notify(this.props.user.errors[0].msg, 'error');
        }
    }

    render() {
        return (
            <Fragment>
                <div className="form-wrapper">
                    <h1>Login</h1>
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
                                error={false}
                                helperText={false}
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
                                error={false}
                                helperText={false}
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
                                error={false}
                                helperText={false}
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
                                error={false}
                                helperText={false}
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
                                error={false}
                                helperText={false}
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
                                error={false}
                                helperText={false}
                            />
                        </div>
                        <input type="submit" value="Register" />
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
