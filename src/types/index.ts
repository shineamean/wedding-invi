export interface WeddingInfo {
  bride: {
    name: string
    nameEn: string
    father: string
    mother: string
  }
  groom: {
    name: string
    nameEn: string
    father: string
    mother: string
  }
  ceremony: {
    date: string
    time: string
    venue: string
    address: string
  }
  mapInfo: {
    lat: number
    lon: number
    naverMapUrl: string
    kakaoMapUrl: string
  }
}

export interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ContactInfo {
  name: string
  relation: string
  phone: string
}

export interface AccountInfo {
  side: 'groom' | 'bride'
  owner: string
  bank: string
  accountNumber: string
}

