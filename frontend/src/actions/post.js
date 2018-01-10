import { PostsAPI } from '../utils/api';
import { normalize } from 'normalizr';

import * as schemas from '../schemas';
import * as entities from './entities';

export const getPosts = () => async dispatch => {
  const response = await PostsAPI.listAllPosts();
  return getPostsSuccess({ response, dispatch });
};

export const getPostsSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, [schemas.posts]);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));

  return normalized.result;
};

export const getPost = postId => async dispatch => {
  const response = await PostsAPI.getPost(postId);
  return getPostSuccess({ response, dispatch });
};

export const getPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.posts);
  const { posts } = normalized.entities;

  if (Object.keys(response).length) {
    dispatch(entities.mergePosts(posts));
  }

  return normalized.result;
};

export const addPost = data => async dispatch => {
  const response = await PostsAPI.createPost(data);
  return addPostSuccess({ response, dispatch });
};

export const addPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.posts);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));

  return normalized.result;
};

export const editPost = (postId, changes) => async dispatch => {
  const response = await PostsAPI.updatePost(postId, changes);
  return editPostSuccess({ response, dispatch });
};

export const editPostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.posts);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));

  return normalized.result;
};

export const votePost = (postId, changes) => async dispatch => {
  const response = await PostsAPI.votePost(postId, changes);
  return votePostSuccess({ response, dispatch });
};

export const votePostSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.posts);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));

  return normalized.result;
};

export const deletePost = postId => async dispatch => {
  const response = await PostsAPI.deletePost(postId);
  return deletePostSuccess({ response, dispatch });
};

export const deletePostSuccess = ({ response, dispatch }) => {
  const postId = response.id;
  const normalized = normalize(response, schemas.posts);
  const { posts } = normalized.entities;

  dispatch(entities.mergePosts(posts));
  dispatch(entities.demergeCommentsRelatedToPost(postId));

  return normalized.result;
};
