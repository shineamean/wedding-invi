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
  
  if (!clientId || clientId === 'your_actual_client_id_here') {
    console.warn('네이버 지도 Client ID가 설정되지 않았습니다. .env 파일을 확인해주세요.')
    // Client ID가 없어도 지도 버튼들은 작동하도록 함
    return
  }

  // 네이버 지도 API 스크립트 로드
  if (!window.naver) {
    const script = document.createElement('script')
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
    script.onload = () => {
      createMap()
    }
    script.onerror = (error) => {
      console.error('네이버 지도 API 로드 실패:', error)
      console.log('지도 버튼을 통해 외부 지도 서비스를 이용해주세요.')
    }
    document.head.appendChild(script)
  } else {
    createMap()
  }
}

function createMap(): void {
  const { mapInfo } = weddingInfo
  const mapElement = document.getElementById('naver-map')
  
  if (!mapElement) {
    console.warn('지도 컨테이너를 찾을 수 없습니다.')
    return
  }
  
  if (!window.naver || !window.naver.maps) {
    console.warn('네이버 지도 API가 로드되지 않았습니다.')
    return
  }

  try {
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
      map: map,
      title: '한국은행 2층 컨퍼런스홀'
    })
    
    console.log('네이버 지도가 성공적으로 로드되었습니다.')
  } catch (error) {
    console.error('네이버 지도 생성 중 오류 발생:', error)
    // 지도 생성 실패시 대체 메시지 표시
    if (mapElement) {
      mapElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">지도를 불러올 수 없습니다.<br/>아래 버튼을 이용해 외부 지도 서비스를 이용해주세요.</div>'
    }
  }
}

// 전역 타입 선언
declare global {
  interface Window {
    naver: any
  }
}
