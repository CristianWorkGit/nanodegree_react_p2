import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../Header';
import ListPosts from '../ListPosts';

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
        </section>
      </div>
    );
  }
}

export default App;
