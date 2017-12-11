import * as schemas from '../schemas';

import { MERGE_CATEGORIES } from '../actions';

export const mergeCategories = (categories = {}) => ({
  type: MERGE_CATEGORIES,
  categories,
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
};

/* Initial state default */
export const initialState = {
  posts: {},
  comments: {},
  categories: {},
};

export default function entitiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
