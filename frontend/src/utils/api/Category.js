import { API_BASE, xhr } from '../../utils';

export const CategoryAPI = {
  getCategories() {
    return xhr(`${API_BASE}/categories`, {
      method: 'GET',
    });
  },

  getPostsCategory(category) {
    return xhr(`${API_BASE}/${category}/posts`, {
      method: 'GET',
    });
  },
};

export default CategoryAPI;
