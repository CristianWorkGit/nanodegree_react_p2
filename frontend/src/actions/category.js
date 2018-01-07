import { CategoryAPI } from '../utils/api';
import { normalize } from 'normalizr';

import * as schemas from '../schemas';
import * as entities from './entities';

export const getCategories = () => async dispatch => {
  const response = await CategoryAPI.getCategories();
  return getCategoriesSuccess({ response, dispatch });
};

export const getCategoriesSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response.categories, [schemas.category]);
  const { categories } = normalized.entities;

  dispatch(entities.mergeCategories(categories));

  return response;
};
