import type { IconName, IconSize } from '@/lib/iconData'

interface FontIconProps {
  name: IconName
  size?: IconSize
  color?: string
  className?: string
}

export default function FontIcon({
  name,
  size = 'md',
  color,
  className,
}: FontIconProps) {
  return (
    <i
      className={`icon icon-${name} is-${size}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
      style={color ? { color } : undefined}
    />
  )
}
