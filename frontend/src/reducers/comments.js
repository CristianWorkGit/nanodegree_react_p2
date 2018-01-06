import { CommentsAPI } from '../utils/api';
import { normalize } from 'normalizr';

import * as schemas from '../schemas';
import * as entities from './entities';

import { GET_COMMENTS, GET_COMMENTS_ERROR, GET_COMMENTS_SUCCESS } from '../actions';

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
};

export const initialState = {
  error: null,
  isLoading: false,
};

export default function commentsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
