import { contactInfo } from '../data/wedding-info'
import { Guestbook } from './Guestbook'

export function Contact(): string {
  // 신랑측과 신부측 연락처 분리
  const groomContacts = contactInfo.filter(contact => contact.name.includes('신랑측'))
  const brideContacts = contactInfo.filter(contact => contact.name.includes('신부측'))
  
  const createContactList = (contacts: any[]) => 
    contacts.map(contact => `
      <div class="contact-item">
        <p class="contact-name">${contact.name}</p>
        <p class="contact-relation">${contact.relation}</p>
        <a href="tel:${contact.phone}" class="contact-phone">
          📞 ${contact.phone}
        </a>
      </div>
    `).join('')
  
  return `
    <section id="contact" class="contact">
      <div class="container">
        <h2 class="section-title">Contact</h2>
        <p class="contact-subtitle">연락처</p>
        
        <!-- 토글 버튼 -->
        <div class="contact-toggle">
          <button class="toggle-btn active" data-side="groom">신랑측</button>
          <button class="toggle-btn" data-side="bride">신부측</button>
        </div>
        
        <!-- 연락처 그리드 -->
        <div class="contact-content">
          <div class="contact-grid" id="groom-contacts" style="display: block;">
            ${createContactList(groomContacts)}
          </div>
          <div class="contact-grid" id="bride-contacts" style="display: none;">
            ${createContactList(brideContacts)}
          </div>
        </div>
        
        ${Guestbook()}
        
        <!-- 공유 버튼 섹션 -->
        <div class="share-section">
          <div class="share-buttons">
            <button class="share-btn copy-link-btn" onclick="copyLink()">
              <span class="share-icon">📋</span>
              <span class="share-text">청첩장 주소 복사하기</span>
            </button>
          </div>
        </div>
        
        <footer class="wedding-footer">
          <p class="footer-text">
            저희의 새로운 시작에<br>
            함께해 주셔서 감사합니다
          </p>
          <div class="footer-heart">♥</div>
        </footer>
      </div>
    </section>
  `
}
