import { connect } from 'react-redux';
import React, { Component } from 'react';

import { addPost } from '../../reducers/posts';
import AddEditPost from '../AddEditPost/AddEditPost';

const stateCategories = state => Object.values(state.entities.categories);

const mapStateToProps = (state, props) => ({
  categories: stateCategories(state),
  history: props.history,
});

const mapActionCreators = {
  addPost,
};

class AddPost extends Component {
  handleOnSubmitForm = data => {
    const { addPost, history } = this.props;

    addPost(data).then(() => history.replace('/'));
  };

  render() {
    const { categories } = this.props;

    return <AddEditPost categories={categories} onSubmit={this.handleOnSubmitForm} />;
  }
}

export default connect(mapStateToProps, mapActionCreators)(AddPost);
