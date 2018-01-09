import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import ListPosts from '../ListPosts';
import EditPost from '../EditPost';
import EditComment from '../EditComment';
import AddPost from '../AddPost';
import ShowPost from '../ShowPost';
import AddComment from '../AddComment';

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
          <Route exact path="/add-post" component={AddPost} />

          <Route
            exact
            path="/:categoryName?"
            render={({ history, match }) => (
              <ListPosts
                selectedFilter={selectedFilter}
                history={history}
                category={match.params.categoryName}
              />
            )}
          />

          <Route
            exact
            path="/:categoryName/:postId"
            render={({ history, match }) => (
              <ShowPost
                history={history}
                selectedFilter={selectedFilter}
                postId={match.params.postId}
              />
            )}
          />

          <Route exact path="/:categoryName/:postId/edit" component={EditPost} />

          <Route exact path="/:categoryName/:postId/add-comment" component={AddComment} />

          <Route exact path="/:categoryName/:postId/:commentId/edit" component={EditComment} />
        </section>
      </div>
    );
  }
}

export default App;
