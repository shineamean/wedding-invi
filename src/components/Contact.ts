import { contactInfo } from '../data/wedding-info'
import { Guestbook } from './Guestbook'

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
        
        ${Guestbook()}
        
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
