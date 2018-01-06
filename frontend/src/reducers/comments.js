import { CommentsAPI } from '../utils/api';
import { normalize } from 'normalizr';

import * as schemas from '../schemas';
import * as entities from './entities';

import {
  GET_COMMENTS,
  GET_COMMENTS_ERROR,
  GET_COMMENTS_SUCCESS,
  GET_COMMENT,
  GET_COMMENT_ERROR,
  GET_COMMENT_SUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
  ADD_COMMENT_SUCCESS,
  EDIT_COMMENT,
  EDIT_COMMENT_ERROR,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  VOTE_COMMENT,
  VOTE_COMMENT_ERROR,
  VOTE_COMMENT_SUCCESS,
} from '../actions';

export const getComments = postId => async dispatch => {
  dispatch({ type: GET_COMMENTS });

  try {
    const response = await CommentsAPI.listAllComments(postId);
    return getCommentsSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: GET_COMMENTS_ERROR, error });
  }
};

export const getCommentsSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, [schemas.comments]);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  dispatch({ type: GET_COMMENTS_SUCCESS });

  return normalized.result;
};

export const getComment = commentId => async dispatch => {
  dispatch({ type: GET_COMMENT });

  try {
    const response = await CommentsAPI.getComment(commentId);
    return getCommentSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: GET_COMMENT_ERROR, error });
  }
};

export const getCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  dispatch({ type: GET_COMMENT_SUCCESS });

  return normalized.result;
};

export const addComment = data => async dispatch => {
  dispatch({ type: ADD_COMMENT });

  try {
    const response = await CommentsAPI.createComment(data);
    return addCommentSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: ADD_COMMENT_ERROR, error });
  }
};

export const addCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  dispatch({ type: ADD_COMMENT_SUCCESS });

  return normalized.result;
};

export const editComment = (commentId, changes) => async dispatch => {
  dispatch({ type: EDIT_COMMENT });

  try {
    const response = await CommentsAPI.updateComment(commentId, changes);
    return editCommentSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: EDIT_COMMENT_ERROR, error });
  }
};

export const editCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  dispatch({ type: EDIT_COMMENT_SUCCESS });

  return normalized.result;
};

export const deleteComment = commentId => async dispatch => {
  dispatch({ type: DELETE_COMMENT });

  try {
    const response = await CommentsAPI.deleteComment(commentId);
    return deleteCommentSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: DELETE_COMMENT_ERROR, error });
  }
};

export const deleteCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  dispatch({ type: DELETE_COMMENT_SUCCESS });

  return normalized.result;
};

export const voteComment = (commentId, changes) => async dispatch => {
  dispatch({ type: VOTE_COMMENT });

  try {
    const response = await CommentsAPI.voteComment(commentId, changes);
    return voteCommentSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: VOTE_COMMENT_ERROR, error });
  }
};

export const voteCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  dispatch({ type: VOTE_COMMENT_SUCCESS });

  return normalized.result;
};

const ACTION_HANDLERS = {
  [GET_COMMENTS]: state => ({
    error: null,
    isLoading: true,
  }),
  [GET_COMMENTS_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [GET_COMMENTS_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
  [GET_COMMENT]: state => ({
    error: null,
    isLoading: true,
  }),
  [GET_COMMENT_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [GET_COMMENT_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
  [EDIT_COMMENT]: state => ({
    error: null,
    isLoading: true,
  }),
  [EDIT_COMMENT_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [EDIT_COMMENT_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
  [ADD_COMMENT]: state => ({
    error: null,
    isLoading: true,
  }),
  [ADD_COMMENT_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [ADD_COMMENT_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
  [DELETE_COMMENT]: state => ({
    error: null,
    isLoading: true,
  }),
  [DELETE_COMMENT_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [DELETE_COMMENT_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
  [VOTE_COMMENT]: state => ({
    error: null,
    isLoading: true,
  }),
  [VOTE_COMMENT_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [VOTE_COMMENT_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
};

export const initialState = {
  error: null,
  isLoading: false,
};

export default function commentsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
