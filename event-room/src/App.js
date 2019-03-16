import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import HomePage from './components/Home/HomePage';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import NotFound from './components/Common/NotFound';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer, toast} from 'react-toastify';
import {logoutThunk} from './actions/authActions';
import {removeEventThunk} from './actions/eventActions';
import DetailsPage from './components/Details/DetailsPage';
import TicketsPage from './components/Tickets/TicketsPage';
import CreatePage from './components/Create/CreatePage';
import EditPage from './components/Edit/EditPage';
import MyEvents from './components/User/MyEvents';
import MyTickets from './components/User/MyTickets';
import PendingApproval from './components/Admin/PendingApproval';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: localStorage.getItem('isAdmin'),
            loggedIn: !!(localStorage.getItem('username')),
            userId: localStorage.getItem('userId')
        };

        this.onLogoutHandler = this.onLogoutHandler.bind(this);
        this.onRemoveHandler = this.onRemoveHandler.bind(this);
        this.notify = this.notify.bind(this);
    }

    async onRemoveHandler(id) {
        try {
            await this.props.removeEvent(id);
            this.notify('Event Removed Successfully!', 'success');
            this.props.history.push('/');
        } catch (error) {
            this.notify(error.message, 'error');
        }
    }

    onLogoutHandler() {
        this.setState({
            loggedIn: false,
            isAdmin: false,
            userId: ''
        });
        this.props.logout();
        this.props.history.push('/');
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.user.success && this.props.user !== prevProps.user) {
            this.setState({
                loggedIn: !!this.props.user.username,
                isAdmin: this.props.user.isAdmin,
                userId: this.props.user.userId
            });
        }
    }


    componentDidMount() {
        if (!!localStorage.getItem('token')) {
            this.setState({
                loggedIn: !!(localStorage.getItem('username')),
                isAdmin: localStorage.getItem('isAdmin'),
                userId: localStorage.getItem('userId')
            });
        } else {
            this.props.history.push('/login');
        }
    }


    notify(message, type) {
        toast[type](message, {
            closeButton: false,
            position: 'top-center'
        });
    }

    render() {
        const {loggedIn, isAdmin, userId} = this.state;

        return (
            <div className="App">
                <Header
                    isAdmin={isAdmin}
                    loggedIn={loggedIn}
                    userId={userId}
                    logout={this.onLogoutHandler}
                />
                <ToastContainer/>
                <main style={{height: 'auto'}}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <HomePage
                                    {...props}
                                    isAdmin={isAdmin}
                                    removeEvent={this.onRemoveHandler}
                                    loggedIn={loggedIn}
                                    userId={userId}
                                    notify={this.notify}
                                />
                            )}
                        />
                        <Route
                            path="/login"
                            render={props => <LoginPage {...props} notify={this.notify}/>}
                        />
                        <Route
                            path="/register"
                            render={props => <RegisterPage {...props} notify={this.notify}/>}
                        />
                        <Route
                            path="/create/event"
                            render={props => (
                                <CreatePage
                                    isAdmin={isAdmin}
                                    loggedIn={loggedIn}
                                    userId={userId}
                                    {...props}
                                    notify={this.notify}
                                />
                            )}
                        />
                        <Route
                            path="/edit/event/:id"
                            render={props => (
                                <EditPage
                                    isAdmin={isAdmin}
                                    loggedIn={loggedIn}
                                    userId={userId}
                                    {...props}
                                    notify={this.notify}
                                />
                            )}
                        />
                        <Route
                            path="/myEvents"
                            render={props => (
                                <MyEvents
                                    {...props}
                                    removeEvent={this.onRemoveHandler}
                                    notify={this.notify}
                                />
                            )}
                        />
                        <Route
                            path="/pending/events"
                            render={props => (
                                <PendingApproval
                                    removeEvent={this.onRemoveHandler}
                                    isAdmin={isAdmin}
                                    loggedIn={loggedIn}
                                    userId={userId}
                                    {...props}
                                    notify={this.notify}
                                />
                            )}
                        />
                        <Route
                            path="/myTickets"
                            render={props => <MyTickets {...props} notify={this.notify}/>}
                        />
                        <Route
                            path="/details/:type/:id"
                            render={props => (
                                <DetailsPage
                                    isAdmin={isAdmin}
                                    loggedIn={loggedIn}
                                    userId={userId}
                                    {...props}
                                    notify={this.notify}
                                />
                            )}
                        />
                        <Route
                            path="/event/tickets/:id"
                            render={props => (
                                <TicketsPage
                                    isAdmin={isAdmin}
                                    loggedIn={loggedIn}
                                    userId={userId}
                                    {...props}
                                    notify={this.notify}
                                />
                            )}
                        />
                        <Route component={NotFound}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login,
        event: state.events
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutThunk()),
        removeEvent: (eventId) => dispatch(removeEventThunk(eventId))
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
