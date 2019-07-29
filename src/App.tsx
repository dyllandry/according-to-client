import React, {
  Component
} from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Post from './components/Post';
import { CmsUrlContext } from './Context'
import styles from './App.module.css'
import Feed from './components/Feed';

class App extends Component {  

  render () {
    return (
      <Router>
        <div className={styles.app}>
          <Header />
          <CmsUrlContext.Provider value={process.env.REACT_APP_CMS_URL}>
            <Route path='/' exact component={Feed} />
            <Route 
              path='/post/:id' 
              render={({ match }) => {
                return <Post id={match.params.id} /> 
              }} 
            />
          </CmsUrlContext.Provider>
        </div>
      </Router>
    )
  }

}

export default App;
