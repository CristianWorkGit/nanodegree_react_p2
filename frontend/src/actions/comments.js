import { CommentsAPI } from '../utils/api';
import { normalize } from 'normalizr';

import * as schemas from '../schemas';
import * as entities from './entities';

export const getComments = postId => async dispatch => {
  const response = await CommentsAPI.listAllComments(postId);
  return getCommentsSuccess({ response, dispatch });
};

export const getCommentsSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, [schemas.comments]);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  return normalized.result;
};

export const getComment = commentId => async dispatch => {
  const response = await CommentsAPI.getComment(commentId);
  return getCommentSuccess({ response, dispatch });
};

export const getCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  return normalized.result;
};

export const addComment = data => async dispatch => {
  const response = await CommentsAPI.createComment(data);
  return addCommentSuccess({ response, dispatch });
};

export const addCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  return normalized.result;
};

export const editComment = (commentId, changes) => async dispatch => {
  const response = await CommentsAPI.updateComment(commentId, changes);
  return editCommentSuccess({ response, dispatch });
};

export const editCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  return normalized.result;
};

export const deleteComment = commentId => async dispatch => {
  const response = await CommentsAPI.deleteComment(commentId);
  return deleteCommentSuccess({ response, dispatch });
};

export const deleteCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  return normalized.result;
};

export const voteComment = (commentId, changes) => async dispatch => {
  const response = await CommentsAPI.voteComment(commentId, changes);
  return voteCommentSuccess({ response, dispatch });
};

export const voteCommentSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, schemas.comments);
  const { comments } = normalized.entities;

  dispatch(entities.mergeComments(comments));

  return normalized.result;
};
