# 모바일 청첩장 (Wedding Invitation)

TypeScript와 Vite를 기반으로 한 모바일 최적화 청첩장입니다.

## 🎨 기능

- 📱 모바일 최적화된 반응형 디자인
- 💝 아름다운 애니메이션과 UI
- 📸 갤러리 섹션
- 📍 위치 및 교통편 안내
- 📞 연락처 정보
- 📝 방명록 기능 (Firebase 연동)
- 🚀 GitHub Pages 자동 배포

## 🛠️ 기술 스택

- **TypeScript** - 타입 안전성을 위한 정적 타입 언어
- **Vite** - 빠른 빌드 도구
- **CSS3** - 모던 스타일링과 애니메이션
- **Firebase** - 방명록 데이터 저장 (선택사항)
- **GitHub Pages** - 무료 호스팅

## 🚀 시작하기

### 설치

```bash
npm install
```

### 네이버 지도 API 설정

1. [NAVER CLOUD PLATFORM](https://console.ncloud.com/naver-service/application)에서 어플리케이션을 등록하고 Client ID를 발급받습니다.

2. `.env.sample` 파일을 복사해서 `.env` 파일을 만듭니다:
```bash
cp .env.sample .env
```

3. `.env` 파일에서 `VITE_APP_NAVERMAPS_CLIENT_ID`에 발급받은 Client ID를 입력합니다:
```env
VITE_APP_NAVERMAPS_CLIENT_ID=your_actual_client_id_here
```

> **참고**: 네이버 지도 API 설정 없이도 프로젝트는 정상 작동하며, 지도 버튼(네이버 지도, 카카오맵)을 통해 외부 지도 서비스로 연결됩니다.

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
    address: '주소'
  }
}
```

### 방명록 설정 (Firebase)

방명록 기능을 사용하려면 Firebase 프로젝트를 설정해야 합니다. Firebase를 설정하지 않으면 자동으로 로컬 저장소를 사용합니다.

#### Firebase 설정 방법

1. **Firebase 프로젝트 생성**
   - [Firebase Console](https://console.firebase.google.com/) 접속
   - "프로젝트 추가" 클릭하여 새 프로젝트 생성

2. **웹 앱 추가**
   - 프로젝트 설정에서 "웹 앱 추가" 선택
   - 앱 닉네임 입력 후 등록

3. **Firestore 데이터베이스 설정**
   - Firebase 콘솔에서 "Firestore Database" 선택
   - "데이터베이스 만들기" 클릭
   - **테스트 모드**로 시작 (프로덕션 모드는 보안 규칙 설정 필요)
   - 위치: **asia-northeast3 (서울)** 권장

4. **설정 파일 생성**
   ```bash
   # firebase-config.example.ts 파일을 복사
   cp firebase-config.example.ts src/firebase-config.ts
   ```

5. **Firebase 설정 값 입력**
   - Firebase 콘솔에서 프로젝트 설정 → 일반 탭으로 이동
   - "내 앱" 섹션에서 웹 앱의 "구성" 확인
   - `src/firebase-config.ts` 파일에 설정 값 입력:

   ```typescript
   export const firebaseConfig = {
     apiKey: "실제-api-키",
     authDomain: "프로젝트명.firebaseapp.com",
     projectId: "프로젝트-id",
     storageBucket: "프로젝트명.appspot.com",
     messagingSenderId: "숫자",
     appId: "앱-id"
   }
   ```

#### 보안 규칙 설정 (선택사항)

Firestore 보안 규칙을 설정하여 방명록 스팸을 방지할 수 있습니다:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guestbook/{document} {
      allow read: if true;
      allow create: if request.auth == null 
        && request.resource.data.name is string
        && request.resource.data.message is string
        && request.resource.data.name.size() <= 20
        && request.resource.data.message.size() <= 200;
    }
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

## ✅ 커스터마이징 체크리스트

웨딩 초대장을 완성하기 위한 단계별 체크리스트입니다:

### 기본 설정
- [x] 신랑신부 정보 수정 (`src/data/wedding-info.ts`)
- [x] 예식 일정 및 장소 정보 수정
- [ ] 연락처 정보 업데이트

### 디자인 커스터마이징
- [ ] **색깔 변경하기** - 메인 컬러와 테마색 변경 (`src/styles/global.css`)
- [ ] **문구 수정하기** - 인사말과 메시지 개인화
- [ ] 폰트 및 레이아웃 조정

### 콘텐츠 추가
- [ ] **사진 넣어보기** - 갤러리에 실제 사진 업로드
- [x] **방명록 만들기** - 게스트 메시지 기능 구현
- [x] 네이버 지도 API 설정 (선택사항)

### 배포 및 공유
- [x] GitHub Pages 배포 설정
- [x] 도메인 연결 (선택사항)
- [ ] QR 코드 생성 및 초대장 공유

### 고급 기능
- [ ] 음악 추가
- [ ] 애니메이션 효과 개선
- [ ] 모바일 최적화 확인
- [ ] 접근성 개선

> 💡 **팁**: 각 항목을 완료할 때마다 체크해보세요! 단계별로 진행하면 더 쉽게 완성할 수 있습니다.

## 📄 라이선스

MIT License
