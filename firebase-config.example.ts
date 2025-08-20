// Firebase 설정 예시 파일
// 이 파일을 복사해서 src/firebase-config.ts 로 저장하고 실제 값으로 변경하세요

export const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}

// Firebase 프로젝트 생성 및 설정 방법:
// 1. https://console.firebase.google.com/ 접속
// 2. "프로젝트 추가" 클릭
// 3. 프로젝트 이름 입력 (예: wedding-guestbook)
// 4. Google Analytics 사용 여부 선택 (선택사항)
// 5. 프로젝트 생성 후 "웹 앱 추가" 선택
// 6. 앱 닉네임 입력
// 7. Firebase Hosting 설정 (선택사항)
// 8. 제공된 설정 정보를 위 firebaseConfig에 입력
//
// Firestore 데이터베이스 설정:
// 1. Firebase 콘솔에서 "Firestore Database" 선택
// 2. "데이터베이스 만들기" 클릭
// 3. 테스트 모드로 시작 (나중에 보안 규칙 설정 가능)
// 4. 위치 선택 (asia-northeast3 - 서울 권장)
//
// 보안 규칙 설정 (선택사항):
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /guestbook/{document} {
//       allow read: if true;
//       allow write: if true;
//     }
//   }
// }
