import React from 'react'
import { StoryDefault } from '@ladle/react'
import { Select } from './index'

export const Basic = () => (
  <Select
    placeholder="Pick color"
    options={[
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue', defaultSelected: true }
    ]}
  />
)

export default {
  title: 'Select'
} satisfies StoryDefault
