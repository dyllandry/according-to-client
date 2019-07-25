import React from 'react'
import TrendingTags from '../TrendingTags'
import { render, wait } from '@testing-library/react'
import * as Tag from '../../models/Tag'
import sinon from 'sinon'

describe('TrendingTags component', () => {

    afterEach(() => {
      sinon.restore()
    })

    it ('renders without crashing', () => {
      render(<TrendingTags />)
    })
  
    it('renders tags', async () => {
      const tags = [{
          _id: '1',
          name: 'apple',
        }, {
          _id: '2',
          name: 'banana',
      }]
      const getTagsFake = sinon.fake.resolves(tags)
      sinon.replace(Tag, 'getTags', getTagsFake)
      const { getByText } = render(<TrendingTags />)
      await wait(() => getByText(tags[0].name))
      expect(getByText(tags[0].name)).toBeVisible()
    })
    
})
