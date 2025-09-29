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
      zoom: 16,
      minZoom: 12,
      maxZoom: 19,
      draggable: true,           // 드래그로 지도 이동 가능
      pinchZoom: true,          // 핀치 줌 가능
      scrollWheel: true,        // 마우스 휠로 줌 가능
      keyboardShortcuts: true,  // 키보드 단축키 가능
      disableDoubleTapZoom: false,    // 더블탭 줌 가능
      disableDoubleClickZoom: false,  // 더블클릭 줌 가능
      disableTwoFingerTapZoom: false, // 두 손가락 탭 줌 가능
      zoomControl: true,        // 줌 컨트롤 버튼 표시
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT
      }
    })

    // 마커 추가
    const marker = new window.naver.maps.Marker({
      position: location,
      map: map,
      title: '한국은행 2층 컨퍼런스홀',
      icon: {
        content: '<div style="background: #ff6b6b; color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px; font-weight: bold; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">💒 웨딩홀</div>',
        anchor: new window.naver.maps.Point(30, 30)
      }
    })

    // 정보창 추가
    const infoWindow = new window.naver.maps.InfoWindow({
      content: `
        <div style="padding: 15px; min-width: 200px;">
          <h4 style="margin: 0 0 8px 0; color: #333;">${weddingInfo.ceremony.venue}</h4>
          <p style="margin: 0 0 5px 0; color: #666; font-size: 13px;">${weddingInfo.ceremony.address}</p>
          <p style="margin: 0; color: #666; font-size: 13px;">📅 ${weddingInfo.ceremony.date} ${weddingInfo.ceremony.time}</p>
        </div>
      `
    })

    // 마커 클릭시 정보창 표시
    window.naver.maps.Event.addListener(marker, 'click', () => {
      if (infoWindow.getMap()) {
        infoWindow.close()
      } else {
        infoWindow.open(map, marker)
      }
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
