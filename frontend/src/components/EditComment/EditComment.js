import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getComment, editComment } from '../../actions/comments';
import AddEditComment from '../AddEditComment';

const stateComments = state => Object.values(state.entities.comments);

const stateComment = (state, props) => {
  const { match } = props;
  return stateComments(state).filter(comment => comment.id === match.params.commentId)[0];
};

const mapStateToProps = (state, props) => ({
  comment: stateComment(state, props),
  history: props.history,
  match: props.match,
});

const mapActionCreators = {
  getComment,
  editComment,
};

class EditComment extends Component {
  componentDidMount() {
    const { getComment, match } = this.props;
    getComment(match.params.commentId);
  }

  handleOnSubmitForm = data => {
    const { editComment, history, match } = this.props;
    const { comment, ...otherProps } = data;

    editComment(comment.id, otherProps).then(() =>
      history.replace(`/${match.params.categoryName}/${match.params.postId}`)
    );
  };

  render() {
    const { comment, match } = this.props;

    return (
      <AddEditComment
        comment={comment}
        postId={match.params.postId}
        onSubmit={this.handleOnSubmitForm}
      />
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(EditComment);
