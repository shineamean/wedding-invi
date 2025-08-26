export class BackgroundMusic {
  private audio: HTMLAudioElement | null = null
  private isPlaying: boolean = false
  private button: HTMLElement | null = null

  constructor() {
    this.init()
  }

  private init() {
    // Create audio element
    this.audio = new Audio()
    this.audio.src = '/wedding-music.mp3' // 음원 파일 경로 (public 폴더에 위치)
    this.audio.loop = true
    this.audio.volume = 0.3 // 30% 볼륨으로 설정
    
    // Add audio element to DOM (hidden)
    this.audio.style.display = 'none'
    document.body.appendChild(this.audio)

    // Create music control button
    this.createMusicButton()
    
    // Handle autoplay restrictions
    this.handleAutoplayRestrictions()
  }

  private createMusicButton() {
    const button = document.createElement('div')
    button.className = 'music-control'
    button.innerHTML = this.getMusicButtonHTML()
    
    // Position the button
    button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid #d4af37;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 20px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    `

    button.addEventListener('click', () => this.toggleMusic())
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)'
      button.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)'
    })
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)'
      button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
    })

    document.body.appendChild(button)
    this.button = button
  }

  private getMusicButtonHTML(): string {
    return this.isPlaying ? '🔊' : '🔇'
  }

  private updateButton() {
    if (this.button) {
      this.button.innerHTML = this.getMusicButtonHTML()
    }
  }

  private async toggleMusic() {
    if (!this.audio) return

    try {
      if (this.isPlaying) {
        this.audio.pause()
        this.isPlaying = false
      } else {
        await this.audio.play()
        this.isPlaying = true
      }
      this.updateButton()
    } catch (error) {
      console.log('음악 재생 실패:', error)
      // 자동재생이 차단된 경우 사용자에게 알림
      this.showAutoplayMessage()
    }
  }

  private handleAutoplayRestrictions() {
    // 사용자 상호작용 후 음악 재생 시도
    const startMusic = async () => {
      try {
        if (this.audio && !this.isPlaying) {
          await this.audio.play()
          this.isPlaying = true
          this.updateButton()
          
          // 이벤트 리스너 제거 (한 번만 실행)
          document.removeEventListener('click', startMusic)
          document.removeEventListener('touchstart', startMusic)
        }
      } catch (error) {
        console.log('자동 음악 재생 실패:', error)
      }
    }

    // 첫 번째 클릭/터치 시 음악 재생 시도
    document.addEventListener('click', startMusic, { once: true })
    document.addEventListener('touchstart', startMusic, { once: true })
  }

  private showAutoplayMessage() {
    const message = document.createElement('div')
    message.className = 'autoplay-message'
    message.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        text-align: center;
        max-width: 300px;
      ">
        <h3 style="margin: 0 0 10px 0; color: #333;">🎵 배경음악</h3>
        <p style="margin: 0 0 15px 0; color: #666; line-height: 1.4;">
          브라우저 정책상 자동 재생이 제한됩니다.<br>
          우측 상단 음악 버튼을 클릭해주세요.
        </p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: #d4af37;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
        ">확인</button>
      </div>
    `
    
    document.body.appendChild(message)
    
    // 5초 후 자동 제거
    setTimeout(() => {
      if (message.parentElement) {
        message.remove()
      }
    }, 5000)
  }

  // 공개 메서드들
  public play() {
    if (this.audio && !this.isPlaying) {
      this.toggleMusic()
    }
  }

  public pause() {
    if (this.audio && this.isPlaying) {
      this.toggleMusic()
    }
  }

  public setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume))
    }
  }

  public destroy() {
    if (this.audio) {
      this.audio.pause()
      this.audio.remove()
    }
    if (this.button) {
      this.button.remove()
    }
  }
}

// 전역 배경음악 인스턴스
export const backgroundMusic = new BackgroundMusic()
