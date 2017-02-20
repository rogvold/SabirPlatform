/**
 * Created by sabir on 19.02.17.
 */

import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
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

//use this store if you do not want to support the redux-persist
// const store = createStore(
//     reducer,
//     applyMiddleware(thunkMiddleware, loggerMiddleware)
// )

//redux-persist
import {persistStore, autoRehydrate} from 'redux-persist'
import localForage from 'localforage'
import immutableTransform from 'redux-persist-transform-immutable'

const store = createStore(
    reducer,
    undefined,
    compose(
        applyMiddleware(thunkMiddleware, loggerMiddleware),
        autoRehydrate({log: true})
    )
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

persistStore(store, {storage: localForage, transforms: [immutableTransform()]}, () => {
    store.dispatch(init());
})

