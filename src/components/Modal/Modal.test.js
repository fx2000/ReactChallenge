/* eslint-disable */

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Modal from './Modal'

it('Renders the component', () => {
  render(
    <Modal
      data-testid='modalRender'
    />
  )
  expect(screen.getByTestId('modalRender')).toBeInTheDocument()
})

it('Displays the correct title', () => {
  render(
    <Modal
      data-testid='modalRender'
      title='modalRender-title'
    />
  )
  expect(screen.getByText('modalRender-title')).toBeInTheDocument()
})

it('Displays children correctly', () => {
  render(
    <Modal
      data-testid='modalChildren'
    >
      <div>modalRender-children</div>
    </Modal>
  )
  expect(screen.getByTestId('modalChildren')).toContainHTML('<div>modalRender-children</div>')
})

it('Renders accept and cancel buttons', () => {
  render(
    <Modal
      data-testid='modalRender'
      acceptLabel='modalRender-accept'
      acceptCallback={() => {}}
      cancelLabel='modalRender-cancel'
      cancelCallback={() => {}}
    />
  )
  expect(screen.getByText('modalRender-accept')).toBeInTheDocument()
  expect(screen.getByText('modalRender-cancel')).toBeInTheDocument()
})
