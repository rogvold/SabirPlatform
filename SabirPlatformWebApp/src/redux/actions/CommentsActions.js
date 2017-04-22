/**
 * Created by sabir on 25.03.17.
 */

import * as types from '../ActionTypes'
import ParseAPI from '../../api/ParseAPI';
import CommentsAPI from '../../api/CommentsAPI';

let loadComments_ = () => {
    if (__DEV__){
        console.log('loadComments_ occured');
    }
    return {
        type: types.LOAD_COMMENTS
    }
}

let loadCommentsFail = (err) => {
    return {
        type: types.LOAD_COMMENTS_FAIL,
        error: err
    }
}

let loadCommentsSuccess = (comments) => {
    return {
        type: types.LOAD_COMMENTS_SUCCESS,
        comments: comments
    }
}
//thunk
export function loadPhotosComments() {
    if (__DEV__){
        console.log('loadPhotosComments occured');
    }
    return (dispatch, getState) => {
        let {commentsMap} = getState().comments;
        let {photosMap} = getState().photos;
        let photosIds = photosMap.toArray().map(p => p.id);
        dispatch(loadComments_())
        return ParseAPI.getFreshObjects('Comment', commentsMap, {containedIn: [['relatedId', photosIds]]}, CommentsAPI.transformComment).then(
            comments => dispatch(loadCommentsSuccess(comments))),
            err => dispatch(loadCommentsFail(err))
    }
}

export function loadRelatedComments(relatedId) {
    return (dispatch, getState) => {
        let {commentsMap} = getState().comments;
        let {photosMap} = getState().photos;
        dispatch(loadComments_())
        return ParseAPI.getFreshObjects('Comment', commentsMap, {equalTo: [['relatedId', relatedId]]}, CommentsAPI.transformComment).then(
            comments => dispatch(loadCommentsSuccess(comments))),
            err => dispatch(loadCommentsFail(err))
    }
}

//
let createComment_ = () => {
    return {
        type: types.CREATE_COMMENT
    }
}

let createCommentFail = (err) => {
    return {
        type: types.CREATE_COMMENT_FAIL,
        error: err
    }
}

let createCommentSuccess = (comment) => {
    return {
        type: types.CREATE_COMMENT_SUCCESS,
        comment: comment
    }
}

export function createComment(data){
    return (dispatch, getState) => {
        if (data == undefined || data.relatedId == undefined){
            return;
        }
        dispatch(createComment_());
        return ParseAPI.createObject('Comment', data, CommentsAPI.transformComment).then(
            comment => dispatch(createCommentSuccess(comment)),
            err => dispatch(createCommentFail(err))
        )
    }
}