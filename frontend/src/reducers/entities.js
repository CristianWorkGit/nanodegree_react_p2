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

/* Action Handler */
const ACTION_HANDLERS = {
  [MERGE_CATEGORIES]: (state, { categories }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        ...categories,
      },
    };
  },
  [MERGE_POSTS]: (state, { posts }) => {
    return {
      ...state,
      posts: {
        ...state.posts,
        ...posts,
      },
    };
  },
  [MERGE_COMMENTS]: (state, { comments }) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        ...comments,
      },
    };
  },
};

/* Initial state default */
export const initialState = {
  categories: {},
  posts: {},
  comments: {},
};

export default function entitiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
