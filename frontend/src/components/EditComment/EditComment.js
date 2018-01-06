import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getComment, editComment } from '../../reducers/comments';
import AddEditComment from '../AddEditComment';

const stateComments = state => Object.values(state.entities.comments);

const stateComment = (state, props) => {
  const { commentId } = props;
  return stateComments(state).filter(comment => comment.id === commentId)[0];
};

const mapStateToProps = (state, props) => ({
  comment: stateComment(state, props),
  history: props.history,
  postId: props.postId,
  commentId: props.commentId,
});

const mapActionCreators = {
  getComment,
  editComment,
};

class EditComment extends Component {
  componentDidMount() {
    const { getComment, commentId } = this.props;
    getComment(commentId);
  }

  handleOnSubmitForm = data => {
    const { editComment, history, postId } = this.props;
    const { comment, ...otherProps } = data;

    editComment(comment.id, otherProps).then(() => history.replace(`/posts/${postId}/comments`));
  };

  render() {
    const { comment, postId } = this.props;

    return <AddEditComment comment={comment} postId={postId} onSubmit={this.handleOnSubmitForm} />;
  }
}

export default connect(mapStateToProps, mapActionCreators)(EditComment);
