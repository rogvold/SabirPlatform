/**
 * Created by sabir on 19.02.17.
 */

import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {Provider} from 'react-redux';

//app
import App from './components/apps/App.js'

//api
import ParseAPI from './api/ParseAPI.js';

import * as usersActions from './redux/actions/UsersActions.js';

import {reducer} from './redux/reducers'

const loggerMiddleware = createLogger()

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)

ParseAPI.initParse();

class RootApp extends React.Component{

    render() {
        console.log('rendering app');
        return (
            <Provider store={store}>

                <App />

            </Provider>
        );
    }

}

ReactDOM.render(
    <RootApp />,
    document.querySelector('#main')
);



let init = () => {
    return (dispatch, getState) => {
        return dispatch(usersActions.initializeAuthorization())
            // .then(
            // (payload) => {
            //     if (payload == undefined || payload.user == undefined){
            //         return Promise.resolve();
            //     }
            //     let {user} = payload;
            //     return dispatch(sessionsActions.loadFriendsSessions(user.id));
            // }
            // )
    }
}

store.dispatch(init());