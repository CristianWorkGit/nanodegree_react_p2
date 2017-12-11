import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Header from '../Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFilter: 'high'
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
            render={({ history }) => <ShowPosts selectedFilter={selectedFilter} />}
          />
          <Route
            path="/categories/:categoryName/posts"
            render={({ history, match }) => (
              <ShowPosts
                onLoad={this.handleResetFilter}
                selectedFilter={selectedFilter}
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
                postId={match.params.postId}
                onLoad={this.handleResetFilter}
                category={match.params.categoryName}
              />
            )}
          />
        </section>
      </div>
    );
  }
}

export default App;
