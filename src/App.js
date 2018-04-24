import React, { Component } from 'react';
import MonologueList from './components/MonologueList';
import AddMonologueForm from './components/AddMonologueForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AddMonologueForm />
        <MonologueList />
      </div>
    );
  }
}

export default App;
