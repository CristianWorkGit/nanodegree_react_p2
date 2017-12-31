import { MERGE_CATEGORIES, MERGE_POSTS, DEMERGE_POST } from '../actions';

export const mergeCategories = (categories = {}) => ({
  type: MERGE_CATEGORIES,
  categories,
});

export const mergePosts = (posts = {}) => ({
  type: MERGE_POSTS,
  posts,
});

export const demergePost = (post = {}) => ({
  type: DEMERGE_POST,
  post,
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
  [DEMERGE_POST]: (state, { post }) => {
    const { ...posts } = state.posts;
    delete posts[post];

    return {
      ...state,
      posts: {
        ...posts,
      },
    };
  },
};

/* Initial state default */
export const initialState = {
  categories: {},
  posts: {},
};

export default function entitiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
