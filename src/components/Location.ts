import { weddingInfo } from '../data/wedding-info'
import { NaverMap } from './NaverMap'

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
          ${NaverMap()}
        </div>
        
        <div class="transport-info">
          <h4>교통편 안내</h4>
          <div class="transport-methods">
            <div class="transport-item">
              <h5>🚇 지하철</h5>
              <p>• 1, 2호선 시청역 7번출구 도보 8분</p>
              <p>• 2호선 을지로입구역 7번출구 도보 5분</p>
              <p>• 4호선 회현역 7번출구 도보 7분</p>
            </div>
            
            <div class="transport-item">
              <h5>🚌 버스</h5>
              <p>• 간선 143, 401, 406, 502, 504, 705</p>
              <p>• 지선 7017, 7021, 7022</p>
            </div>
            
            <div class="transport-item">
              <h5>🚗 자가용</h5>
              <p>• 네비게이션 '한국은행 통합별관' 검색</p>
              <p>• 주차공간이 협소하오니<br/>가급적 대중교통 이용을 권장합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}
