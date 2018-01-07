import { connect } from 'react-redux';
import React, { Component } from 'react';

import { getPosts } from '../../actions/post';
import FILTERS from '../../utils/constants/FILTERS';
import Post from '../Post';

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
};

class ListPosts extends Component {
  componentDidMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="posts">
        {posts.length === 0 && <h4 className="red-text">{'> No posts found <'}</h4>}
        {posts &&
          posts.length > 0 &&
          posts.map(post => <Post key={post.id} post={post} showDetails={false} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(ListPosts);
