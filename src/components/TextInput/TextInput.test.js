import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import TextInput from './TextInput'

it('Renders the component', () => {
  render(
    <TextInput
      id='textinputRender'
      data-testid='textinputRender'
      label={'textinputRender'}
      name={'textinputRender'}
    />
  )
  expect(screen.getByTestId('textinputRender')).toBeInTheDocument()
})

it('Displays the correct label', () => {
  render(
    <TextInput
      id='textinputLabel'
      data-testid='textinputLabel'
      label={'textinputLabel'}
      name={'textinputLabel'}
    />
  )
  expect(document.getElementById('textinputLabel-label')).toBeInTheDocument()
})

it('Displays the correct input element', () => {
  render(
    <TextInput
      id='textinputElement'
      data-testid='textinputElement'
      label={'textinputElement'}
      name={'textinputElement'}
    />
  )
  expect(document.getElementById('textinputElement-input')).toBeInTheDocument()
})

it('Defaults to a text type input', () => {
  render(
    <TextInput
      id='textinputElement'
      data-testid='textinputElement'
      label={'textinputElement'}
      name={'textinputElement'}
    />
  )
  expect(document.getElementById('textinputElement-input')).toHaveAttribute('type', 'text')
})

it('Displays the correct input element type', () => {
  render(
    <TextInput
      id='textinputElement'
      data-testid='textinputElement'
      label={'textinputElement'}
      name={'textinputElement'}
      type={'datetime-local'}
    />
  )
  expect(document.getElementById('textinputElement-input')).toHaveAttribute('type', 'datetime-local')
})

it('Assigns the correct name to the input element', () => {
  render(
    <TextInput
      id='textinputName'
      data-testid='textinputName'
      label={'textinputName'}
      name={'textinputName'}
    />
  )
  expect(document.getElementById('textinputName-input')).toHaveAttribute('name', 'textinputName')
})

it('Correctly sets the input as required', () => {
  render(
    <TextInput
      id='textinputRequired'
      data-testid='textinputRequired'
      label={'textinputRequired'}
      name={'textinputRequired'}
      required={true}
    />
  )
  expect(document.getElementById('textinputRequired-input')).toHaveAttribute('required')
})
