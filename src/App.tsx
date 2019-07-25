import React, {
  Component
} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {  

  render () {
    return (
      <Router>
        <Header />
        <Route path='/' exact component={Home} />
      </Router>
    )
  }

}

export default App;
