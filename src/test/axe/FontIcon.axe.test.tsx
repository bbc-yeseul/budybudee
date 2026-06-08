import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { axe } from '../setup'
import FontIcon from '@/components/FontIcon/FontIcon'

describe('FontIcon 접근성 (axe-core)', () => {
  it('기본 렌더링 시 위반이 없어야 한다 (aria-hidden=true 장식 아이콘)', async () => {
    const { container } = render(
      <FontIcon name="menu" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('size prop 변경 시에도 위반이 없어야 한다', async () => {
    const { container } = render(
      <FontIcon name="alarm" size="lg" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('color prop을 전달해도 위반이 없어야 한다', async () => {
    const { container } = render(
      <FontIcon name="notification" color="#0057b8" />
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('버튼 레이블로 사용되는 패턴에서 위반이 없어야 한다', async () => {
    const { container } = render(
      <button aria-label="알림 보기">
        <FontIcon name="notification" />
      </button>
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
