import {
  MERGE_CATEGORIES,
  MERGE_POSTS,
  MERGE_COMMENTS,
  DEMERGE_COMMENTS_RELATED,
} from '../actions';

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
  [DEMERGE_COMMENTS_RELATED]: (state, { postId }) => {
    const comments =
      postId && postId !== ''
        ? Object.values(state.comments).filter(comment => comment.parentId !== postId)
        : state.comments;
    return {
      ...state,
      comments: {
        comments,
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
