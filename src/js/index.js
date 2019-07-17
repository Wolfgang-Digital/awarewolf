import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiActions } from './actions';
import { ProtectedRoute } from './shared';
import {
	Header,
	Login,
	PostList,
	Post,
	CreatePost,
	MessageHandler,
	AutoRedirect,
	LoadingIcon,
	UserProfile,
	AdminDashboard,
	Rules,
	CreateSurvey,
	PollSurveyList,
	Survey,
	PasswordReset
} from './components';

const REDIRECT_TIMEOUT = 1000 * 2;

const mapStateToProps = state => {
	return { 
		loggedIn: state.apiState.loggedIn,
		awaitingResponse: state.apiState.awaitingResponse,
		user: state.apiState.user
	 };
};

const mapDispatchToProps = dispatch => {
  return {
    tryGetUserFromStorage: () => dispatch(apiActions.tryGetUserFromStorage())
  };
};

class App extends Component {
	componentDidMount() {
		if (!this.props.loggedIn) this.props.tryGetUserFromStorage();
	}

	render() {
		return (
			<Router>
				<React.Fragment>
					<Header />
					<LoadingIcon loading={this.props.awaitingResponse} />
					<AutoRedirect />
					<MessageHandler />
					<Switch>
						<ProtectedRoute 
							exact path='/' 
							component={PostList} 
							redirectPath='/login' 
							authorised={this.props.loggedIn} 
							timeout={REDIRECT_TIMEOUT}
						/>
						<Route exact path='/reset-password/:resetToken' component={PasswordReset} />
						<Route exact path='/login' component={Login} />
						<ProtectedRoute 
							exact path='/low-down' 
							component={Rules} 
							redirectPath='/login' 
							authorised={this.props.loggedIn} 
							timeout={REDIRECT_TIMEOUT}
						/>
						<ProtectedRoute 
							exact path='/posts' 
							component={PostList} 
							redirectPath='/login' 
							authorised={this.props.loggedIn} 
							timeout={REDIRECT_TIMEOUT}
						/>
						<ProtectedRoute 
							exact path='/posts/:postId' 
							component={Post} 
							redirectPath='/login' 
							authorised={this.props.loggedIn}
							timeout={REDIRECT_TIMEOUT}
						/>
						<ProtectedRoute 
							exact path='/create-post' 
							component={CreatePost} 
							redirectPath='/login' 
							authorised={this.props.loggedIn}
							timeout={REDIRECT_TIMEOUT}
						/>
						<ProtectedRoute 
							exact path='/admin' 
							component={AdminDashboard} 
							redirectPath='/' 
							authorised={this.props.loggedIn && this.props.user.roles.includes('admin')} 
							timeout={REDIRECT_TIMEOUT}
						/>
						<ProtectedRoute 
							exact path='/create-survey' 
							component={CreateSurvey} 
							redirectPath='/' 
							authorised={this.props.loggedIn && this.props.user.roles.includes('admin')} 
							timeout={REDIRECT_TIMEOUT}
						/>
						<ProtectedRoute 
							exact path='/me' 
							component={UserProfile} 
							redirectPath='/login' 
							authorised={this.props.loggedIn} 
							timeout={REDIRECT_TIMEOUT}
						/>
						<ProtectedRoute 
							exact path='/surveys/:surveyId' 
							component={Survey} 
							redirectPath='/login' 
							authorised={this.props.loggedIn}
							timeout={REDIRECT_TIMEOUT}
						/>
						<ProtectedRoute 
							exact path='/surveys' 
							component={PollSurveyList} 
							redirectPath='/login' 
							authorised={this.props.loggedIn} 
							timeout={REDIRECT_TIMEOUT}
						/>
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}

App.propTypes = {
	tryGetUserFromStorage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
