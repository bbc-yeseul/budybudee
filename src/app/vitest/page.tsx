import Link from 'next/link'
import { PostLayout } from '@/components/PostLayout'

const VITEST_CONFIG = `import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',   // 브라우저 DOM 환경 시뮬레이션
    globals: true,           // describe/it/expect를 import 없이 사용
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`

const SETUP_FILE = `// src/test/setup.ts
import '@testing-library/jest-dom'
// toHaveAttribute, toHaveClass, toHaveStyle, toBeInTheDocument 등
// jest-dom 매처를 vitest expect에 등록`

const SVG_ICON_TEST = `import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SvgIcon from './SvgIcon'

describe('SvgIcon', () => {
  it('올바른 href로 use 요소를 렌더링한다', () => {
    const { container } = render(<SvgIcon name="star" />)
    const use = container.querySelector('use')
    expect(use).toHaveAttribute('href', '/sprite/sprite.svg#icon-star')
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
  })

  it('멀티컬러 아이콘은 원본 SVG 파일을 img로 렌더링한다', () => {
    render(<SvgIcon name="icon-link-ppt" aria-label="PPT 파일" />)
    const img = screen.getByRole('img', { name: 'PPT 파일' })
    expect(img).toHaveAttribute('src', '/icons/icon-link-ppt.svg')
  })

  it('size="md"일 때 width/height가 24px이다', () => {
    const { container } = render(<SvgIcon name="plus" size="md" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '24')
    expect(svg).toHaveAttribute('height', '24')
  })

  it('color prop이 style에 color(currentColor용)로 적용된다', () => {
    const { container } = render(<SvgIcon name="star" color="#ff0000" />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveStyle({ color: '#ff0000' })
  })
})`

const FONT_ICON_TEST = `import { render } from '@testing-library/react'
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
    expect(container.querySelector('i')).toHaveClass('is-md')
  })

  it('aria-hidden="true"가 기본값이다', () => {
    const { container } = render(<FontIcon name="user" />)
    expect(container.querySelector('i')).toHaveAttribute('aria-hidden', 'true')
  })

  it('color prop이 style에 color로 적용된다', () => {
    const { container } = render(<FontIcon name="star" color="#00ff00" />)
    expect(container.querySelector('i')).toHaveStyle({ color: '#00ff00' })
  })
})`

const MATCHERS = [
  {
    matcher: 'toBeInTheDocument()',
    desc: 'DOM에 요소가 존재하는지 확인',
    example: "expect(screen.getByRole('img')).toBeInTheDocument()",
  },
  {
    matcher: "toHaveAttribute('attr', 'val')",
    desc: '특정 속성과 값이 있는지 확인',
    example: "expect(el).toHaveAttribute('aria-hidden', 'true')",
  },
  {
    matcher: "toHaveClass('cls')",
    desc: '특정 CSS 클래스를 가지는지 확인',
    example: "expect(el).toHaveClass('icon-alarm')",
  },
  {
    matcher: 'toHaveStyle(obj)',
    desc: '특정 인라인 스타일이 적용됐는지 확인',
    example: "expect(el).toHaveStyle({ color: '#ff0000' })",
  },
  {
    matcher: 'not.toHaveAttribute()',
    desc: '속성이 없는지 확인 (not 체이닝)',
    example: "expect(el).not.toHaveAttribute('role')",
  },
]

const COMMANDS = [
  { cmd: 'npm run test', desc: '워치 모드로 실행 (파일 변경 시 자동 재실행)', color: 'text-green-300' },
  { cmd: 'npm run test:run', desc: '1회 실행 후 종료 (CI 환경에 적합)', color: 'text-green-300' },
  { cmd: 'npm run test:ui', desc: '브라우저 기반 UI 대시보드로 결과 확인', color: 'text-green-300' },
  { cmd: 'npx vitest run --reporter=verbose', desc: '각 테스트 케이스 이름까지 상세 출력', color: 'text-yellow-300' },
  { cmd: 'npx vitest run src/components/SvgSprite', desc: '특정 파일/폴더만 실행', color: 'text-yellow-300' },
]

const WHY_VITEST = [
  { label: 'Vite 기반', svg: '✅', font: '⚠️', svgDesc: 'esbuild로 빠른 변환 — HMR과 동일한 파이프라인', fontDesc: 'Babel 변환 필요, 설정 오버헤드 있음' },
  { label: '설정 공유', svg: '✅', font: '⚠️', svgDesc: 'vite.config와 동일 파일 재사용 가능', fontDesc: 'jest.config 별도 관리 필요' },
  { label: 'ESM 지원', svg: '✅', font: '⚠️', svgDesc: 'ESM을 네이티브로 지원', fontDesc: 'CJS 변환 트릭이 필요한 경우 있음' },
  { label: 'globals 옵션', svg: '✅', font: '✅', svgDesc: 'describe/it/expect import 생략 가능', fontDesc: '동일하게 지원' },
  { label: 'jest-dom 호환', svg: '✅', font: '✅', svgDesc: '@testing-library/jest-dom 그대로 사용', fontDesc: '동일하게 사용 가능' },
]

export default function VitestPage() {
  return (
    <PostLayout
      title="Vitest 테스트 가이드"
      description="이 프로젝트의 테스트 환경과 작성 방법"
    >

        {/* Vitest vs Jest */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">왜 Vitest인가</h2>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">항목</th>
                  <th className="text-left px-6 py-4 font-semibold text-emerald-700">Vitest</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-500">Jest</th>
                </tr>
              </thead>
              <tbody>
                {WHY_VITEST.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-4 font-medium text-gray-700">{row.label}</td>
                    <td className="px-6 py-4 text-gray-600">{row.svg} {row.svgDesc}</td>
                    <td className="px-6 py-4 text-gray-600">{row.font} {row.fontDesc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* vitest.config.ts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">프로젝트 설정</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">vitest.config.ts</span>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6">
                <pre className="text-xs text-green-300 overflow-x-auto">{VITEST_CONFIG}</pre>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">설정 설명</span>
              </div>
              <div className="space-y-3">
                {[
                  { key: 'environment: "jsdom"', desc: 'Node.js에서 브라우저 DOM을 시뮬레이션합니다. document, window, querySelector 등이 동작합니다.' },
                  { key: 'globals: true', desc: 'describe, it, expect, beforeEach 등을 매 파일마다 import 없이 사용할 수 있습니다.' },
                  { key: 'setupFiles', desc: '테스트 파일 실행 전에 먼저 실행할 설정 파일을 지정합니다. 여기서 jest-dom 매처를 등록합니다.' },
                  { key: 'resolve.alias', desc: "tsconfig의 @/ 경로 별칭을 Vitest에서도 동일하게 인식하게 합니다. import '@/components/...' 형태가 동작합니다." },
                ].map(item => (
                  <div key={item.key} className="bg-white rounded-xl border border-gray-100 p-4 space-y-1">
                    <code className="text-xs text-emerald-700 font-semibold">{item.key}</code>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* setup.ts */}
          <div className="bg-gray-900 rounded-2xl p-6">
            <pre className="text-xs text-green-300 overflow-x-auto">{SETUP_FILE}</pre>
          </div>
        </section>

        {/* 실행 명령어 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">실행 명령어</h2>
          <div className="bg-gray-900 rounded-2xl p-6 space-y-3">
            {COMMANDS.map(({ cmd, desc, color }) => (
              <div key={cmd} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <code className={`text-sm font-mono ${color} min-w-0 shrink-0`}>{cmd}</code>
                <span className="text-xs text-gray-400"># {desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 주요 매처 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">주요 jest-dom 매처</h2>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">매처</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">설명</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">예시</th>
                </tr>
              </thead>
              <tbody>
                {MATCHERS.map((row, i) => (
                  <tr key={row.matcher} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-4">
                      <code className="text-xs text-emerald-700 font-semibold">{row.matcher}</code>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-600">{row.desc}</td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-gray-500">{row.example}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 실제 테스트 예시 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">프로젝트 테스트 파일</h2>
          <p className="text-sm text-gray-500">이 프로젝트에 작성된 실제 테스트 코드입니다.</p>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">SVG Sprite</span>
                <code className="text-xs text-gray-400">src/components/SvgSprite/SvgIcon.test.tsx — 13개 케이스</code>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6">
                <pre className="text-xs text-green-300 overflow-x-auto">{SVG_ICON_TEST}</pre>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">Icon Font</span>
                <code className="text-xs text-gray-400">src/components/FontIcon/FontIcon.test.tsx — 8개 케이스</code>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6">
                <pre className="text-xs text-yellow-300 overflow-x-auto">{FONT_ICON_TEST}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 테스트 패턴 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">테스트 작성 패턴</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'container.querySelector',
                desc: 'DOM 노드를 직접 선택해 속성을 검증할 때. aria-hidden, style 등 접근성 · 스타일 검증에 사용.',
                code: `const { container } = render(<SvgIcon name="star" />)
const svg = container.querySelector('svg')
expect(svg).toHaveAttribute('width', '24')`,
                color: 'blue',
              },
              {
                title: 'screen.getByRole',
                desc: '사용자가 인식하는 역할(role)로 요소를 찾을 때. 접근성 관점 테스트에 권장되는 방식.',
                code: `render(<SvgIcon name="search" aria-label="검색" />)
screen.getByRole('img', { name: '검색' })`,
                color: 'emerald',
              },
              {
                title: 'toHaveStyle',
                desc: 'color 등 인라인 스타일 검증. 객체 형태로 전달하면 부분 일치도 허용.',
                code: `render(<SvgIcon name="star" color="#ff0000" />)
const svg = container.querySelector('svg')
expect(svg).toHaveStyle({ color: '#ff0000' })`,
                color: 'purple',
              },
            ].map(({ title, desc, code, color }) => {
              const badge: Record<string, string> = {
                blue: 'bg-blue-100 text-blue-700',
                emerald: 'bg-emerald-100 text-emerald-700',
                purple: 'bg-purple-100 text-purple-700',
              }
              return (
                <div key={title} className="bg-white rounded-2xl shadow p-5 space-y-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge[color]}`}>{title}</span>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  <div className="bg-gray-900 rounded-xl p-3">
                    <pre className="text-[10px] text-green-300 overflow-x-auto">{code}</pre>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <footer className="flex items-center justify-between text-sm text-gray-400 pb-4">
          <span>테스트 실행: <code>npm run test:run</code></span>
          <div className="flex items-center gap-3">
            <Link
              href="/svg"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              ← 아이콘 관리 보러가기
            </Link>
          </div>
        </footer>
    </PostLayout>
  )
}
