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
      const tags = [
        Tag.getFakeTag(),
        Tag.getFakeTag()
      ]
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
      const getTagsFake = sinon.fake.resolves([])
      sinon.replace(Tag, 'getTags', getTagsFake)
      const { getByTestId } = render(<TrendingTags />)
      expect(getByTestId('trending-tags')).toBeVisible()
    })
    
})
