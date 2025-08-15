import { contactInfo } from '../data/wedding-info'

export function Contact(): string {
  const contactList = contactInfo.map(contact => `
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
        
        <div class="contact-grid">
          ${contactList}
        </div>
        
        <div class="message-section">
          <h3>축하 메시지</h3>
          <p class="message-note">
            축하의 마음을 전해주세요<br>
            소중한 말씀 감사히 받겠습니다
          </p>
          
          <div class="message-buttons">
            <button class="message-btn" onclick="window.open('sms:', '_blank')">
              💌 문자 보내기
            </button>
            <button class="message-btn" onclick="window.open('mailto:', '_blank')">
              📧 이메일 보내기
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
