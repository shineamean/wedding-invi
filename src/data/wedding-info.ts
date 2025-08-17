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
  }
}

export const galleryImages: GalleryImage[] = [
  {
    src: 'https://picsum.photos/800/600?random=1',
    alt: '사진 1',
    width: 800,
    height: 600
  },
  {
    src: 'https://picsum.photos/800/600?random=2',
    alt: '사진 2', 
    width: 800,
    height: 600
  },
  {
    src: 'https://picsum.photos/800/600?random=3',
    alt: '사진 3',
    width: 800,
    height: 600
  },
  {
    src: 'https://picsum.photos/800/600?random=4',
    alt: '사진 4',
    width: 800,
    height: 600
  }
]

export const contactInfo: ContactInfo[] = [
  {
    name: '신랑측 아버지',
    relation: '박아버지',
    phone: '010-1234-5678'
  },
  {
    name: '신랑측 어머니', 
    relation: '박어머니',
    phone: '010-2345-6789'
  },
  {
    name: '신부측 아버지',
    relation: '김아버지', 
    phone: '010-3456-7890'
  },
  {
    name: '신부측 어머니',
    relation: '김어머니',
    phone: '010-4567-8901'
  }
]


