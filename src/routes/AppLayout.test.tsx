import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AppLayout from './AppLayout'

// Тести на рендер 5 пунктів меню, роботу тогла і збереження локального стану тогла

const renderLayout = (path = '/plan') => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppLayout />
    </MemoryRouter>,
  )
}

beforeEach(() => localStorage.clear())

test('renders 5 nav items in sidebar', () => {
  renderLayout()
  const aside = screen.getByRole('complementary')
  expect(within(aside).getAllByRole('link')).toHaveLength(5)
})

test('toggle зберігає collapsed стан в localStorage', async () => {
  const user = userEvent.setup()
  renderLayout()

  const toggle = screen.getByRole('button', { name: /toggle sidebar/i })

  await user.click(toggle)
  expect(localStorage.getItem('sidebar-collapsed')).toBe('true')

  await user.click(toggle)
  expect(localStorage.getItem('sidebar-collapsed')).toBe('false')
})

test('зчитує collapsed=true з localStorage при монтуванні', () => {
  localStorage.setItem('sidebar-collapsed', 'true')
  renderLayout()

  const aside = screen.getByRole('complementary')
  expect(aside.className).toContain('w-16')
})
