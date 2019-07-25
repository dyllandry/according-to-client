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
      await wait(() => getByText(tags[0].name, { exact: false }))
      tags.forEach(tag => {
        expect(getByText(tag.name, {
          exact: false
        })).toBeVisible()
      })
    })

    it('displays list with trending header', () => {
      const expected = 'Trending'
      const getTagsFake = sinon.fake.resolves([])
      sinon.replace(Tag, 'getTags', getTagsFake)
      const { getByText } = render(<TrendingTags />)
      expect(getByText(expected)).toBeVisible()
    })
    
})
