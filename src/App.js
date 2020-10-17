import React, { Component } from 'react';
import Header from './components/header/header';
import DataContent from './components/data_visual_stats/data_visual_stats';

class App extends Component {

  render() {
    return (
        <div className="App" style={{background:"#fff",overflowY:"auto"}}>
            <Header />
            <DataContent />
        </div>
    );
  }
}

export default App;
