import { combineReducers } from 'redux';

import entitiesReducer from './entities'
import categoryReducer from './category'

const rootReducer = combineReducers({
  category: categoryReducer,
  entities: entitiesReducer
});

export default rootReducer;