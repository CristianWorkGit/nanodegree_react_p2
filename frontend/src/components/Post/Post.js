import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  render() {
    const { post, onClickVote, onClickDelete } = this.props;

    return (
      <div className="post">
        <div className="post-options">
          <div className="post-edit">
            <Link to={`/posts/${post.id}/edit`} className="button-secondary pure-button">
              EDIT
            </Link>
          </div>
          <div className="post-delete">
            <button className="button-error pure-button" onClick={() => onClickDelete(post.id)}>
              DELETE
            </button>
          </div>
          <div className="post-delete">
            <button
              className="button-yellow pure-button"
              onClick={() => onClickVote(post.id, 'downVote')}
            >
              DOWN VOTE
            </button>
          </div>
          <div className="post-delete">
            <button
              className="button-green pure-button"
              onClick={() => onClickVote(post.id, 'upVote')}
            >
              UP VOTE
            </button>
          </div>
        </div>
        <div className="post-header">
          <Link to={`/${post.category}/${post.id}`}>
            <h1 className="post-title">{post.title}</h1>
          </Link>
        </div>
        <div className="post-info">
          <span className="post-author">
            <strong>Author:</strong> {post.author}
          </span>
          <span className="post-comments">
            <strong>Comments:</strong> {post.commentCount}
          </span>
          <span className="post-comments">
            <strong>Category:</strong> {post.category}
          </span>
          <span className="post-author">
            <strong>Vote Score:</strong> {post.voteScore}
          </span>
        </div>
      </div>
    );
  }
}

export default Post;
