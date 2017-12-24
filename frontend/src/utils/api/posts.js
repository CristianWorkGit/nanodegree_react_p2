import { API_BASE, xhr } from '../../utils';

export const PostsAPI = {
  listAllPosts() {
    return xhr(`${API_BASE}/posts`, {
      method: 'GET',
    });
  },

  getPost(postId) {
    return xhr(`${API_BASE}/posts/${postId}`, {
      method: 'GET',
    });
  },
};

export default PostsAPI;
