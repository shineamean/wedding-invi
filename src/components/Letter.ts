import { weddingInfo } from '../data/wedding-info'

export function Letter(): string {
  const { bride, groom } = weddingInfo
  
  return `
    <section id="letter" class="letter">
      <div class="container">
        <h2 class="section-title-kr">초대합니다</h2>
        
        <div class="letter-content">
          <p class="greeting">
            소중한 분들을 모시고<br>
            저희 두 사람이 사랑의 결실을<br>
            이루려고 합니다.
          </p>
          
          <p class="invitation-text">
            평생을 함께 하며 서로 사랑하고<br>
            존경하며 신뢰할 수 있는<br>
            아름다운 가정을 이루고자 합니다.
          </p>
          
          <p class="blessing-request">
            저희의 새로운 시작을<br>
            축복해 주시기 바랍니다.
          </p>
          
          <div class="parents-info">
            <div class="groom-parents">
              <p class="parent-title">신랑</p>
              <p class="parent-names">${groom.father} · ${groom.mother}의 아들 <strong>${groom.name}</strong></p>
            </div>
            
            <div class="bride-parents">
              <p class="parent-title">신부</p>
              <p class="parent-names">${bride.father} · ${bride.mother}의 딸 <strong>${bride.name}</strong></p>
            </div>
          </div>
          
          <div class="congratulation-section">
            <button class="congratulation-btn" id="congratulation-btn">
              <span>축하 연락하기</span>
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
}
