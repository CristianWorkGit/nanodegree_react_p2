import { MERGE_CATEGORIES, MERGE_POSTS, MERGE_COMMENTS } from '../actions';

export const mergeCategories = (categories = {}) => ({
  type: MERGE_CATEGORIES,
  categories,
});

export const mergePosts = (posts = {}) => ({
  type: MERGE_POSTS,
  posts,
});

export const mergeComments = (comments = {}) => ({
  type: MERGE_COMMENTS,
  comments,
});
