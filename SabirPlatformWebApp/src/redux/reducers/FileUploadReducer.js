/**
 * Created by sabir on 19.02.17.
 */
import * as types from '../ActionTypes.js'
import {Map, OrderedMap, Set, List} from 'immutable';

const initialState = {
    loading: false,
    error: undefined,
    filesMap: Map(),
    imagesMap: Map()
}

const startLoading = (state, action) => {
    return { ...state, loading: true, error: undefined}
}

const stopLoading = (state, action) => {
    return { ...state, loading: false, error: action.error}
}

const FileUploadReducer =  (state = initialState, action = {}) => {

    switch (action.type) {

        case types.UPLOAD_IMAGE:
            return startLoading(state, action)

        case types.UPLOAD_IMAGE_FAIL:
            return stopLoading(state, action)

        case types.UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                imagesMap: state.imagesMap.set(action.image.url, action.image)
            }

        default:
            return state;
    }

}

export default FileUploadReducer;
