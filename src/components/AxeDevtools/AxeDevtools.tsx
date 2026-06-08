'use client'

import { useEffect } from 'react'

/**
 * 개발 환경 전용: 브라우저 콘솔에 접근성 위반 사항을 출력한다.
 * NODE_ENV=production 빌드에서는 아무것도 렌더링하지 않는다.
 */
export default function AxeDevtools() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      Promise.all([
        import('react'),
        import('react-dom'),
        import('@axe-core/react'),
      ]).then(([React, ReactDOM, axe]) => {
        axe.default(React.default ?? React, ReactDOM.default ?? ReactDOM, 1000)
      })
    }
  }, [])

  return null
}
