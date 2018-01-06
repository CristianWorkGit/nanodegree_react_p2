import { connect } from 'react-redux';
import React, { Component } from 'react';

import { addComment } from '../../reducers/comments';
import AddEditComment from '../AddEditComment';

const mapStateToProps = (state, props) => ({
  postId: props.postId,
  history: props.history,
});

const mapActionCreators = {
  addComment,
};

class AddComment extends Component {
  handleOnSubmitForm = data => {
    const { addComment, history, postId } = this.props;

    addComment(data).then(() => history.replace(`/posts/${postId}/comments`));
  };

  render() {
    const { postId } = this.props;

    return <AddEditComment postId={postId} onSubmit={this.handleOnSubmitForm} />;
  }
}

export default connect(mapStateToProps, mapActionCreators)(AddComment);
