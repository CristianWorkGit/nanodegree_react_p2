import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getPost } from '../../reducers/posts';
import { getComments } from '../../reducers/comments';
import FILTERS from '../../utils/constants/FILTERS';

import sortBy from 'sort-by';

const statePosts = state => Object.values(state.entities.posts);
const statePost = (state, props) => {
  const { postId } = props;
  return statePosts(state).filter(post => post.id === postId)[0];
};

const stateComments = (state, props) => {
  const { postId = '' } = props;
  const sortByProp = FILTERS.filter(
    fieldToFilter => fieldToFilter.value === props.selectedFilter
  )[0];

  return Object.values(state.entities.comments)
    .filter(comment => {
      if (comment.deleted) {
        return false;
      }
      if (postId && comment.parentId !== postId) {
        return false;
      }

      return true;
    })
    .sort(sortBy(`${sortByProp.apiValue}`));
};

const mapStateToProps = (state, props) => ({
  post: statePost(state, props),
  comments: stateComments(state, props),
  postId: props.postId,
  selectedFilter: props.selectedFilter,
});

const mapActionCreators = {
  getPost,
  getComments,
};

class ListComments extends Component {
  componentDidMount() {
    const { getPost, postId, getComments } = this.props;
    getPost(postId).then(result => {
      getComments(postId);
    });
  }

  render() {
    const { post, comments } = this.props;
    return (
      <div className="comments">
        <div className="post-header">
          <h1 className="post-title">{post.title}</h1>
        </div>
        <div className="comments-list">
          {comments.length === 0 && <h4 className="red-text">{'> No comments found <'}</h4>}
          {comments &&
            comments.length > 0 &&
            comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-options" />
                <div className="comment-body">
                  <span className="comment-content">{comment.body}</span>
                </div>
                <div className="comment-info">
                  <span className="comment-author">
                    <strong>Author:</strong> {comment.author}
                  </span>
                  <span className="comment-author">
                    <strong>Vote Score:</strong> {comment.voteScore}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListComments);
