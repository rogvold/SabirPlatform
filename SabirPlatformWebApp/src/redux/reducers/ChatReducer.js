/**
 * Created by sabir on 07.03.17.
 */
import {Map, Stack, Set} from 'immutable'
import * as types from '../ActionTypes.js'

const initialState = {
    loading: false,
    messagesMap: Map(),
    error: undefined,
    selectedUserId: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const ChatReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                messagesMap: Map()
            }

        case types.LOAD_MESSAGES:
            return startLoading(state, action)
        case types.LOAD_MESSAGES_FAIL:
            return stopLoading(state, action)
        case types.LOAD_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messagesMap: state.messagesMap.merge(action.messages.reduce((map, message) => {return map.set(message.id, message)}, Map()))
            }

        case types.CREATE_MESSAGE:
            return startLoading(state, action)
        case types.CREATE_MESSAGE_FAIL:
            return stopLoading(state, action)
        case types.CREATE_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                messagesMap: state.messagesMap.set(action.message.id, action.message)
            }

        case types.VIEW_MESSAGES:
            return {
                ...state
            }

        case types.VIEW_MESSAGES_FAIL:
            return {
                ...state
            }

        case types.VIEW_MESSAGES_SUCCESS:
            return {
                ...state,
                messagesMap: state.messagesMap.merge(action.messages.reduce((map, message) => {return map.set(message.id, message)}, Map()))
            }

        case types.SELECT_CHAT_USER:
            return {
                ...state,
                selectedUserId: action.id
            }
        case types.UNSELECT_CHAT_USER:
            return {
                ...state,
                selectedUserId: undefined
            }


        default:
            return state;
    }

}

export default ChatReducer;