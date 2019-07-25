import React, {
  Component
} from 'react';
import './App.css';
import TrendingTags from './components/TrendingTags';

interface State {}

interface Props {}

class App extends Component<Props, State> {  

  render () {
    return (
      <div>
          <h1>Hello, world!</h1>
          <TrendingTags />
      </div>
    )
  }

}

export default App;
