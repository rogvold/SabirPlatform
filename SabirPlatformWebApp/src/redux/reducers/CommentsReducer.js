/**
 * Created by sabir on 25.03.17.
 */
import {Map, Stack, Set} from 'immutable'
import * as types from '../ActionTypes.js'

const initialState = {
    loading: false,
    commentsMap: Map(),
    error: undefined
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const CommentsReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.LOGOUT_SUCCESS:
            return initialState;

        case types.LOAD_COMMENTS:
            return startLoading(state, action)
        case types.LOAD_COMMENTS_FAIL:
            return stopLoading(state, action)
        case types.LOAD_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                commentsMap: state.commentsMap.merge(action.comments.reduce((map, comment) => {return map.set(comment.id, comment)}, Map()))
            }

        case types.CREATE_COMMENT:
            return startLoading(state, action)
        case types.CREATE_COMMENT_FAIL:
            return stopLoading(state, action)
        case types.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                commentsMap: state.commentsMap.set(action.comment.id, action.comment)
            }

        default:
            return state;
    }

}

export default CommentsReducer;