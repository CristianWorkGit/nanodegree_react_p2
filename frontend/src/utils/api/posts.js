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

  createPost(data) {
    return xhr(`${API_BASE}/posts`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  votePost(postId, changes) {
    return xhr(`${API_BASE}/posts/${postId}`, {
      method: 'POST',
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
