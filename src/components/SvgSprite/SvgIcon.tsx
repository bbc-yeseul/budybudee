import type { IconName, IconSize } from '@/lib/iconData'
import { ICON_SIZE_PX, ORIGINAL_ICON_FILE_NAME, PRESERVE_COLOR_ICONS } from '@/lib/iconData'

interface SvgIconProps {
  name: IconName
  size?: IconSize | number
  color?: string
  className?: string
  'aria-label'?: string
  /** true면 보조기술에서 숨김 */
  decorative?: boolean
  /** 생략하면 멀티컬러 아이콘 목록에 따라 자동으로 원본 SVG 파일을 img로 렌더링 */
  preserveColor?: boolean
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function SvgIcon({
  name,
  size = 'md',
  color,
  className,
  'aria-label': ariaLabel,
  decorative = false,
  preserveColor,
}: SvgIconProps) {
  const px = typeof size === 'number' ? size : ICON_SIZE_PX[size]
  const label = ariaLabel ?? name
  const accessibilityProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'img' as const, 'aria-label': label }

  // 파일명의 특수문자(= 등)를 하이픈으로 정규화 (build-sprite와 동일 규칙)
  const fileId = name.replace(/[^a-zA-Z0-9-]/g, '-')
  const shouldPreserveColor = preserveColor ?? PRESERVE_COLOR_ICONS.includes(name)

  if (shouldPreserveColor) {
    const fileName = ORIGINAL_ICON_FILE_NAME[name] ?? name

    return (
      // eslint-disable-next-line @next/next/no-img-element -- SVG icon fallback preserves author-defined multi-color fills.
      <img
        src={`${BASE_PATH}/icons/${fileName}.svg`}
        alt={decorative ? '' : label}
        aria-hidden={decorative ? true : undefined}
        width={px}
        height={px}
        className={className}
      />
    )
  }

  return (
    <svg
      {...accessibilityProps}
      width={px}
      height={px}
      className={className}
      style={color ? { color } : undefined}
    >
      <use href={`${BASE_PATH}/sprite/sprite.svg#icon-${fileId}`} />
    </svg>
  )
}
