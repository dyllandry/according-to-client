import React, { 
    Component,
    Fragment
} from 'react'
import TrendingTags from './TrendingTags';

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <TrendingTags />
      </Fragment>
    )
  }
}
