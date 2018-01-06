import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getPost, deletePost, votePost } from '../../reducers/posts';
import Post from '../Post';

const stateCategories = state => Object.values(state.entities.categories);

const statePosts = state => Object.values(state.entities.posts);

const statePost = (state, props) => {
  const { postId } = props;
  return statePosts(state).filter(post => post.id === postId)[0];
};

const mapStateToProps = (state, props) => ({
  category: props.category,
  post: statePost(state, props),
  postId: props.postId,
  categories: stateCategories(state),
});

const mapActionCreators = {
  getPost,
  deletePost,
  votePost,
};

class ListPosts extends Component {
  componentDidMount() {
    const { getPost, postId } = this.props;
    getPost(postId);
  }

  onClickDelete = () => {
    const { deletePost, postId, history } = this.props;
    deletePost(postId).then(() => history.replace(`/`));
  };

  onClickVote = value => {
    const { votePost, postId } = this.props;

    const changes = {
      option: value,
    };

    votePost(postId, changes);
  };

  render() {
    const { post } = this.props;

    return (
      <div className="posts">
        <Post
          post={post}
          showDetails={true}
          onClickVote={this.onClickVote}
          onClickDelete={this.onClickDelete}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPosts);
