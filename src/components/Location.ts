import { weddingInfo } from '../data/wedding-info'

export function Location(): string {
  const { ceremony } = weddingInfo
  
  return `
    <section id="location" class="location">
      <div class="container">
        <h2 class="section-title">Location</h2>
        
        <div class="location-info">
          <div class="venue-info">
            <h3 class="venue-name">${ceremony.venue}</h3>
            <p class="venue-address">${ceremony.address}</p>
          </div>
          
          <div class="ceremony-info">
            <div class="date-time">
              <p class="ceremony-date">${ceremony.date}</p>
              <p class="ceremony-time">${ceremony.time}</p>
            </div>
          </div>
        </div>
        
        <div class="map-container">
          <div class="map-placeholder">
            <p>🗺️ 지도</p>
            <p class="map-note">실제 구현시 Google Maps 또는 네이버 지도 API를 연동해주세요</p>
          </div>
        </div>
        
        <div class="transport-info">
          <h4>교통편 안내</h4>
          <div class="transport-methods">
            <div class="transport-item">
              <h5>🚇 지하철</h5>
              <p>1, 2호선 시청역 7번 출구 도보 7분</p>
              <p>4호선 회현역 7번 출구 도보 5분</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}
