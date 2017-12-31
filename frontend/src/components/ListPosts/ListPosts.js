import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getPosts, deletePost } from '../../reducers/posts';
import FILTERS from '../../utils/constants/FILTERS';

import sortBy from 'sort-by';

const stateCategories = state => Object.values(state.entities.categories);

const statePosts = (state, props) => {
  const category = props.category || '';
  const sortByProp = FILTERS.filter(
    fieldToFilter => fieldToFilter.value === props.selectedFilter
  )[0];

  return Object.values(state.entities.posts)
    .filter(post => {
      if (post.deleted) {
        return false;
      }
      if (category && post.category !== category) {
        return false;
      }

      return true;
    })
    .sort(sortBy(`${sortByProp.apiValue}`));
};

const mapStateToProps = (state, props) => ({
  category: props.category,
  posts: statePosts(state, props),
  categories: stateCategories(state),
  selectedFilter: props.selectedFilter,
});

const mapActionCreators = {
  getPosts,
  deletePost,
};

class ListPosts extends Component {
  componentDidMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  onClickDelete = postId => {
    const { deletePost } = this.props;
    deletePost(postId);
  };

  render() {
    const { posts } = this.props;

    return (
      <div className="posts">
        {posts.length === 0 && <h4 className="red-text">{'> No posts found <'}</h4>}
        {posts &&
          posts.length > 0 &&
          posts.map(post => (
            <div key={post.id} className="post">
              <div className="post-options">
                <div className="post-edit">
                  <Link to={`/posts/${post.id}/edit`} className="button-secondary pure-button">
                    EDIT
                  </Link>
                </div>
                <div className="post-delete">
                  <button
                    className="button-error pure-button"
                    onClick={() => this.onClickDelete(post.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
              <div className="post-header">
                <h1 className="post-title">{post.title}</h1>
              </div>
              <div className="post-body">
                <span className="post-content">{post.body}</span>
              </div>
              <div className="post-info">
                <span className="post-author">
                  <strong>Author:</strong> {post.author}
                </span>
                <span className="post-comments">
                  <strong>{post.commentCount}</strong>
                  {post.commentCount > 1 ? ' comments' : ' comment'}
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPosts);
