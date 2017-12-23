import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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

        </section>
      </div>
    );
  }
}

export default App;
