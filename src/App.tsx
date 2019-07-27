import React, {
  Component
} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Post from './components/Post';

class App extends Component {  

  render () {
    return (
      <Router>
        <Header />
        <Route path='/' exact component={Home} />
        <Route 
          path='/post/:id' 
          render={({ match }) => {
            return <Post id={match.params.id} /> 
          }} 
        />
      </Router>
    )
  }

}

export default App;
