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
import {logoutThunk} from './actions/authActions.js';
import DetailsPage from './components/Details/DetailsPage';
import TicketsPage from './components/Tickets/TicketsPage';
import CreatePage from './components/Create/CreatePage';
import MyEvents from './components/User/MyEvents';
import MyTickets from './components/User/MyTickets';
import PendingApproval from "./components/Admin/PendingApproval";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: localStorage.getItem('isAdmin'),
            loggedIn: localStorage.getItem('username')
        };

        this.onLogoutHandler = this.onLogoutHandler.bind(this);
        this.notify = this.notify.bind(this);
    }

    onLogoutHandler() {
        this.setState({
            loggedIn: false,
            isAdmin: false
        });
        this.props.logout();
        this.props.history.push('/');
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user.success && this.props.user !== prevProps.user) {
            this.setState({
                loggedIn: true,
                isAdmin: this.props.user.isAdmin
            });
        }
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                loggedIn: true,
                isAdmin: localStorage.getItem('isAdmin')
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
        const {loggedIn, isAdmin} = this.state;
        return (
            <div className="App">
                <Header isAdmin={isAdmin} loggedIn={loggedIn} logout={this.onLogoutHandler}/>
                <ToastContainer/>
                <main style={{height: 'auto'}}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <HomePage {...props} isAdmin={isAdmin} loggedIn={loggedIn} notify={this.notify}/>
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
                            render={props => <CreatePage isAdmin={isAdmin} loggedIn={loggedIn} {...props} notify={this.notify}/>}
                        />
                        <Route
                            path="/myEvents"
                            render={props => <MyEvents {...props} notify={this.notify}/>}
                        />
                        <Route
                            path="/pending/events"
                            render={props => <PendingApproval isAdmin={isAdmin} loggedIn={loggedIn} {...props}
                                                              notify={this.notify}/>}
                        />
                        <Route
                            path="/myTickets"
                            render={props => <MyTickets {...props} notify={this.notify}/>}
                        />
                        <Route
                            path="/details/:type/:id"
                            render={props => <DetailsPage isAdmin={isAdmin} loggedIn={loggedIn} {...props} notify={this.notify}/>}
                        />
                        <Route path="/event/tickets/:id" component={TicketsPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </main>
                {/* <Footer /> */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.login
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logoutThunk())
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
