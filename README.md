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

### 갤러리 이미지 교체

**방법 1: 로컬 이미지 사용**
1. `public/images/` 폴더에 실제 웨딩 사진들을 추가
2. `src/data/wedding-info.ts`에서 `galleryImages` 배열의 `src` 경로를 `'./images/your-photo.jpg'`로 수정

**방법 2: 온라인 이미지 사용 (현재 설정)**
- 현재는 [Lorem Picsum](https://picsum.photos/) placeholder 이미지를 사용
- 실제 이미지 URL로 교체 가능

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

**1단계: GitHub 저장소 생성 및 코드 업로드**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/shineamean/wedding-invi.git
git push -u origin main
```

**2단계: GitHub Pages 설정**
1. GitHub 저장소 Settings > Pages로 이동
2. **Source**를 "Deploy from a branch" 선택
3. **Branch**를 "gh-pages" 선택 (자동 생성됨)
4. **Save** 클릭

**3단계: 배포 확인**
- main 브랜치에 push하면 자동으로 GitHub Actions가 실행됩니다
- Actions 탭에서 배포 진행상황을 확인할 수 있습니다
- 성공하면 `gh-pages` 브랜치에 빌드된 파일들이 배포됩니다
- 몇 분 후 `https://shineamean.github.io/wedding-invi/`에서 확인 가능

### 문제 해결

**빌드되지 않은 원본 HTML이 배포되는 경우:**
1. GitHub Pages 설정에서 Source가 "Deploy from a branch"로 설정되었는지 확인
2. Branch가 "gh-pages"로 선택되었는지 확인
3. GitHub Actions 탭에서 배포가 성공했는지 확인
4. `gh-pages` 브랜치에 빌드된 파일들이 있는지 확인

**권한 오류가 발생하는 경우:**
1. 저장소 Settings > Actions > General 이동
2. "Workflow permissions"에서 "Read and write permissions" 선택
3. "Allow GitHub Actions to create and approve pull requests" 체크
4. Save 후 다시 배포 시도

**404 오류가 계속 발생하는 경우:**
- 브라우저 캐시 삭제 후 재시도
- GitHub Pages 배포 완료까지 5-10분 대기

## 📄 라이선스

MIT License
