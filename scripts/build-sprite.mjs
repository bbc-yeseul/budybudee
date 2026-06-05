import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const iconsDir = path.join(__dirname, '../src/assets/icons')
const outputDir = path.join(__dirname, '../public/sprite')
const outputFile = path.join(outputDir, 'sprite.svg')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const svgFiles = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg')).sort()

const symbols = svgFiles.map(file => {
  // 파일명의 특수문자(= 등)를 하이픈으로 정규화
  const name = path.basename(file, '.svg').replace(/[^a-zA-Z0-9-]/g, '-')
  const content = fs.readFileSync(path.join(iconsDir, file), 'utf8')

  const viewBoxMatch = content.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

  const inner = content
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/g, '')
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')
    // 하드코딩된 fill 색상을 currentColor로 치환 (fill="none"은 유지)
    .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"')
    .replace(/stroke="#[0-9a-fA-F]{3,8}"/g, 'stroke="currentColor"')
    .replace(/\s+/g, ' ')
    .trim()

  return `  <symbol id="icon-${name}" viewBox="${viewBox}">${inner}</symbol>`
}).join('\n')

const sprite = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
${symbols}
</svg>`

fs.writeFileSync(outputFile, sprite, 'utf8')
console.log(`✓ sprite.svg 생성 완료 (${svgFiles.length}개 아이콘)`)
console.log(`  출력: ${outputFile}`)
