import { connect } from 'react-redux';
import React, { Component } from 'react';

import { addComment } from '../../actions/comments';
import AddEditComment from '../AddEditComment';

const mapStateToProps = (state, props) => ({
  match: props.match,
  history: props.history,
});

const mapActionCreators = {
  addComment,
};

class AddComment extends Component {
  handleOnSubmitForm = data => {
    const { addComment, history, match } = this.props;

    addComment(data).then(() => history.replace(`/posts/${match.params.postId}/comments`));
  };

  render() {
    const { match } = this.props;

    return <AddEditComment postId={match.params.postId} onSubmit={this.handleOnSubmitForm} />;
  }
}

export default connect(mapStateToProps, mapActionCreators)(AddComment);
