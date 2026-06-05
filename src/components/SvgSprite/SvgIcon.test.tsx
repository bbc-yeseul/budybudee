import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SvgIcon from './SvgIcon'

describe('SvgIcon', () => {
  it('올바른 href로 use 요소를 렌더링한다', () => {
    const { container } = render(<SvgIcon name="star" />)
    const use = container.querySelector('use')
    expect(use).toHaveAttribute('href', '/sprite/sprite.svg#icon-star')
  })

  it('기본 aria-label은 name이다', () => {
    render(<SvgIcon name="home" />)
    expect(screen.getByRole('img', { name: 'home' })).toBeInTheDocument()
  })

  it('aria-label prop을 우선 사용한다', () => {
    render(<SvgIcon name="search" aria-label="검색" />)
    expect(screen.getByRole('img', { name: '검색' })).toBeInTheDocument()
  })

  it('decorative이면 보조기술에서 숨긴다', () => {
    const { container } = render(<SvgIcon name="search" decorative />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).not.toHaveAttribute('role')
    expect(svg).not.toHaveAttribute('aria-label')
  })

  it('멀티컬러 아이콘은 원본 SVG 파일을 img로 렌더링한다', () => {
    render(<SvgIcon name="icon-link-ppt" aria-label="PPT 파일" />)
    const img = screen.getByRole('img', { name: 'PPT 파일' })
    expect(img).toHaveAttribute('src', '/icons/icon-link-ppt.svg')
  })

  it('정규화된 type 아이콘 이름은 원본 파일명으로 img src를 만든다', () => {
    render(<SvgIcon name="type-jpg" aria-label="JPG 파일" />)
    const img = screen.getByRole('img', { name: 'JPG 파일' })
    expect(img).toHaveAttribute('src', '/icons/type=jpg.svg')
  })

  it('decorative 멀티컬러 아이콘은 빈 alt로 렌더링한다', () => {
    const { container } = render(<SvgIcon name="type-pdf" decorative />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('alt', '')
    expect(img).toHaveAttribute('aria-hidden', 'true')
  })

  it('size="md"일 때 width/height가 24px이다', () => {
    const { container } = render(<SvgIcon name="plus" size="md" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('size="lg"일 때 width/height가 32px이다', () => {
    const { container } = render(<SvgIcon name="plus" size="lg" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('숫자 size를 직접 지정할 수 있다', () => {
    const { container } = render(<SvgIcon name="user" size={48} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '48')
    expect(svg).toHaveAttribute('height', '48')
  })

  it('color prop이 style에 color(currentColor용)로 적용된다', () => {
    const { container } = render(<SvgIcon name="star" color="#ff0000" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveStyle({ color: '#ff0000' })
  })

  it('color가 없으면 style이 없다', () => {
    const { container } = render(<SvgIcon name="menu" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('style')).toBeNull()
  })

  it('className prop이 svg에 전달된다', () => {
    const { container } = render(<SvgIcon name="edit" className="custom-class" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('custom-class')
  })
})
