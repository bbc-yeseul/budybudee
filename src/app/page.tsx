import Link from 'next/link'

const STUDY_LIST = [
  {
    href: '/svg',
    title: 'SVG Sprite vs Icon Font',
    desc: '두 아이콘 방식의 기능·용량·로딩 차이를 직접 비교해볼 수 있는 인터랙티브 데모',
    badge: 'SVG',
    badgeColor: 'bg-blue-100 text-blue-700',
    accent: 'hover:border-blue-300',
  },
  {
    href: '/vitest',
    title: 'Vitest 테스트 가이드',
    desc: '이 프로젝트의 테스트 환경 설정과 jest-dom 매처 활용법, 실제 테스트 코드 예시',
    badge: 'Vitest',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    accent: 'hover:border-emerald-300',
  },
  {
    href: '/about-frontend',
    title: '프론트엔드 개발자 소개',
    desc: '역할·퍼블리셔 차이·협업 흐름·성능 지표·용어 사전까지 — 타 직군을 위한 프론트엔드 안내서',
    badge: 'FE',
    badgeColor: 'bg-violet-100 text-violet-700',
    accent: 'hover:border-violet-300',
  },
]

export default function MainPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-10">

        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">버디버디 스터디자료모음</h1>
          <p className="text-gray-500 text-base">스터디에서 다룬 주제를 정리한 자료 목록입니다.</p>
        </header>

        <ul className="space-y-4">
          {STUDY_LIST.map(({ href, title, desc, badge, badgeColor, accent }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all ${accent} hover:shadow-md group`}
              >
                <div className="flex items-start gap-4">
                  <span className={`mt-0.5 shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${badgeColor}`}>
                    {badge}
                  </span>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {title}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </main>
  )
}
