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
    lat: 37.562068,
    lon: 126.980357,
    naverMapUrl: 'https://map.naver.com/p/search/서울특별시%20중구%20남대문로%2039',
    kakaoMapUrl: 'https://map.kakao.com/link/search/서울특별시%20중구%20남대문로%2039'
  }
}

export const galleryImages: GalleryImage[] = [
  {
    src: '/wedding-invi/images/photo1.png',
    alt: '웨딩 사진 1',
    width: 800,
    height: 600
  },
  {
    src: '/wedding-invi/images/photo2.png',
    alt: '웨딩 사진 2', 
    width: 800,
    height: 600
  },
  {
    src: '/wedding-invi/images/photo3.png',
    alt: '웨딩 사진 3',
    width: 600,
    height: 800
  },
  {
    src: '/wedding-invi/images/photo4.png',
    alt: '웨딩 사진 4',
    width: 800,
    height: 600
  },
  {
    src: '/wedding-invi/images/photo5.png',
    alt: '웨딩 사진 5',
    width: 600,
    height: 800
  },
  {
    src: '/wedding-invi/images/photo6.png',
    alt: '웨딩 사진 6',
    width: 800,
    height: 600
  },
  {
    src: '/wedding-invi/images/photo7.png',
    alt: '웨딩 사진 7',
    width: 600,
    height: 800
  },
  {
    src: '/wedding-invi/images/photo8.png',
    alt: '웨딩 사진 8',
    width: 800,
    height: 600
  },
  {
    src: '/wedding-invi/images/photo9.png',
    alt: '웨딩 사진 9',
    width: 600,
    height: 800
  },
  {
    src: '/wedding-invi/images/photo10.png',
    alt: '웨딩 사진 10',
    width: 800,
    height: 600
  },
  {
    src: '/wedding-invi/images/photo11.png',
    alt: '웨딩 사진 11',
    width: 600,
    height: 800
  }
]

export const contactInfo: ContactInfo[] = [
  {
    name: '신랑',
    relation: '김지환',
    phone: '010-9297-9769'
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
    phone: '010-9119-0317'
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


