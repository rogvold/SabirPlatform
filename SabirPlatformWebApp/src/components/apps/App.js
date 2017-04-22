/**
 * Created by sabir on 19.02.17.
 */

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Router, Route, browserHistory, useRouterHistory, hashHistory, IndexRoute } from 'react-router';
import { createHashHistory } from 'history'
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

//apps
import UserIndexApp from './UserIndexApp';
import LoginApp from './LoginApp';
import SettingsApp from './SettingsApp';

import DevApp from './DevApp';

// import DevApp from './DevApp.js';

// import APIPlaygroundApp from './APIPlaygroundApp.js';
// import EmulatorApp from './EmulatorApp.js';
// import UsersApp from './UsersApp.js';
// import DevicesApp from './DevicesApp.js';


class App extends React.Component {

    static defaultProps = {}

    static propTypes = {
        currentUser: PropTypes.object,
        initialized: PropTypes.bool
    }

    state = {}

    //ES5 - componentWillMount
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    getUserRoute() {

        console.log('getUserRoute occured');

        return (
            <Router history={hashHistory} >

                <Route useAutoKeys={false} path="/" component={UserIndexApp} >
                    <IndexRoute component={UserIndexApp} />
                </Route>

                <Route path="/settings" component={SettingsApp}/>

                <Route path="/dev" component={DevApp}/>


            </Router>
        );
    }

    render() {
        let {initialized, currentUser} = this.props;
        console.log('rendering App: initialized, currentUser = ', initialized, currentUser);

        if (initialized == undefined || initialized == false){
            return (
                <div className={'initializing_placeholder'} >
                    загрузка...
                </div>
            );
        }

        if (currentUser == undefined){
            return (
                <LoginApp />
            );
        }

        return this.getUserRoute();
    }

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.users.currentUserId == undefined ? undefined : state.users.usersMap.get(state.users.currentUserId),
        initialized: state.users.initialized
    }
}

App = connect(mapStateToProps, null)(App)

export default App