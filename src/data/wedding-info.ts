import { WeddingInfo, GalleryImage, ContactInfo } from '../types'

export const weddingInfo: WeddingInfo = {
  bride: {
    name: '김이현',
    nameEn: 'Yi Hyun Kim', 
    father: '김진호',
    mother: '이숙희'
  },
  groom: {
    name: '김지환',
    nameEn: 'Ji Hwan Kim',
    father: '김봉수',
    mother: '정영주'
  },
  ceremony: {
    date: '2025년 12월 14일',
    time: '오후 12시 30분',
    venue: '한국은행 2층 컨퍼런스홀',
    address: '서울특별시 중구 남대문로 39'
  },
  mapInfo: {
    lat: 37.5640907,
    lon: 126.9813174,
    naverMapUrl: 'https://map.naver.com/p/search/%ED%95%9C%EA%B5%AD%EC%9D%80%ED%96%89/place/11572364',
    kakaoMapUrl: 'https://map.kakao.com/link/map/%ED%95%9C%EA%B5%AD%EC%9D%80%ED%96%89,37.5640907,126.9813174'
  }
}

export const galleryImages: GalleryImage[] = [
  {
    src: './images/photo1.png',
    alt: '웨딩 사진 1',
    width: 800,
    height: 600
  },
  {
    src: './images/photo2.png',
    alt: '웨딩 사진 2', 
    width: 800,
    height: 600
  },
  {
    src: './images/photo3.png',
    alt: '웨딩 사진 3',
    width: 600,
    height: 800
  },
  {
    src: './images/photo4.png',
    alt: '웨딩 사진 4',
    width: 800,
    height: 600
  },
  {
    src: './images/photo5.png',
    alt: '웨딩 사진 5',
    width: 600,
    height: 800
  },
  {
    src: './images/photo6.png',
    alt: '웨딩 사진 6',
    width: 800,
    height: 600
  },
  {
    src: './images/photo7.png',
    alt: '웨딩 사진 7',
    width: 600,
    height: 800
  },
  {
    src: './images/photo8.png',
    alt: '웨딩 사진 8',
    width: 800,
    height: 600
  },
  {
    src: './images/photo9.png',
    alt: '웨딩 사진 9',
    width: 600,
    height: 800
  },
  {
    src: './images/photo10.png',
    alt: '웨딩 사진 10',
    width: 800,
    height: 600
  },
  {
    src: './images/photo11.png',
    alt: '웨딩 사진 11',
    width: 600,
    height: 800
  }
]

export const contactInfo: ContactInfo[] = [
  {
    name: '신랑',
    relation: '김지환',
    phone: '010-1234-5678'
  },
  {
    name: '신랑측 아버지',
    relation: '김봉수',
    phone: '010-8628-9769'
  },
  {
    name: '신랑측 어머니', 
    relation: '정영주',
    phone: '010-5603-9769'
  },
  {
    name: '신부',
    relation: '김이현',
    phone: '010-9876-5432'
  },
  {
    name: '신부측 아버지',
    relation: '김진호', 
    phone: '010-4155-4772'
  },
  {
    name: '신부측 어머니',
    relation: '이숙희',
    phone: '010-9477-0317'
  }
]


