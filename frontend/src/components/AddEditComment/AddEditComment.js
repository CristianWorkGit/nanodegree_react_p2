import React, { Component } from 'react';
import { v4 } from 'node-uuid';

class AddEditComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: {
        value: '',
      },
      author: {
        value: '',
      },
    };
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.fetchData(nextProps);
    }
  }

  fetchData(props) {
    const { comment } = this.props;
    if (comment) {
      this.setState({
        body: { value: comment.body },
        author: { value: comment.author },
      });
    }
  }

  handleSubmit = event => {
    const { onSubmit, comment, postId } = this.props;
    event.preventDefault();

    const { body, author } = this.state;
    const data = {
      body: body.value,
    };

    if (!comment) {
      data.author = author.value;
      data.id = v4();
      data.timestamp = Date.now();
      data.parentId = postId;
    } else {
      data.comment = {
        id: comment.id,
      };
    }

    onSubmit(data);
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: { value } });
  };

  render() {
    const { body, author } = this.state;
    const { comment } = this.props;

    return (
      <div className="commentEdit">
        <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset>
            <div className="comment-options">
              <div className="comment-save">
                <input type="submit" value="SAVE" className="pure-button pure-button-primary" />
              </div>
            </div>
            <div className="comment-body">
              <strong>Body:</strong>
              <textarea id="body" value={body.value} onChange={this.handleChange} />
            </div>

            {!comment && (
              <div className="comment-info">
                <span className="comment-author">
                  <strong>Author:</strong>
                  <input
                    type="text"
                    id="author"
                    value={author.value}
                    onChange={this.handleChange}
                  />
                </span>
              </div>
            )}
          </fieldset>
        </form>
      </div>
    );
  }
}

export default AddEditComment;
