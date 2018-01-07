import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import ListPosts from '../ListPosts';
import EditPost from '../EditPost';
import EditComment from '../EditComment';
import AddPost from '../AddPost';
import ShowPost from '../ShowPost';
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

          <Route exact path="/posts/add" component={AddPost} />

          <Route exact path="/posts/:postId/show" component={ShowPost} />

          <Route exact path="/posts/:postId/edit" component={EditPost} />

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

          <Route exact path="/posts/:postId/comments/add" component={AddComment} />

          <Route exact path="/posts/:postId/comments/:commentId/edit" component={EditComment} />
        </section>
      </div>
    );
  }
}

export default App;
