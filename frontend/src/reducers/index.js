import { combineReducers } from 'redux';

import entitiesReducer from './entities';
import categoryReducer from './category';
import postsReducer from './posts';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  category: categoryReducer,
  posts: postsReducer,
  comments: commentsReducer,
  entities: entitiesReducer,
});

export default rootReducer;
