# 모바일 청첩장 (Wedding Invitation)

TypeScript와 Vite를 기반으로 한 모바일 최적화 청첩장입니다.

## 🎨 기능

- 📱 모바일 최적화된 반응형 디자인
- 💝 아름다운 애니메이션과 UI
- 📸 갤러리 섹션
- 📍 위치 및 교통편 안내
- 📞 연락처 정보
- 🚀 GitHub Pages 자동 배포

## 🛠️ 기술 스택

- **TypeScript** - 타입 안전성을 위한 정적 타입 언어
- **Vite** - 빠른 빌드 도구
- **CSS3** - 모던 스타일링과 애니메이션
- **GitHub Pages** - 무료 호스팅

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 배포 (GitHub Pages)

```bash
npm run deploy
```

## 📝 커스터마이징

### 웨딩 정보 수정

`src/data/wedding-info.ts` 파일에서 신랑신부 정보, 예식 정보, 연락처 등을 수정할 수 있습니다.

```typescript
export const weddingInfo: WeddingInfo = {
  bride: {
    name: '신부이름',
    nameEn: 'Bride Name',
    father: '신부아버지',
    mother: '신부어머니'
  },
  groom: {
    name: '신랑이름', 
    nameEn: 'Groom Name',
    father: '신랑아버지',
    mother: '신랑어머니'
  },
  ceremony: {
    date: '2024년 12월 15일',
    time: '오후 2시 30분',
    venue: '웨딩홀명',
    address: '주소',
    phone: '전화번호'
  }
}
```

### 갤러리 이미지 추가

1. `public/images/` 폴더에 이미지 파일들을 추가
2. `src/data/wedding-info.ts`의 `galleryImages` 배열 수정

### 스타일 커스터마이징

`src/styles/global.css`에서 색상, 폰트, 레이아웃 등을 수정할 수 있습니다.

## 📱 모바일 최적화

- 터치 친화적인 UI/UX
- 다양한 화면 크기 대응
- 가벼운 이미지 최적화
- 빠른 로딩 속도

## 🌐 배포

GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

### 배포 설정 방법

1. GitHub 저장소 생성 후 코드 push
2. GitHub 저장소 Settings > Pages로 이동
3. **Source**를 "GitHub Actions"로 설정
4. 또는 **Source**를 "Deploy from a branch"로 설정하고 **Branch**를 "gh-pages"로 선택
5. main 브랜치에 push시 자동 배포

### 문제 해결

GitHub Pages가 활성화되지 않은 경우:
- 저장소 Settings > Pages에서 수동으로 활성화
- 또는 대안 워크플로우 사용 (deploy-alternative.yml.backup 파일 참조)

## 📄 라이선스

MIT License
