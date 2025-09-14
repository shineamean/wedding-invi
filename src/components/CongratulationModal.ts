import { contactInfo } from '../data/wedding-info'

export function CongratulationModal(): string {
  // 신랑측과 신부측 연락처 분리 (신랑/신부 본인 포함)
  const groomContacts = contactInfo.filter(contact => 
    contact.name === '신랑' || contact.name.includes('신랑측')
  )
  const brideContacts = contactInfo.filter(contact => 
    contact.name === '신부' || contact.name.includes('신부측')
  )
  
  const createContactButtons = (contacts: any[], title: string) => `
    <div class="modal-contact-section">
      <h3 class="modal-section-title">${title}</h3>
      ${contacts.map(contact => `
        <div class="modal-contact-item ${contact.name === '신랑' || contact.name === '신부' ? 'main-contact' : ''}">
          <div class="contact-info">
            <span class="contact-role">${contact.relation}</span>
            <span class="contact-relation-text">${contact.name.replace('신랑측 ', '').replace('신부측 ', '')}</span>
          </div>
          <div class="contact-actions">
            <a href="sms:${contact.phone}" class="contact-action-btn sms-btn">
              <span>문자 보내기</span>
            </a>
            <a href="tel:${contact.phone}" class="contact-action-btn call-btn">
              <span>전화하기</span>
            </a>
          </div>
        </div>
      `).join('')}
    </div>
  `
  
  return `
    <div class="congratulation-modal" id="congratulation-modal">
      <div class="modal-overlay" id="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">축하 연락하기</h2>
          <p class="modal-subtitle">직접 축하의 마음을 전해보세요</p>
          <button class="modal-close" id="modal-close">×</button>
        </div>
        
        <div class="modal-body">
          <!-- 토글 탭 -->
          <div class="modal-toggle">
            <button class="modal-toggle-btn active" data-side="groom">신랑에게</button>
            <button class="modal-toggle-btn" data-side="bride">신부에게</button>
          </div>
          
          <!-- 연락처 컨텐츠 -->
          <div class="modal-contacts">
            <div class="modal-contact-content" id="modal-groom-contacts">
              ${createContactButtons(groomContacts, '')}
            </div>
            <div class="modal-contact-content" id="modal-bride-contacts" style="display: none;">
              ${createContactButtons(brideContacts, '')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
