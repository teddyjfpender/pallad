import React from 'react'
import { StoryDefault } from '@ladle/react'
import { RadioGroup } from './index'

export const Basic = () => (
  <RadioGroup
    options={[
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue', defaultSelected: true }
    ]}
  />
)

export default {
  title: 'RadioGroup'
} satisfies StoryDefault
