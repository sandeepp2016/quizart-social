import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Router, Route, Link, hashHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import LoginView from './views/LoginView'; //Login Form of Sagar
import LoginForm from './views/Login';
import DashboardView from './views/DashboardView';
import ChangePasswordView from './views/MyAccount/ChangePasswordView';
import Topics from './views/allTopics/allTopics';
import Tournaments from './views/allTournaments/alltournaments';
import EachTopicsPage from './views/EachTopicsPage';
import Quiz from './views/QuizPlay';
import SignUP from './views/SignUP';
import AuthSuccess from './views/AuthSuccess';
import TwitterAuthSuccess from './views/TwitterAuthSuccess';

import cookie from 'react-cookie';
import LeaderBoard from './views/LeaderBoard';
import ContextComponent from './context';
import CreateTournament from './views/CreateTournament';
import TournamentsContainer from './views/TournamentsContainer';
import ProfilePage from './views/ProfilePage';

const verifyLogin = function(nextState, replace) {
  if(!localStorage.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  };
};

const handleLoginEnter = function(nextState, replace) {
  if(localStorage.token) {
    replace({
      pathname: '/'
    });
  }
};



const clearLogin = function(nextState, replace) {
  delete localStorage.token;
};

ReactDOM.render(
  <ContextComponent>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={hashHistory}>
      <Route path="/login" component={LoginView} onEnter={handleLoginEnter} />
      <Route path="/" component={DashboardView} onEnter={verifyLogin} />
      <Route path="/SignUP" component={SignUP}/>
      <Route path="/topics" component={Topics} onEnter={verifyLogin} />
      <Route path="/tournaments" component={Tournaments} onEnter={verifyLogin} />
      <Route path="/authsuccess/:token" component={AuthSuccess} />
      <Route path="/twitterauthsuccess/:token" component={TwitterAuthSuccess} />
      <Route name="quiz" path="/quiz/:isTournament/:knockoutId" component={Quiz} />
      <Route path="/ProfilePage/:username" component={ProfilePage}/>
      <Route path="/eachTopic/:id" component={EachTopicsPage} onEnter={verifyLogin} />
      <Route name="leaderboard" path="/board/:id" component={LeaderBoard} />
      <Route path="my-account/change-password" component={ChangePasswordView} onEnter={verifyLogin} />
      <Route path="/create" component={CreateTournament} onEnter={verifyLogin}/>
      <Route path="/tournament" component={TournamentsContainer} onEnter={verifyLogin}/>
    </Router>
  </MuiThemeProvider>
  </ContextComponent>
, document.getElementById('root'));
