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

  updatePost(postId, changes) {
    return xhr(`${API_BASE}/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
    });
  },

  deletePost(postId) {
    return xhr(`${API_BASE}/posts/${postId}`, {
      method: 'DELETE',
    });
  },
};

export default PostsAPI;
