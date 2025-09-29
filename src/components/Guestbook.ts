import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'

import { firebaseConfig } from '../firebase-config'

interface GuestbookEntry {
  id?: string
  name: string
  message: string
  timestamp: any
}

class GuestbookManager {
  private app: any
  private db: any
  private isFirebaseConfigured = false
  private initPromise: Promise<void>

  constructor() {
    this.initPromise = this.initializeFirebase()
  }

  private async initializeFirebase() {
    try {
      if (firebaseConfig && firebaseConfig.apiKey) {
        this.app = initializeApp(firebaseConfig)
        this.db = getFirestore(this.app)
        this.isFirebaseConfigured = true
        console.log('Firebase가 성공적으로 초기화되었습니다.')
      } else {
        console.log('Firebase 설정이 없습니다. 로컬 저장소를 사용합니다.')
      }
    } catch (error) {
      console.warn('Firebase 초기화 실패:', error)
      this.isFirebaseConfigured = false
    }
  }

  async addEntry(name: string, message: string): Promise<boolean> {
    await this.initPromise // Firebase 초기화 완료까지 대기
    
    if (!this.isFirebaseConfigured) {
      // Firebase가 설정되지 않은 경우 로컬 저장소 사용
      return this.addEntryLocal(name, message)
    }

    try {
      await addDoc(collection(this.db, 'guestbook'), {
        name,
        message,
        timestamp: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error('방명록 저장 실패:', error)
      // Firebase 실패 시 로컬 저장소로 폴백
      return this.addEntryLocal(name, message)
    }
  }

  async getEntries(): Promise<GuestbookEntry[]> {
    await this.initPromise // Firebase 초기화 완료까지 대기
    
    if (!this.isFirebaseConfigured) {
      return this.getEntriesLocal()
    }

    try {
      const q = query(collection(this.db, 'guestbook'), orderBy('timestamp', 'desc'))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as GuestbookEntry))
    } catch (error) {
      console.error('방명록 로딩 실패:', error)
      // Firebase 실패 시 로컬 저장소로 폴백
      return this.getEntriesLocal()
    }
  }

  private addEntryLocal(name: string, message: string): boolean {
    try {
      const entries = this.getEntriesLocal()
      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name,
        message,
        timestamp: new Date()
      }
      entries.unshift(newEntry)
      localStorage.setItem('wedding-guestbook', JSON.stringify(entries))
      return true
    } catch (error) {
      console.error('로컬 저장 실패:', error)
      return false
    }
  }

  private getEntriesLocal(): GuestbookEntry[] {
    try {
      const stored = localStorage.getItem('wedding-guestbook')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('로컬 데이터 로딩 실패:', error)
      return []
    }
  }
}

const guestbookManager = new GuestbookManager()

export function Guestbook(): string {
  // 컴포넌트가 마운트된 후 실행될 함수들
  setTimeout(() => {
    setupGuestbookHandlers()
    loadGuestbookEntries()
  }, 100)

  return `
    <div class="guestbook-section">
      <h3>방명록</h3>
      <p class="guestbook-note">
        소중한 마음을 담은 메시지를 남겨주세요<br>
        축하의 말씀 감사히 받겠습니다
      </p>
      
      <form class="guestbook-form" id="guestbook-form">
        <div class="form-group">
          <input 
            type="text" 
            id="guest-name" 
            placeholder="성함을 입력해주세요" 
            required
            maxlength="20"
          >
        </div>
        <div class="form-group">
          <textarea 
            id="guest-message" 
            placeholder="축하 메시지를 입력해주세요" 
            required
            maxlength="200"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="guestbook-submit-btn">
          💌 메시지 남기기
        </button>
      </form>
      
      <div class="guestbook-entries" id="guestbook-entries">
        <div class="loading-message">방명록을 불러오는 중...</div>
      </div>
    </div>
  `
}

function setupGuestbookHandlers() {
  const form = document.getElementById('guestbook-form') as HTMLFormElement
  if (!form) return

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const nameInput = document.getElementById('guest-name') as HTMLInputElement
    const messageInput = document.getElementById('guest-message') as HTMLTextAreaElement
    const submitBtn = form.querySelector('.guestbook-submit-btn') as HTMLButtonElement
    
    const name = nameInput.value.trim()
    const message = messageInput.value.trim()
    
    if (!name || !message) {
      window.showAlert({
        message: '성함과 메시지를 모두 입력해주세요',
        type: 'error'
      })
      return
    }
    
    // 버튼 비활성화
    submitBtn.disabled = true
    submitBtn.textContent = '전송 중...'
    
    try {
      const success = await guestbookManager.addEntry(name, message)
      
      if (success) {
        // 폼 초기화
        nameInput.value = ''
        messageInput.value = ''
        
        // 목록 새로고침
        await loadGuestbookEntries()
        
        window.showAlert({
          title: '등록 완료',
          message: '소중한 메시지가 성공적으로 등록되었습니다!',
          type: 'success'
        })
      } else {
        window.showAlert({
          message: '메시지 등록에 실패했습니다.\n다시 시도해주세요',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('방명록 등록 오류:', error)
      window.showAlert({
        message: '메시지 등록 중 오류가 발생했습니다',
        type: 'error'
      })
    } finally {
      // 버튼 활성화
      submitBtn.disabled = false
      submitBtn.textContent = '💌 메시지 남기기'
    }
  })
}

async function loadGuestbookEntries() {
  const entriesContainer = document.getElementById('guestbook-entries')
  if (!entriesContainer) return

  try {
    const entries = await guestbookManager.getEntries()
    
    if (entries.length === 0) {
      entriesContainer.innerHTML = '<div class="no-entries">아직 방명록이 비어있습니다. 첫 번째 메시지를 남겨주세요!</div>'
      return
    }

    const entriesHTML = entries.map(entry => {
      const date = entry.timestamp?.toDate ? 
        entry.timestamp.toDate().toLocaleDateString('ko-KR') : 
        new Date(entry.timestamp).toLocaleDateString('ko-KR')
      
      return `
        <div class="guestbook-entry">
          <div class="entry-header">
            <span class="entry-name">${escapeHtml(entry.name)}</span>
            <span class="entry-date">${date}</span>
          </div>
          <div class="entry-message">${escapeHtml(entry.message).replace(/\n/g, '<br>')}</div>
        </div>
      `
    }).join('')

    entriesContainer.innerHTML = entriesHTML
  } catch (error) {
    console.error('방명록 로딩 오류:', error)
    entriesContainer.innerHTML = '<div class="error-message">방명록을 불러오는 중 오류가 발생했습니다.</div>'
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
