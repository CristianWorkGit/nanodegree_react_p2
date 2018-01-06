import { API_BASE, xhr } from '../../utils';

export const CommentsAPI = {
  listAllComments(postId) {
    return xhr(`${API_BASE}/posts/${postId}/comments`, {
      method: 'GET',
    });
  },

  getComment(commentId) {
    return xhr(`${API_BASE}/comments/${commentId}`, {
      method: 'GET',
    });
  },

  updateComment(commentId, changes) {
    return xhr(`${API_BASE}/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify(changes),
    });
  },

  createComment(data) {
    return xhr(`${API_BASE}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  voteComment(commentId, changes) {
    return xhr(`${API_BASE}/comments/${commentId}`, {
      method: 'POST',
      body: JSON.stringify(changes),
    });
  },

  deleteComment(commentId) {
    return xhr(`${API_BASE}/comments/${commentId}`, {
      method: 'DELETE',
    });
  },
};

export default CommentsAPI;
