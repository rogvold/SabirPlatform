/**
 * Created by sabir on 19.02.17.
 */
import { combineReducers } from 'redux';

import UsersReducer from './UsersReducer.js';
import FileUploadReducer from './FileUploadReducer.js';

// import SessionsReducer from './SessionsReducer.js';
// import PusherReducer from './PusherReducer.js';
// import NotesReducer from './NotesReducer.js';
// import ECGViewerReducer from './ECGViewerReducer.js';


export const reducer = combineReducers({
    users: UsersReducer,
    upload: FileUploadReducer
    // sessions: SessionsReducer,
    // notes: NotesReducer,
    // pusher: PusherReducer,
    // ecg: ECGViewerReducer,

});