import { weddingInfo } from '../data/wedding-info'

export function NaverMap(): string {
  const { mapInfo } = weddingInfo

  return `
    <div class="naver-map-container">
      <div id="naver-map" class="naver-map"></div>
      <div class="map-buttons">
        <button class="map-btn naver-btn" onclick="window.open('${mapInfo.naverMapUrl}', '_blank')">
          🗺️ 네이버 지도
        </button>
        <button class="map-btn kakao-btn" onclick="window.open('${mapInfo.kakaoMapUrl}', '_blank')">
          🗺️ 카카오맵
        </button>
      </div>
    </div>
  `
}

export function initNaverMap(): void {
  const clientId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID
  
  if (!clientId) {
    console.warn('네이버 지도 Client ID가 설정되지 않았습니다. .env 파일을 확인해주세요.')
    return
  }

  // 네이버 지도 API 스크립트 로드
  if (!window.naver) {
    const script = document.createElement('script')
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
    script.onload = () => {
      createMap()
    }
    document.head.appendChild(script)
  } else {
    createMap()
  }
}

function createMap(): void {
  const { mapInfo } = weddingInfo
  const mapElement = document.getElementById('naver-map')
  
  if (!mapElement || !window.naver) {
    return
  }

  const location = new window.naver.maps.LatLng(mapInfo.lat, mapInfo.lon)
  
  const map = new window.naver.maps.Map(mapElement, {
    center: location,
    zoom: 17,
    draggable: false,
    pinchZoom: false,
    scrollWheel: false,
    keyboardShortcuts: false,
    disableDoubleTapZoom: true,
    disableDoubleClickZoom: true,
    disableTwoFingerTapZoom: true
  })

  // 마커 추가
  new window.naver.maps.Marker({
    position: location,
    map: map
  })
}

// 전역 타입 선언
declare global {
  interface Window {
    naver: any
  }
}
