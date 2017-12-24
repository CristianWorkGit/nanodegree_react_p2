import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getCategories } from '../../reducers/category';
import FILTERS from '../../utils/constants/FILTERS';

import './Header.css';

const stateCategories = state => Object.values(state.entities.categories);

const mapStateToProps = (state, props) => ({
  categories: stateCategories(state),
  selectedFilter: props.selectedFilter,
  onChangeFilter: props.onChangeFilter,
});

const mapActionCreators = {
  getCategories,
};

class Header extends Component {
  componentDidMount() {
    const { getCategories } = this.props;

    getCategories();
  }

  onSelectChange = event => {
    const { onChangeFilter } = this.props;

    onChangeFilter(event.target.value);
  };

  render() {
    const { selectedFilter, categories } = this.props;

    return (
      <div className="header">
        <div className="headerTitle">
          <h1>Kahtnip</h1>
        </div>

        <div className="headerCategories">
          {categories.map(category => (
            <Link key={category.name} to={`/categories/${category.path}/posts`}>
              {category.name}
            </Link>
          ))}
        </div>

        <div className="headerOptions">
          <select onChange={this.onSelectChange} value={selectedFilter} className="selectorFilter">
            {FILTERS.map(filter => (
              <option key={filter.value} value={filter.value} className="option">
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionCreators)(Header);
