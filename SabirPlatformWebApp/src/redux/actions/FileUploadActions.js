/**
 * Created by sabir on 19.02.17.
 */
import * as types from '../ActionTypes.js'

import XHRHelper from '../../helpers/XHRHelper'

let uploadImage_ = () => {
    return {
        type: types.UPLOAD_IMAGE
    }
}
let uploadImageFail = (err) => {
    return {
        type: types.UPLOAD_IMAGE_FAIL,
        error: err
    }
}
let uploadImageSuccess = (image) => {
    return {
        type: types.UPLOAD_IMAGE_SUCCESS,
        image: image
    }
}
export function uploadImage(file){
    return (dispatch, getState) => {
        if (file == undefined){
            return Promise.reject("file is empty");
        }
        dispatch(uploadImage_());
        return XHRHelper.uploadImageAsPromise(file).then(
            data => dispatch(uploadImageSuccess(data)),
            err => dispatch(uploadImageFail(err))
        )
    }
}

