import { WeddingInfo, GalleryImage, ContactInfo } from '../types'

export const weddingInfo: WeddingInfo = {
  bride: {
    name: '김영희',
    nameEn: 'Young Hee Kim',
    father: '김아버지',
    mother: '김어머니'
  },
  groom: {
    name: '박철수',
    nameEn: 'Chul Soo Park', 
    father: '박아버지',
    mother: '박어머니'
  },
  ceremony: {
    date: '2024년 12월 15일',
    time: '오후 2시 30분',
    venue: '웨딩홀',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678'
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
