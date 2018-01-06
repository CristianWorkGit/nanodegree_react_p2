import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import ListPosts from '../ListPosts';
import EditPost from '../EditPost';
import EditComment from '../EditComment';
import AddPost from '../AddPost';
import AddComment from '../AddComment';
import ListComments from '../ListComments';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: 'high',
    };
  }

  onChangeFilter = value => this.setState({ selectedFilter: value });

  render() {
    const { selectedFilter } = this.state;

    return (
      <div>
        <Header selectedFilter={selectedFilter} onChangeFilter={this.onChangeFilter} />

        <section className="body-main-container">
          <Route
            exact
            path="/"
            render={({ history }) => <ListPosts selectedFilter={selectedFilter} />}
          />

          <Route
            path="/categories/:categoryName/posts"
            render={({ history, match }) => (
              <ListPosts selectedFilter={selectedFilter} category={match.params.categoryName} />
            )}
          />

          <Route
            path="/posts/:postId/edit"
            render={({ history, match }) => (
              <EditPost history={history} postId={match.params.postId} />
            )}
          />

          <Route path="/posts/add" render={({ history }) => <AddPost history={history} />} />

          <Route
            exact
            path="/posts/:postId/comments"
            render={({ history, match }) => (
              <ListComments
                history={history}
                selectedFilter={selectedFilter}
                postId={match.params.postId}
              />
            )}
          />

          <Route
            exact
            path="/posts/:postId/comments/add"
            render={({ history, match }) => (
              <AddComment history={history} postId={match.params.postId} />
            )}
          />

          <Route
            exact
            path="/posts/:postId/comments/:commentId/edit"
            render={({ history, match }) => (
              <EditComment
                history={history}
                postId={match.params.postId}
                commentId={match.params.commentId}
              />
            )}
          />
        </section>
      </div>
    );
  }
}

export default App;
