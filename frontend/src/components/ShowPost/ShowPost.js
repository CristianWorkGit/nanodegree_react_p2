import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getPost, deletePost, votePost } from '../../actions/post';
import Post from '../Post';

const stateCategories = state => Object.values(state.entities.categories);

const statePosts = state => Object.values(state.entities.posts);

const statePost = (state, props) => {
  const { match } = props;
  return statePosts(state).filter(post => post.id === match.params.postId)[0];
};

const mapStateToProps = (state, props) => ({
  category: props.category,
  post: statePost(state, props),
  match: props.match,
  history: props.history,
  categories: stateCategories(state),
});

const mapActionCreators = {
  getPost,
  deletePost,
  votePost,
};

class ListPosts extends Component {
  static defaultProps = {
    post: {},
  };

  componentDidMount() {
    const { getPost, match } = this.props;
    getPost(match.params.postId);
  }

  onClickDelete = () => {
    const { deletePost, match, history } = this.props;
    deletePost(match.params.postId).then(() => history.replace(`/`));
  };

  onClickVote = value => {
    const { votePost, match } = this.props;

    const changes = {
      option: value,
    };

    votePost(match.params.postId, changes);
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
