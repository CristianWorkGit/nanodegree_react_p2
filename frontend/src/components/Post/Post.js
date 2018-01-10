import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  render() {
    const {
      post,
      comments,
      onClickVote,
      onClickDelete,
      onClickVoteComment,
      onClickDeleteComment,
      showDetails,
    } = this.props;

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
          <div className="post-edit">
            <Link
              to={`/${post.id}/${post.id}/add-comment`}
              className="button-secondary pure-button"
            >
              ADD COMMENTS
            </Link>
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
        {showDetails && (
          <div className="post-body">
            <span className="post-content">{post.body}</span>
          </div>
        )}
        {showDetails && (
          <div className="comments-list">
            {comments.length === 0 && <h4 className="red-text">{'> No comments found <'}</h4>}
            {comments &&
              comments.length > 0 &&
              comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-options">
                    <div className="comment-edit">
                      <Link
                        to={`/${post.category}/${post.id}/${comment.id}/edit`}
                        className="button-secondary pure-button"
                      >
                        EDIT
                      </Link>
                    </div>
                    <div className="post-delete">
                      <button
                        className="button-error pure-button"
                        onClick={() => onClickDeleteComment(comment.id)}
                      >
                        DELETE
                      </button>
                    </div>
                    <div className="post-delete">
                      <button
                        className="button-yellow pure-button"
                        onClick={() => onClickVoteComment(comment.id, 'downVote')}
                      >
                        DOWN VOTE
                      </button>
                    </div>
                    <div className="post-delete">
                      <button
                        className="button-green pure-button"
                        onClick={() => onClickVoteComment(comment.id, 'upVote')}
                      >
                        UP VOTE
                      </button>
                    </div>
                  </div>
                  <div className="comment-body">
                    <span className="comment-content">{comment.body}</span>
                  </div>
                  <div className="comment-info">
                    <span className="comment-author">
                      <strong>Author:</strong> {comment.author}
                    </span>
                    <span className="comment-author">
                      <strong>Vote Score:</strong> {comment.voteScore}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Post;
