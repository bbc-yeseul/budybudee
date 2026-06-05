# SVG Sprite vs Icon Font

SVG Sprite 방식과 Icon Font(웹폰트) 방식을 나란히 비교하는 인터랙티브 데모 프로젝트입니다.  
Icon Font는 [gbe-1.0](../gbe-1.0) 프로젝트의 Fantasticon 빌드 결과물을 차용했습니다.

## 비교 방식

| | SVG Sprite | Icon Font |
|---|---|---|
| 렌더링 | `<svg><use href="sprite.svg#id">` | `<i class="icon icon-name">` + CSS `::before` |
| 색상 제어 | 단색 아이콘은 `currentColor`로 제어 | `color` 속성만 가능 |
| 멀티컬러 | 원본 SVG를 `<img>`로 렌더링 | 불가 |
| 접근성 | `aria-label` / `decorative` 분기 지원 | `aria-hidden` 처리 필요 |
| 파일 요청 | `sprite.svg` 단일 요청 | woff2 / woff / ttf 다중 포맷 |
| 빌드 도구 | Node.js 스크립트 | Fantasticon |

## 프로젝트 구조

```
svgtest/
├── public/
│   ├── fonts/bbc-icon/          # gbe-1.0 폰트 파일 (woff2, woff, ttf)
│   ├── icons/                   # 원본 SVG 파일 서빙 (멀티컬러 img 렌더링용)
│   └── sprite/sprite.svg        # 빌드 스크립트로 자동 생성
├── src/
│   ├── app/
│   │   ├── page.tsx             # 비교 UI 메인 페이지
│   │   └── globals.css          # @font-face + .icon 클래스 정의 (폰트 지원 기준)
│   ├── assets/icons/            # 소스 SVG 파일
│   ├── components/
│   │   ├── SvgSprite/           # SvgIcon 컴포넌트
│   │   └── FontIcon/            # FontIcon 컴포넌트
│   └── lib/iconData.ts          # ⚡ 자동 생성 — 직접 수정 금지
└── scripts/
    ├── generate-icon-data.mjs   # iconData.ts 자동 생성 스크립트
    └── build-sprite.mjs         # SVG → sprite.svg 빌드 스크립트
```

## 아이콘 추가 방법

**SVG 파일을 넣고 빌드 한 번만 실행하면 끝입니다.**

```bash
# 1. SVG 파일 추가
cp my-icon.svg src/assets/icons/

# 2. 아이콘 빌드 (iconData.ts 자동 갱신 + sprite.svg 재생성)
npm run build:icons
```

`npm run dev` 실행 시에도 자동으로 선행 실행됩니다.

### 폰트 아이콘으로도 지원하려면

`src/app/globals.css` 에 `::before` 규칙을 추가합니다. 다음 빌드 시 `SVG_ONLY_ICONS`에서 자동으로 제외됩니다.

```css
.icon-my-icon::before { content: "\eXXX"; }
```

### iconData.ts 자동 생성 규칙

`scripts/generate-icon-data.mjs` 가 아래 기준으로 `src/lib/iconData.ts` 를 자동 생성합니다.

| 항목 | 감지 기준 |
|---|---|
| `IconName` 타입 | `src/assets/icons/` 파일명에서 자동 생성 |
| `PRESERVE_COLOR_ICONS` | SVG 내 유효 색상(hex·named)이 2종류 이상 → 멀티컬러로 분류 |
| `SVG_ONLY_ICONS` | `globals.css` 에 `.icon-{name}::before` 규칙 없음 |
| `ORIGINAL_ICON_FILE_NAME` | 파일명에 `=` 등 특수문자 → 정규화 name과 매핑 |

### 추후 개선: icon-overrides.json

현재 아이콘 메타데이터는 자동 감지 결과를 그대로 사용합니다. 다만 아래처럼 자동 판별이 빗나가는 아이콘이 생기면 `src/assets/icons/icon-overrides.json` 같은 수동 override 파일을 도입하는 것이 좋습니다.

- 단색 브랜드 로고처럼 색상은 1개지만 원본 색상을 유지해야 하는 경우
- 색상은 2개 이상이지만 실제로는 `currentColor` 단색 아이콘으로 써도 되는 경우
- `gradient`, `style=""`, CSS 변수 등으로 색상이 선언되어 자동 색상 감지가 불완전한 경우
- `globals.css` 규칙만으로 Icon Font 지원 여부를 판단하기 어려운 경우

예상 형식:

```json
{
  "preserveColor": {
    "brand-logo": true,
    "duotone-check": false
  },
  "svgOnly": {
    "legacy-icon": true
  }
}
```

도입 시 `scripts/generate-icon-data.mjs`에서 자동 감지 결과 위에 override 값을 덮어씌우면 됩니다.

## 컴포넌트 사용법

### SvgIcon (SVG Sprite 방식)

```tsx
import { SvgIcon } from '@/components/SvgSprite'

// 기본
<SvgIcon name="star" />

// 사이즈 지정 (xs | sm | md | lg | xl 또는 숫자 px)
<SvgIcon name="home" size="lg" />
<SvgIcon name="home" size={48} />

// 색상 지정 (단색 아이콘만 적용)
<SvgIcon name="star" color="#ff4444" />

// 접근성 라벨
<SvgIcon name="search" aria-label="검색" />

// 장식용 (보조기술에서 숨김)
<SvgIcon name="chevron-right" decorative />

// 멀티컬러 아이콘 — PRESERVE_COLOR_ICONS에 등록된 경우 자동으로 <img> 렌더링
<SvgIcon name="icon-link-ppt" aria-label="PPT 파일" />
```

### FontIcon (Icon Font 방식)

```tsx
import { FontIcon } from '@/components/FontIcon'

// 기본
<FontIcon name="star" />

// 사이즈 지정 (xs | sm | md | lg | xl)
<FontIcon name="home" size="lg" />

// 색상 지정
<FontIcon name="star" color="#ff4444" />
```

## 개발 환경 실행

> 로컬에 Node.js가 없는 경우 Docker를 사용합니다.

```bash
# Docker로 개발 서버 실행 (http://localhost:3010)
docker run --rm -d --name svgtest-dev \
  -p 3010:3000 \
  -v $(pwd):/app -w /app \
  node:20-alpine \
  sh -c "npm run dev -- --port 3000"

# 로컬 node가 있는 경우
npm run dev
```

## 아이콘 빌드

`npm run build:icons` 는 두 스크립트를 순서대로 실행합니다.

```
1. generate-icon-data.mjs  →  src/lib/iconData.ts 자동 생성
2. build-sprite.mjs        →  public/sprite/sprite.svg 생성
                               (단색 아이콘의 fill/stroke를 currentColor로 치환)
```

```bash
# 수동 실행
npm run build:icons

# Docker
docker run --rm -v $(pwd):/app -w /app node:20-alpine npm run build:icons
```

`npm run build:sprite` 는 기존 사용법을 위한 호환 alias입니다.

## 테스트

Vitest + Testing Library 기반.

```bash
# Docker
docker run --rm -v $(pwd):/app -w /app node:20-alpine npx vitest run

# 로컬
npm test
```

## 기술 스택

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Vitest** + Testing Library
- **Fantasticon** (Icon Font 빌드 — gbe-1.0 참조)
