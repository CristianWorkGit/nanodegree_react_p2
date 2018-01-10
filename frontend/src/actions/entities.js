import {
  MERGE_CATEGORIES,
  MERGE_POSTS,
  MERGE_COMMENTS,
  DEMERGE_COMMENTS_RELATED,
} from '../actions';

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

export const demergeCommentsRelatedToPost = (postId = '') => ({
  type: DEMERGE_COMMENTS_RELATED,
  postId,
});
