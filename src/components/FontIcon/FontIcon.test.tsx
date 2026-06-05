import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FontIcon from './FontIcon'

describe('FontIcon', () => {
  it('icon과 icon-{name} 클래스가 존재한다', () => {
    const { container } = render(<FontIcon name="alarm" />)
    const el = container.querySelector('i')
    expect(el).toHaveClass('icon')
    expect(el).toHaveClass('icon-alarm')
  })

  it('기본 사이즈는 md이다', () => {
    const { container } = render(<FontIcon name="home" />)
    const el = container.querySelector('i')
    expect(el).toHaveClass('is-md')
  })

  it('size prop이 is-{size} 클래스로 적용된다', () => {
    const { container } = render(<FontIcon name="home" size="lg" />)
    const el = container.querySelector('i')
    expect(el).toHaveClass('is-lg')
    expect(el).not.toHaveClass('is-md')
  })

  it('aria-hidden="true"가 기본값이다', () => {
    const { container } = render(<FontIcon name="user" />)
    const el = container.querySelector('i')
    expect(el).toHaveAttribute('aria-hidden', 'true')
  })

  it('color prop이 style에 color로 적용된다', () => {
    const { container } = render(<FontIcon name="star" color="#00ff00" />)
    const el = container.querySelector('i')
    expect(el).toHaveStyle({ color: '#00ff00' })
  })

  it('color가 없으면 style이 없다', () => {
    const { container } = render(<FontIcon name="search" />)
    const el = container.querySelector('i')
    expect(el?.getAttribute('style')).toBeNull()
  })

  it('className prop이 추가로 전달된다', () => {
    const { container } = render(<FontIcon name="edit" className="extra" />)
    const el = container.querySelector('i')
    expect(el).toHaveClass('extra')
    expect(el).toHaveClass('icon')
  })

  it('다양한 아이콘 name을 처리한다', () => {
    const icons = ['alarm', 'calendar', 'check', 'chevron-down', 'plus', 'settings'] as const
    icons.forEach(name => {
      const { container } = render(<FontIcon name={name} />)
      const el = container.querySelector('i')
      expect(el).toHaveClass(`icon-${name}`)
    })
  })
})
