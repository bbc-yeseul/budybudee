import '@testing-library/jest-dom'
import { configureAxe, toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'

expect.extend(toHaveNoViolations)

// jsdom에서는 실제 CSS 계산이 불가하므로 color-contrast 규칙은 비활성화
export const axe = configureAxe({
  rules: {
    'color-contrast': { enabled: false },
  },
})
