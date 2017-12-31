import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getPosts } from '../../reducers/posts';
import FILTERS from '../../utils/constants/FILTERS';

class AddEditPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: {
        value: '',
      },
      body: {
        value: '',
      },
      author: {
        value: '',
      },
      category: {
        value: '',
      },
    };
  }

  componentDidMount() {
    const { post } = this.props;

    if (post) {
      this.setState({
        body: { value: post.body },
        title: { value: post.title },
        author: { value: post.author },
        category: { value: post.category },
      });
    }
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: { value } });
  };

  render() {
    const { title, body, author, category } = this.state;
    const { post, categories } = this.props;

    return (
      <div className="postEdit">
        <form className="pure-form pure-form-stacked">
          <fieldset>
            <div className="post-options">
              <div className="post-save">
                <input type="submit" value="SAVE" className="pure-button pure-button-primary" />
              </div>
            </div>
            <div className="post-header">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" value={title.value} onChange={this.handleChange} />
            </div>
            <div className="post-body">
              <label htmlFor="title">Body:</label>
              <textarea id="body" value={body.value} onChange={this.handleChange} />
            </div>

            {!post && (
              <div className="post-info">
                <span className="post-author">
                  <strong>Author:</strong>
                </span>
                <span className="post-category">
                  <select value={category.value} onChange={this.handleChange}>
                    <option value="">Select a category...</option>
                    {categories.map(category => (
                      <option key={category.path} value={category.path}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            )}
          </fieldset>
        </form>
      </div>
    );
  }
}

export default AddEditPost;
