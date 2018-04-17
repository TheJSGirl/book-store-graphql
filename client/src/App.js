import React, { Component } from 'react';
import BookList from './component/BookList';
class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>List</h1>
        <BookList />
      </div>
    );
  }
}

export default App;
