import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getPost, editPost } from '../../actions/post';
import AddEditPost from '../AddEditPost';

const stateCategories = state => Object.values(state.entities.categories);
const statePosts = state => Object.values(state.entities.posts);

const statePost = (state, props) => {
  const { match } = props;
  return statePosts(state).filter(post => post.id === match.params.postId)[0];
};

const mapStateToProps = (state, props) => ({
  post: statePost(state, props),
  categories: stateCategories(state),
  history: props.history,
  match: props.match,
});

const mapActionCreators = {
  getPost,
  editPost,
};

class EditPost extends Component {
  componentDidMount() {
    const { getPost, match } = this.props;
    getPost(match.params.postId);
  }

  handleOnSubmitForm = data => {
    const { editPost, history } = this.props;
    const { post, ...otherProps } = data;

    editPost(post.id, otherProps).then(() => history.replace(`/${post.category}/${post.id}`));
  };

  render() {
    const { post, categories } = this.props;

    return <AddEditPost post={post} categories={categories} onSubmit={this.handleOnSubmitForm} />;
  }
}

export default connect(mapStateToProps, mapActionCreators)(EditPost);
