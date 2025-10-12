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
        <div class="footer-credits">
          <p class="made-with-love">Made with ♥</p>
          <a href="https://github.com/shineamean/wedding-invi" target="_blank" rel="noopener noreferrer" class="github-link">
            <svg class="github-icon" viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  `
}
