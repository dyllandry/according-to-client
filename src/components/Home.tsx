import React, { 
    Component,
    Fragment
} from 'react'
import TrendingTags from './TrendingTags';
import Feed from './Feed';

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <TrendingTags />
        <Feed />
      </Fragment>
    )
  }
}
