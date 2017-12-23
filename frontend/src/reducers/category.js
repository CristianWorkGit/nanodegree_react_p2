import { CategoryAPI } from '../utils/api';
import { normalize } from 'normalizr';

import * as schemas from '../schemas';
import * as entities from './entities';

import { GET_CATEGORIES, GET_CATEGORIES_ERROR, GET_CATEGORIES_SUCCESS } from '../actions';

/* Actions default */
export const getCategories = () => async dispatch => {
  dispatch({ type: GET_CATEGORIES });

  try {
    const response = await CategoryAPI.getCategories();
    return getCategoriesSuccess({ response, dispatch });
  } catch (error) {
    dispatch({ type: GET_CATEGORIES_ERROR, error });
  }
};

/* Actions getCategoriesSuccess */
export const getCategoriesSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response.categories, [schemas.category]);
  const { categories } = normalized.entities;

  dispatch(entities.mergeCategories(categories));

  dispatch({ type: GET_CATEGORIES_SUCCESS });

  return response;
};

/* Action Handler */
const ACTION_HANDLERS = {
  [GET_CATEGORIES]: state => ({
    error: null,
    isLoading: true
  }),
  [GET_CATEGORIES_ERROR]: (state, { error }) => ({
    error,
    isLoading: false
  }),
  [GET_CATEGORIES_SUCCESS]: state => ({
    error: null,
    isLoading: false
  })
};

export const initialState = {
  error: null,
  isLoading: false
};

export default function categoryReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
