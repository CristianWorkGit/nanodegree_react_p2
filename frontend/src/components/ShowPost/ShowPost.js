import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getPost, deletePost, votePost } from '../../actions/post';
import { getComments, deleteComment, voteComment } from '../../actions/comments';
import FILTERS from '../../utils/constants/FILTERS';
import Post from '../Post';

import sortBy from 'sort-by';

const statePosts = (state, props) => {
  return Object.values(state.entities.posts).filter(post => {
    if (post.deleted) {
      return false;
    }
    return true;
  });
};

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
  deletePost,
  votePost,
  getComments,
  deleteComment,
  voteComment,
};

class ListComments extends Component {
  static defaultProps = {
    post: {},
    comments: [],
  };

  componentDidMount() {
    const { getPost, postId, getComments } = this.props;
    getPost(postId).then(result => {
      getComments(postId);
    });
  }

  onClickDelete = postId => {
    const { deletePost, history } = this.props;
    deletePost(postId).then(() => history.replace(`/`));
  };

  onClickVote = (postId, value) => {
    const { votePost } = this.props;

    const changes = {
      option: value,
    };

    votePost(postId, changes);
  };

  onClickDeleteComment = commentId => {
    const { deleteComment } = this.props;
    deleteComment(commentId);
  };

  onClickVoteComment = (commentId, value) => {
    const { voteComment } = this.props;

    const changes = {
      option: value,
    };

    voteComment(commentId, changes);
  };

  render() {
    const { post, comments } = this.props;
    return (
      <div>
        {!Object.keys(post).length && <h4 className="red-text">{'> This post doesn`t exist <'}</h4>}
        {Object.keys(post).length && (
          <Post
            post={post}
            comments={comments}
            showDetails={true}
            onClickDelete={this.onClickDelete}
            onClickVote={this.onClickVote}
            onClickVoteComment={this.onClickVoteComment}
            onClickDeleteComment={this.onClickDeleteComment}
          />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListComments);
