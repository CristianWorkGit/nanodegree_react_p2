import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getPost, editPost } from '../../reducers/posts';
import AddEditPost from '../AddEditPost/AddEditPost';

const stateCategories = state => Object.values(state.entities.categories);
const statePosts = state => Object.values(state.entities.posts);

const statePost = (state, props) => {
  const postId = props.postId;
  return statePosts(state).filter(post => post.id === postId)[0];
};

const mapStateToProps = (state, props) => ({
  post: statePost(state, props),
  categories: stateCategories(state),
  postId: props.postId,
});

const mapActionCreators = {
  getPost,
  editPost,
};

class EditPost extends Component {
  componentDidMount() {
    const { getPost, postId } = this.props;
    getPost(postId);
  }

  handleOnSubmitForm = data => {
    const { editPost } = this.props;
    const { post, ...otherProps } = data;

    editPost(post.id, otherProps);
  };

  render() {
    const { post, categories } = this.props;

    return <AddEditPost post={post} categories={categories} onSubmit={this.handleOnSubmitForm} />;
  }
}

export default connect(mapStateToProps, mapActionCreators)(EditPost);
