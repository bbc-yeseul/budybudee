'use client'

import { Fragment, useState } from 'react'
import Link from 'next/link'
import { SvgIcon } from '@/components/SvgSprite'
import { FontIcon } from '@/components/FontIcon'
import { ALL_ICONS, SVG_ONLY_ICONS, PRESERVE_COLOR_ICONS, type IconName, type IconSize } from '@/lib/iconData'

const COMPARISON_TABLE = [
  {
    category: '기능',
    rows: [
      { feature: '색상 변경', svg: '✅ currentColor · fill 직접 제어 (path별 개별 지정 가능)', font: '✅ CSS color 상속으로 즉시 변경 (단색 아이콘에 최적)' },
      { feature: '멀티컬러', svg: '✅ 원본 다중 색상 유지 가능', font: '❌ 단색만 지원' },
      { feature: '접근성', svg: '✅ aria-label / role 등 세밀한 제어 가능', font: '⚠️ aria-hidden 필수 처리, 스크린 리더 호환 주의 필요' },
      { feature: 'CSS 애니메이션', svg: '✅ path · stroke 등 풍부한 CSS 제어 가능', font: '⚠️ 글리프 단위 애니메이션 불가, transform · opacity만 가능' },
      { feature: '텍스트 CSS 속성', svg: '❌ text-shadow 등 텍스트 CSS 적용 불가', font: '✅ text-shadow · letter-spacing 등 모든 텍스트 CSS 활용 가능' },
      { feature: 'IE 지원', svg: '⚠️ IE11부터 지원 (use href 제한)', font: '✅ EOT 포함 시 IE8까지 지원' },
      { feature: '빌드 도구', svg: '✅ 간단한 Node 스크립트 (이 프로젝트 기준)', font: '⚠️ Fantasticon 등 별도 툴체인 필요' },
    ],
  },
  {
    category: '용량 · 로딩',
    rows: [
      { feature: '파일 용량', svg: '⚠️ 아이콘당 ≈1.2KB (27KB / 23개) — 아이콘 수에 비례해 증가', font: '✅ woff2 기준 아이콘당 ≈87B (13KB / 149개) — 대량 아이콘에 유리' },
      { feature: 'HTTP 요청 수', svg: '✅ 1개 (sprite.svg)', font: '✅ 1개 (woff2, 모던 브라우저 기준)' },
      { feature: '로드 타이밍', svg: '✅ 아이콘 사용 시점에 지연 로드 가능', font: '⚠️ CSS 파싱 완료 후 폰트 파일 추가 요청 (font-display로 제어 가능)' },
      { feature: '렌더링 블로킹', svg: '✅ 블로킹 없음', font: '⚠️ FOIT 가능성 — font-display: swap으로 완화 가능' },
      { feature: '캐싱', svg: '✅ 파일 1개 캐싱', font: '✅ woff2 파일 1개 캐싱 (모던 브라우저 기준)' },
      { feature: '아이콘 추가 비용', svg: '✅ SVG 추가 후 스크립트 1회 실행 (이 프로젝트 기준)', font: '⚠️ Fantasticon 재빌드 → 폰트 교체 → CSS 유니코드 매핑 추가' },
    ],
  },
]

const SIZE_OPTIONS: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl']

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [selectedSize, setSelectedSize] = useState<IconSize>('md')
  const [demoIcon, setDemoIcon] = useState<IconName>('star')
  const demoIconPreservesColor = PRESERVE_COLOR_ICONS.includes(demoIcon)

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* 헤더 */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">SVG Sprite vs Icon Font</h1>
          <p className="text-lg text-gray-500">두 아이콘 방식을 직접 비교해보세요</p>
          <div className="pt-2">
            <Link
              href="/vitest"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Vitest 보러가기 →
            </Link>
          </div>
        </header>

        {/* 아이콘 그리드 비교 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">아이콘 목록 비교</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">SVG Sprite</span>
                <code className="text-xs text-gray-400">&lt;svg&gt;&lt;use href&gt;</code>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {ALL_ICONS.map(name => (
                  <div key={name} className="relative flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors" onClick={() => setDemoIcon(name)}>
                    <SvgIcon name={name} size="md" decorative />
                    <span className="text-[10px] text-gray-500 text-center leading-tight">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">Icon Font</span>
                <code className="text-xs text-gray-400">&lt;i class=&quot;icon&quot;&gt;</code>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {ALL_ICONS.map(name => {
                  const svgOnly = SVG_ONLY_ICONS.includes(name)
                  return (
                    <div key={name} className="relative flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-purple-50 cursor-pointer transition-colors" onClick={() => setDemoIcon(name)}>
                      {svgOnly
                        ? <span className="w-6 h-6 flex items-center justify-center text-gray-300 text-lg">—</span>
                        : <FontIcon name={name} size="md" />
                      }
                      <span className="text-[10px] text-gray-500 text-center leading-tight">{name}</span>
                      {svgOnly && <span className="absolute top-1 right-1 text-[8px] bg-gray-200 text-gray-500 px-1 rounded">SVG only</span>}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 상호작용 데모 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">색상 변경 데모</h2>
          <div className="bg-white rounded-2xl shadow p-8">
            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">색상</label>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-gray-200"
                />
                <span className="text-sm text-gray-500 font-mono">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">사이즈</label>
                <div className="flex gap-1">
                  {SIZE_OPTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${selectedSize === s ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">아이콘</label>
                <select
                  value={demoIcon}
                  onChange={e => setDemoIcon(e.target.value as IconName)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white"
                >
                  {ALL_ICONS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-4 p-8 bg-blue-50 rounded-xl">
                <p className="text-sm font-semibold text-blue-700">SVG Sprite</p>
                <SvgIcon
                  name={demoIcon}
                  size={selectedSize}
                  color={demoIconPreservesColor ? undefined : selectedColor}
                  aria-label={demoIcon}
                />
                <div className="text-center space-y-1">
                  {demoIconPreservesColor
                    ? <p className="text-xs text-blue-400">원본 색상 유지 (img 렌더링)</p>
                    : <>
                        <p className="text-xs text-gray-500">currentColor로 색상 적용</p>
                        <code className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          color: {selectedColor}
                        </code>
                      </>
                  }
                </div>
              </div>

              {/* 원본 */}
              <div className="flex flex-col items-center justify-center gap-3 p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-xs font-medium text-gray-400">원본</p>
                <SvgIcon name={demoIcon} size="lg" decorative />
                <span className="text-[10px] text-gray-400 font-mono">{demoIcon}</span>
              </div>

              <div className="flex flex-col items-center gap-4 p-8 bg-purple-50 rounded-xl">
                <p className="text-sm font-semibold text-purple-700">Icon Font</p>
                {SVG_ONLY_ICONS.includes(demoIcon) ? (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl text-gray-300">—</span>
                    <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded font-medium">SVG only</span>
                    <p className="text-[10px] text-gray-400 text-center">폰트에 해당 글리프 없음</p>
                  </div>
                ) : (
                  <FontIcon name={demoIcon} size={selectedSize} color={selectedColor} />
                )}
                <div className="text-center space-y-1">
                  <p className="text-xs text-gray-500">color 속성으로만 제어</p>
                  <code className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                    color: {selectedColor}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 기능 비교 테이블 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">기능 비교</h2>
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-700">항목</th>
                  <th className="text-left px-6 py-4 font-semibold text-blue-700">SVG Sprite</th>
                  <th className="text-left px-6 py-4 font-semibold text-purple-700">Icon Font</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map(({ category, rows }) => (
                  <Fragment key={category}>
                    <tr className="bg-gray-100 border-y border-gray-200">
                      <td colSpan={3} className="px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">{category}</td>
                    </tr>
                    {rows.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-6 py-4 font-medium text-gray-700">{row.feature}</td>
                        <td className="px-6 py-4 text-gray-600">{row.svg}</td>
                        <td className="px-6 py-4 text-gray-600">{row.font}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 아이콘 추가 방법 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">아이콘 추가 방법</h2>
          <div className="grid grid-cols-2 gap-6">

            {/* SVG Sprite */}
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">SVG Sprite</span>
                <span className="text-xs text-gray-400">2단계</span>
              </div>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-800">SVG 파일 추가</p>
                    <p className="text-xs text-gray-500">아이콘 SVG를 아래 경로에 저장합니다.</p>
                    <code className="block text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-lg">src/assets/icons/my-icon.svg</code>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-800">아이콘 빌드</p>
                    <p className="text-xs text-gray-500"><code className="bg-gray-100 px-1 rounded">iconData.ts</code>와 <code className="bg-gray-100 px-1 rounded">sprite.svg</code>를 함께 생성합니다. <code className="bg-gray-100 px-1 rounded">npm run dev</code> 시 자동 실행됩니다.</p>
                    <pre className="text-xs bg-gray-900 text-green-300 px-3 py-2 rounded-lg">{`npm run build:icons`}</pre>
                  </div>
                </li>
              </ol>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 leading-relaxed">
                  아이콘 빌드는 <code className="bg-gray-100 px-1 rounded">scripts/generate-icon-data.mjs</code>와 <code className="bg-gray-100 px-1 rounded">scripts/build-sprite.mjs</code>를 순서대로 실행합니다. 단색 아이콘은 <code className="bg-gray-100 px-1 rounded">currentColor</code>, 멀티컬러 아이콘은 원본 SVG 이미지로 자동 분기됩니다.
                </p>
              </div>
            </div>

            {/* Icon Font */}
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">Icon Font</span>
                <span className="text-xs text-gray-400">5단계</span>
              </div>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">1</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-800">SVG 파일 추가 (gbe-1.0)</p>
                    <code className="block text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-lg">.docker/resources/assets/icon/my-icon.svg</code>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">2</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-800">폰트 재빌드 (Fantasticon)</p>
                    <p className="text-xs text-gray-500">메타데이터 생성 → 유니코드 할당 → 웹폰트 변환</p>
                    <pre className="text-xs bg-gray-900 text-yellow-300 px-3 py-2 rounded-lg">{`npm --prefix .docker run icons:build`}</pre>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">3</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-800">폰트 파일 복사</p>
                    <p className="text-xs text-gray-500">빌드된 폰트를 public 디렉토리에 복사합니다.</p>
                    <code className="block text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-lg">.docker/fonts/bbc-icon/ → public/fonts/bbc-icon/</code>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">4</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-800">CSS 유니코드 매핑 추가</p>
                    <p className="text-xs text-gray-500">빌드 시 생성된 유니코드 값을 <code className="bg-gray-100 px-1 rounded">globals.css</code>에 추가합니다.</p>
                    <pre className="text-xs bg-gray-900 text-yellow-300 px-3 py-2 rounded-lg overflow-x-auto">{`.icon-my-icon::before {
  content: "\\e892"; /* 신규 할당값 */
}`}</pre>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">5</span>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-gray-800">타입 등록</p>
                    <pre className="text-xs bg-gray-900 text-yellow-300 px-3 py-2 rounded-lg overflow-x-auto">{`// src/lib/iconData.ts
export type IconName =
  | 'alarm' | 'star' | ...
  | 'my-icon'  // 추가`}</pre>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* 비교 요약 */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 space-y-2">
            <p className="text-sm font-semibold text-amber-900">어떤 방식이 적합한가?</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-amber-800 leading-relaxed">
              <div>
                <p className="font-medium mb-1">SVG Sprite가 유리한 경우</p>
                <ul className="space-y-0.5 text-xs list-disc list-inside text-amber-700">
                  <li>멀티컬러 아이콘이 필요한 경우</li>
                  <li>path · stroke CSS 애니메이션을 활용하는 경우</li>
                  <li>아이콘이 자주 추가 · 변경되어 빌드 단계를 단순하게 유지해야 하는 경우</li>
                  <li>접근성을 세밀하게 제어해야 하는 경우</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">Icon Font가 유리한 경우</p>
                <ul className="space-y-0.5 text-xs list-disc list-inside text-amber-700">
                  <li>수백 개 이상의 대량 아이콘을 운용하는 경우 (woff2 압축 효율)</li>
                  <li>IE8 등 구형 브라우저 지원이 필요한 경우</li>
                  <li>text-shadow 등 텍스트 CSS 속성을 아이콘에 적용해야 하는 경우</li>
                  <li>JavaScript 없이 CSS만으로 아이콘을 완전히 제어해야 하는 경우</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 자동 판별 예외 처리 */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-0">
              <div className="p-6 space-y-4 lg:border-r border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">추후 개선</span>
                  <code className="text-xs text-gray-400">icon-overrides.json</code>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">자동 판별이 빗나갈 때만 수동으로 덮어쓰기</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    기본은 <code className="bg-gray-100 px-1 rounded">generate-icon-data.mjs</code>가 SVG를 스캔해 자동 생성합니다. 단색 브랜드 로고, gradient, CSS 변수처럼 자동 감지가 애매한 아이콘이 생기면 override 파일로 예외만 선언합니다.
                  </p>
                </div>
                <div className="divide-y divide-gray-100 border-y border-gray-100 text-xs">
                  <div className="grid grid-cols-[120px_1fr] gap-3 py-3">
                    <p className="font-semibold text-gray-700">preserveColor</p>
                    <p className="text-gray-500 leading-relaxed">원본 색상 유지 여부를 강제로 지정합니다.</p>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] gap-3 py-3">
                    <p className="font-semibold text-gray-700">svgOnly</p>
                    <p className="text-gray-500 leading-relaxed">Icon Font 지원 여부 예외를 지정합니다.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 p-6">
                <pre className="text-xs text-green-300 overflow-x-auto">{`// src/assets/icons/icon-overrides.json
{
  "preserveColor": {
    "brand-logo": true,
    "duotone-check": false
  },
  "svgOnly": {
    "legacy-icon": true
  }
}`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 코드 샘플 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">사용 코드 비교</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-2xl p-6 text-white space-y-3">
              <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">SVG Sprite</span>
              <pre className="text-sm text-green-300 overflow-x-auto mt-3">{`// 컴포넌트
<SvgIcon
  name="star"
  size="md"
  color="#3b82f6"
  aria-label="별점"
/>

// 렌더링 결과
<svg role="img" aria-label="별점"
     width="24" height="24"
     style="color: #3b82f6">
  <use href="/sprite/sprite.svg#icon-star" />
</svg>

// 멀티컬러 아이콘은 자동으로 원본 SVG 이미지 사용
<img src="/icons/icon-link-ppt.svg"
     alt="PPT 파일"
     width="24" height="24" />`}</pre>
            </div>
            <div className="bg-gray-900 rounded-2xl p-6 text-white space-y-3">
              <span className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Icon Font</span>
              <pre className="text-sm text-yellow-300 overflow-x-auto mt-3">{`// 컴포넌트
<FontIcon
  name="star"
  size="md"
  color="#3b82f6"
/>

// 렌더링 결과
<i class="icon icon-star is-md"
   aria-hidden="true"
   style="color: #3b82f6">
</i>

// CSS (globals.css)
.icon-star::before {
  content: "\\e877";
  font-family: bbc-icon;
}`}</pre>
            </div>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-400 pb-4">
          아이콘 빌드: <code>npm run build:icons</code> &nbsp;|&nbsp;
          폰트 빌드: gbe-1.0 Fantasticon 방식 차용
        </footer>
      </div>
    </main>
  )
}
