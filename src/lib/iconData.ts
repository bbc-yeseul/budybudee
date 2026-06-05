// 이 파일은 scripts/generate-icon-data.mjs 가 자동 생성합니다. 직접 수정하지 마세요.
// 아이콘 추가 시: src/assets/icons/ 에 SVG 파일을 넣고 npm run build:icons 를 실행하세요.

export type IconName =
  | 'alarm'
  | 'arrow-right'
  | 'calendar'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'copy'
  | 'delete'
  | 'edit'
  | 'eye'
  | 'heart-solid'
  | 'home-solid'
  | 'home'
  | 'icon-link-acrobat'
  | 'icon-link-excel'
  | 'icon-link-hwp'
  | 'icon-link-ppt'
  | 'icon-link-word'
  | 'menu'
  | 'minus'
  | 'notification'
  | 'play-solid'
  | 'plus'
  | 'refresh'
  | 'search'
  | 'settings'
  | 'share'
  | 'star-solid'
  | 'star'
  | 'type-jpeg'
  | 'type-jpg'
  | 'type-pdf'
  | 'type-txt'
  | 'user'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const ICON_SIZE_PX: Record<IconSize, number> = {
  xs: 18, sm: 20, md: 24, lg: 32, xl: 36,
}

/** sprite의 currentColor 대신 원본 SVG 파일을 <img>로 렌더링하는 멀티컬러 아이콘 */
export const PRESERVE_COLOR_ICONS: IconName[] = [
  'icon-link-acrobat',
  'icon-link-excel',
  'icon-link-hwp',
  'icon-link-ppt',
  'icon-link-word',
  'type-jpeg',
  'type-jpg',
  'type-pdf',
  'type-txt',
]

/** Icon Font에 글리프가 없는 SVG 전용 아이콘 (globals.css 기준) */
export const SVG_ONLY_ICONS: IconName[] = [
  'icon-link-acrobat',
  'icon-link-excel',
  'icon-link-hwp',
  'icon-link-ppt',
  'icon-link-word',
  'type-jpeg',
  'type-jpg',
  'type-pdf',
  'type-txt',
]

/** 파일명에 특수문자가 있어 정규화 name과 실제 파일명이 다른 아이콘 */
export const ORIGINAL_ICON_FILE_NAME: Partial<Record<IconName, string>> = {
  'type-jpeg': 'type=jpeg',
  'type-jpg': 'type=jpg',
  'type-pdf': 'type=pdf',
  'type-txt': 'type=txt',
}

export const ALL_ICONS: IconName[] = [
  'alarm',
  'arrow-right',
  'calendar',
  'check',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up',
  'copy',
  'delete',
  'edit',
  'eye',
  'heart-solid',
  'home-solid',
  'home',
  'icon-link-acrobat',
  'icon-link-excel',
  'icon-link-hwp',
  'icon-link-ppt',
  'icon-link-word',
  'menu',
  'minus',
  'notification',
  'play-solid',
  'plus',
  'refresh',
  'search',
  'settings',
  'share',
  'star-solid',
  'star',
  'type-jpeg',
  'type-jpg',
  'type-pdf',
  'type-txt',
  'user',
]
