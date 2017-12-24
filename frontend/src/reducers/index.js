import { combineReducers } from 'redux';

import entitiesReducer from './entities';
import categoryReducer from './category';
import postsReducer from './posts';

const rootReducer = combineReducers({
  category: categoryReducer,
  posts: postsReducer,
  entities: entitiesReducer,
});

export default rootReducer;
