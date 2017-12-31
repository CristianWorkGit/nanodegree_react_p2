import { PostsAPI } from '../utils/api';
import { normalize } from 'normalizr';

import * as schemas from '../schemas';
import * as entities from './entities';

import {
  GET_POSTS,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_ERROR,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
} from '../actions';

export const getPosts = () => async dispatch => {
  dispatch({ type: GET_POSTS });

  try {
    console.log('CHEGOU1');
    const response = await PostsAPI.listAllPosts();
    console.log('CHEGOU2');
    console.log(response);
    return getPostsSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: GET_POSTS_ERROR, error });
  }
};

export const getPostsSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, [schemas.posts]);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));

  dispatch({ type: GET_POSTS_SUCCESS });

  return normalized.result;
};

export const getPost = postId => async dispatch => {
  dispatch({ type: GET_POST });

  try {
    const response = await PostsAPI.getPost(postId);
    return getPostSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: GET_POST_ERROR, error });
  }
};

export const getPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.posts);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));

  dispatch({ type: GET_POST_SUCCESS });

  return normalized.result;
};

export const editPost = (postId, changes) => async dispatch => {
  dispatch({ type: EDIT_POST });

  try {
    const response = await PostsAPI.updatePost(postId, changes);
    return editPostSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: EDIT_POST_ERROR, error });
  }
};

export const editPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.posts);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));

  dispatch({ type: EDIT_POST_SUCCESS });

  return normalized.result;
};

export const deletePost = postId => async dispatch => {
  dispatch({ type: DELETE_POST });

  try {
    const response = await PostsAPI.deletePost(postId);
    return deletePostSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: DELETE_POST_ERROR, error });
  }
};

export const deletePostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.posts);
  const { posts } = normalized.entities;

  dispatch(entities.demergePost(posts));

  dispatch({ type: DELETE_POST_SUCCESS });

  return normalized.result;
};

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
  [GET_POST]: state => ({
    error: null,
    isLoading: true,
  }),
  [GET_POST_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [GET_POST_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
  [EDIT_POST]: state => ({
    error: null,
    isLoading: true,
  }),
  [EDIT_POST_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [EDIT_POST_SUCCESS]: state => ({
    error: null,
    isLoading: false,
  }),
  [DELETE_POST]: state => ({
    error: null,
    isLoading: true,
  }),
  [DELETE_POST_ERROR]: (state, { error }) => ({
    error,
    isLoading: false,
  }),
  [DELETE_POST_SUCCESS]: state => ({
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
