import { PostsAPI } from '../utils/api';
import { normalize } from 'normalizr';

import * as schemas from '../schemas';
import * as entities from './entities';

import { GET_POSTS, GET_POSTS_ERROR, GET_POSTS_SUCCESS } from '../actions';

/* Actions default */
export const getPosts = () => async dispatch => {
  dispatch({ type: GET_POSTS });

  try {
    const response = await PostsAPI.listAllPosts();
    return getPostsSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: GET_POSTS_ERROR, error });
  }
};

/* Actions getCategoriesSuccess */
export const getPostsSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, [schemas.posts]);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));

  dispatch({ type: GET_POSTS_SUCCESS });

  return normalized.result;
};

/* Action Handler */
const ACTION_HANDLERS = {
  [GET_POSTS]: state => ({
    error: null,
    isLoading: true,
  }),
  [GET_POSTS_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [GET_POSTS_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
};

export const initialState = {
  error: null,
  isLoading: false,
};

export default function postsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
