import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe } from '../setup'
import SvgIcon from '@/components/SvgSprite/SvgIcon'

describe('SvgIcon 접근성 (axe-core)', () => {
  it('aria-label이 있는 의미 있는 아이콘은 위반이 없어야 한다', async () => {
    const { container } = render(
      <SvgIcon name="home" aria-label="홈으로 이동" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('decorative=true인 장식용 아이콘은 위반이 없어야 한다', async () => {
    const { container } = render(
      <SvgIcon name="check" decorative />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('aria-label 없이 name을 fallback으로 사용해도 위반이 없어야 한다', async () => {
    const { container } = render(
      <SvgIcon name="alarm" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('color prop을 전달해도 위반이 없어야 한다', async () => {
    const { container } = render(
      <SvgIcon name="heart-solid" color="#e00" aria-label="좋아요" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
