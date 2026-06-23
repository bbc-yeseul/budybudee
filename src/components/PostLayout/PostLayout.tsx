import Link from 'next/link'
import type { ReactNode } from 'react'
import { GiscusComments } from '@/components/Giscus'

interface PostLayoutProps {
  title: string
  description?: string
  children: ReactNode
  variant?: 'light' | 'bare'
  backHref?: string
  backLabel?: string
}

export default function PostLayout({
  title,
  description,
  children,
  variant = 'light',
  backHref = '/',
  backLabel = '← 메인으로',
}: PostLayoutProps) {
  if (variant === 'bare') {
    return (
      <>
        {children}
        <div style={{ background: '#0E0E10', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
            <h2 style={{ color: '#E8E8F0', fontSize: '20px', fontWeight: 700, marginBottom: '1.5rem' }}>댓글</h2>
            <GiscusComments theme="dark" />
          </div>
        </div>
      </>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-lg text-gray-500">{description}</p>}
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors"
            >
              {backLabel}
            </Link>
          </div>
        </header>

        {children}

        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">댓글</h2>
          <GiscusComments theme="light" />
        </section>
      </div>
    </main>
  )
}
