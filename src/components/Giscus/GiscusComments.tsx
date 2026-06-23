'use client'

import Giscus from '@giscus/react'
import { usePathname } from 'next/navigation'
import { GISCUS_CONFIG } from '@/lib/giscus'

interface GiscusCommentsProps {
  theme?: 'light' | 'dark'
}

export default function GiscusComments({ theme = 'light' }: GiscusCommentsProps) {
  const pathname = usePathname()

  return (
    <Giscus
      repo={GISCUS_CONFIG.repo}
      repoId={GISCUS_CONFIG.repoId}
      category={GISCUS_CONFIG.category}
      categoryId={GISCUS_CONFIG.categoryId}
      mapping="specific"
      term={pathname}
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="ko"
      loading="lazy"
    />
  )
}
