import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import TextAreaInput from './TextAreaInput'

it('Renders the component', () => {
  render(
    <TextAreaInput
      id='TextAreaInputRender'
      data-testid='TextAreaInputRender'
      label={'TextAreaInputRender'}
      name={'TextAreaInputRender'}
    />
  )
  expect(screen.getByTestId('TextAreaInputRender')).toBeInTheDocument()
})

it('Displays the correct label', () => {
  render(
    <TextAreaInput
      id='TextAreaInputLabel'
      data-testid='TextAreaInputLabel'
      label={'TextAreaInputLabel'}
      name={'TextAreaInputLabel'}
    />
  )
  expect(document.getElementById('TextAreaInputLabel-label')).toBeInTheDocument()
})

it('Displays the correct input element', () => {
  render(
    <TextAreaInput
      id='TextAreaInputElement'
      data-testid='TextAreaInputElement'
      label={'TextAreaInputElement'}
      name={'TextAreaInputElement'}
    />
  )
  expect(document.getElementById('TextAreaInputElement-input')).toBeInTheDocument()
})

it('Assigns the correct name to the input element', () => {
  render(
    <TextAreaInput
      id='TextAreaInputName'
      data-testid='TextAreaInputName'
      label={'TextAreaInputName'}
      name={'TextAreaInputName'}
    />
  )
  expect(document.getElementById('TextAreaInputName-input')).toHaveAttribute('name', 'TextAreaInputName')
})

it('Correctly sets the input as required', () => {
  render(
    <TextAreaInput
      id='TextAreaInputRequired'
      data-testid='TextAreaInputRequired'
      label={'TextAreaInputRequired'}
      name={'TextAreaInputRequired'}
      required={true}
    />
  )
  expect(document.getElementById('TextAreaInputRequired-input')).toHaveAttribute('required')
})
