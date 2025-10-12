import { accountInfo } from '../data/wedding-info'
import { Guestbook } from './Guestbook'

export function Contact(): string {
  // 신랑측과 신부측 계좌 분리
  const groomAccounts = accountInfo.filter(account => account.side === 'groom')
  const brideAccounts = accountInfo.filter(account => account.side === 'bride')
  
  const createAccountList = (accounts: any[]) =>
    accounts.map(account => `
      <div class="account-item">
        <div class="account-info">
          <div class="account-owner">${account.owner}</div>
          <div class="account-number">${account.bank} ${account.accountNumber}</div>
        </div>
        <button class="copy-account-btn" onclick="copyAccountNumber('${account.bank}', '${account.accountNumber}', '${account.owner}')">
          복사
        </button>
      </div>
    `).join('')
  
  return `
    <section id="account" class="account-section">
      <div class="container">
        <h2 class="section-title-kr">마음 전할 곳</h2>
        <p class="account-subtitle">참석이 어려우신 분들께서는<br>축하의 마음을 전달해주세요</p>
        
        <!-- 계좌번호 아코디언 -->
        <div class="account-container">
          <div class="account-group">
            <button class="account-header" data-side="groom" onclick="toggleAccount('groom')">
              <span>신랑측 계좌번호</span>
              <span class="arrow" id="groom-arrow">▼</span>
            </button>
            <div class="account-content" id="groom-account" style="display: none;">
              ${createAccountList(groomAccounts)}
            </div>
          </div>
          
          <div class="account-group">
            <button class="account-header" data-side="bride" onclick="toggleAccount('bride')">
              <span>신부측 계좌번호</span>
              <span class="arrow" id="bride-arrow">▼</span>
            </button>
            <div class="account-content" id="bride-account" style="display: none;">
              ${createAccountList(brideAccounts)}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section id="guestbook" class="guestbook">
      <div class="container">
        ${Guestbook()}
      </div>
    </section>
    
    <footer class="wedding-footer">
      <div class="container">
        <p class="footer-text">
          저희의 새로운 시작에<br>
          함께해 주셔서 감사합니다
        </p>
        <div class="footer-heart">♥</div>
      </div>
    </footer>
  `
}
