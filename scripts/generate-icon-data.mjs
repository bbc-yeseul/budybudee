/**
 * src/assets/icons/*.svg 를 스캔해 src/lib/iconData.ts 를 자동 생성합니다.
 *
 * 판별 기준
 *   - PRESERVE_COLOR_ICONS : SVG 내 hex 색상이 2종류 이상 → 멀티컬러 아이콘
 *   - SVG_ONLY_ICONS        : src/app/globals.css 에 .icon-{name}::before 규칙 없음 → 폰트 미지원
 *   - ORIGINAL_ICON_FILE_NAME: 파일명에 특수문자(= 등)가 있어 정규화 name과 실제 파일명이 다른 경우
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const iconsDir   = path.join(__dirname, '../src/assets/icons')
const cssPath    = path.join(__dirname, '../src/app/globals.css')
const outputPath = path.join(__dirname, '../src/lib/iconData.ts')

// ── 1. globals.css에서 폰트 매핑된 아이콘 이름 추출 ──────────────────────────
const css = fs.readFileSync(cssPath, 'utf8')
const fontMapped = new Set(
  [...css.matchAll(/\.icon-([a-zA-Z0-9-]+)::before/g)].map(m => m[1])
)

// ── 2. SVG 멀티컬러 감지 ─────────────────────────────────────────────────────
// fill/stroke 속성에서 "none" · "transparent" · "currentColor"를 제외한 모든 색상값 수집
function detectColors(svgContent) {
  const IGNORE = new Set(['none', 'transparent', 'currentcolor', 'inherit'])
  const attrRe = /(?:fill|stroke)="([^"]+)"/g
  const colors = new Set()

  for (const [, value] of svgContent.matchAll(attrRe)) {
    const v = value.trim().toLowerCase()
    if (IGNORE.has(v)) continue

    // hex 색상 정규화 (#fff → ffffff)
    if (v.startsWith('#')) {
      const hex = v.slice(1)
      const normalized = hex.length === 3
        ? hex.split('').map(c => c + c).join('')
        : hex
      colors.add(normalized)
    } else {
      // white, black 등 CSS 키워드 색상
      colors.add(v)
    }
  }
  return colors
}

// ── 3. SVG 파일 목록 수집 및 메타데이터 생성 ─────────────────────────────────
const svgFiles = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg')).sort()

const icons = svgFiles.map(file => {
  const originalName = path.basename(file, '.svg')
  const name         = originalName.replace(/[^a-zA-Z0-9-]/g, '-')
  const content      = fs.readFileSync(path.join(iconsDir, file), 'utf8')
  const colors       = detectColors(content)

  return {
    name,
    originalFileName : originalName !== name ? originalName : null,
    preserveColor    : colors.size > 1,
    fontSupported    : fontMapped.has(name),
  }
})

// ── 4. 각 목록 ───────────────────────────────────────────────────────────────
const allNames         = icons.map(i => i.name)
const preserveColors   = icons.filter(i => i.preserveColor).map(i => i.name)
const svgOnly          = icons.filter(i => !i.fontSupported).map(i => i.name)
const originalFileNames = Object.fromEntries(
  icons.filter(i => i.originalFileName).map(i => [i.name, i.originalFileName])
)

// ── 5. TypeScript 파일 출력 ──────────────────────────────────────────────────
function fmtList(names) {
  if (!names.length) return '[]'
  return `[\n  ${names.map(n => `'${n}'`).join(',\n  ')},\n]`
}

function fmtRecord(obj) {
  const entries = Object.entries(obj)
  if (!entries.length) return '{}'
  return `{\n${entries.map(([k, v]) => `  '${k}': '${v}',`).join('\n')}\n}`
}

const output = `\
// 이 파일은 scripts/generate-icon-data.mjs 가 자동 생성합니다. 직접 수정하지 마세요.
// 아이콘 추가 시: src/assets/icons/ 에 SVG 파일을 넣고 npm run build:icons 를 실행하세요.

export type IconName =
  | ${allNames.map(n => `'${n}'`).join('\n  | ')}

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const ICON_SIZE_PX: Record<IconSize, number> = {
  xs: 18, sm: 20, md: 24, lg: 32, xl: 36,
}

/** sprite의 currentColor 대신 원본 SVG 파일을 <img>로 렌더링하는 멀티컬러 아이콘 */
export const PRESERVE_COLOR_ICONS: IconName[] = ${fmtList(preserveColors)}

/** Icon Font에 글리프가 없는 SVG 전용 아이콘 (globals.css 기준) */
export const SVG_ONLY_ICONS: IconName[] = ${fmtList(svgOnly)}

/** 파일명에 특수문자가 있어 정규화 name과 실제 파일명이 다른 아이콘 */
export const ORIGINAL_ICON_FILE_NAME: Partial<Record<IconName, string>> = ${fmtRecord(originalFileNames)}

export const ALL_ICONS: IconName[] = ${fmtList(allNames)}
`

fs.writeFileSync(outputPath, output, 'utf8')

console.log(`✓ iconData.ts 생성 완료 (총 ${allNames.length}개)`)
if (preserveColors.length) console.log(`  멀티컬러 (img 렌더링): ${preserveColors.join(', ')}`)
if (svgOnly.length)        console.log(`  SVG only (폰트 미지원): ${svgOnly.join(', ')}`)
