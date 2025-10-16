export class BackgroundMusic {
  private audio: HTMLAudioElement | null = null
  private isPlaying: boolean = false
  private button: HTMLElement | null = null
  private wasPlayingBeforeHidden: boolean = false

  constructor() {
    this.init()
  }

  private init() {
    // Create audio element
    this.audio = new Audio()
    // GitHub Pages와 로컬 개발 환경을 모두 지원하는 경로 설정
    const basePath = import.meta.env.BASE_URL || '/'
    this.audio.src = `${basePath}wedding-music.mp3` // 음원 파일 경로 (public 폴더에 위치)
    this.audio.loop = true
    this.audio.volume = 0.0 // 페이드인을 위해 0에서 시작
    
    // Add audio element to DOM (hidden)
    this.audio.style.display = 'none'
    document.body.appendChild(this.audio)

    // Create music control button
    this.createMusicButton()
    
    // Handle autoplay restrictions
    this.handleAutoplayRestrictions()
    
    // Handle page visibility changes (mobile background/foreground)
    this.handleVisibilityChange()
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
        this.audio.volume = 0.0 // 페이드인을 위해 0에서 시작
        await this.audio.play()
        this.isPlaying = true
        this.fadeIn() // 부드러운 페이드인 효과
      }
      this.updateButton()
    } catch (error) {
      console.log('음악 재생 실패:', error)
      // 자동재생이 차단된 경우 사용자에게 알림
      this.showAutoplayMessage()
    }
  }

  private handleAutoplayRestrictions() {
    // 페이지 로드 시 즉시 자동재생 시도
    this.tryAutoplay()
    
    // 사용자 상호작용 후 음악 재생 시도
    const startMusic = async () => {
      try {
        if (this.audio && !this.isPlaying) {
          await this.audio.play()
          this.isPlaying = true
          this.updateButton()
          this.fadeIn() // 부드러운 페이드인 효과
          
          // 이벤트 리스너 제거 (한 번만 실행)
          document.removeEventListener('click', startMusic)
          document.removeEventListener('touchstart', startMusic)
          document.removeEventListener('scroll', startMusic)
          document.removeEventListener('keydown', startMusic)
        }
      } catch (error) {
        console.log('자동 음악 재생 실패:', error)
      }
    }

    // 다양한 사용자 상호작용에서 음악 재생 시도
    document.addEventListener('click', startMusic, { once: true })
    document.addEventListener('touchstart', startMusic, { once: true })
    document.addEventListener('scroll', startMusic, { once: true })
    document.addEventListener('keydown', startMusic, { once: true })
  }

  private async tryAutoplay() {
    // 페이지 로드 직후 자동재생 시도
    try {
      if (this.audio) {
        await this.audio.play()
        this.isPlaying = true
        this.updateButton()
        this.fadeIn() // 부드러운 페이드인 효과
        console.log('자동재생 성공!')
      }
    } catch (error) {
      console.log('자동재생 차단됨 - 사용자 상호작용 대기 중...')
    }
  }

  private fadeIn() {
    // 2초에 걸쳐 볼륨을 0에서 0.3으로 페이드인
    if (!this.audio) return
    
    const targetVolume = 0.3
    const fadeTime = 2000 // 2초
    const steps = 50
    const volumeStep = targetVolume / steps
    const timeStep = fadeTime / steps
    
    let currentStep = 0
    
    const fadeInterval = setInterval(() => {
      if (currentStep >= steps || !this.audio || !this.isPlaying) {
        clearInterval(fadeInterval)
        if (this.audio && this.isPlaying) {
          this.audio.volume = targetVolume
        }
        return
      }
      
      this.audio.volume = volumeStep * currentStep
      currentStep++
    }, timeStep)
  }

  private handleVisibilityChange() {
    // Page Visibility API를 사용하여 페이지가 숨겨지거나 보여질 때 음악 제어
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // 페이지가 숨겨질 때 (모바일에서 다른 앱으로 전환하거나 브라우저를 최소화할 때)
        if (this.isPlaying) {
          this.wasPlayingBeforeHidden = true
          this.pauseMusic()
          console.log('페이지가 숨겨져서 음악을 일시정지합니다.')
        }
      } else {
        // 페이지가 다시 보여질 때
        if (this.wasPlayingBeforeHidden && !this.isPlaying) {
          this.resumeMusic()
          this.wasPlayingBeforeHidden = false
          console.log('페이지가 다시 보여져서 음악을 재개합니다.')
        }
      }
    })

    // 추가적으로 blur/focus 이벤트도 처리 (일부 브라우저에서 더 정확할 수 있음)
    window.addEventListener('blur', () => {
      if (this.isPlaying) {
        this.wasPlayingBeforeHidden = true
        this.pauseMusic()
        console.log('창이 포커스를 잃어서 음악을 일시정지합니다.')
      }
    })

    window.addEventListener('focus', () => {
      if (this.wasPlayingBeforeHidden && !this.isPlaying) {
        // 약간의 지연을 두어 사용자가 실제로 돌아왔는지 확인
        setTimeout(() => {
          if (!document.hidden && this.wasPlayingBeforeHidden) {
            this.resumeMusic()
            this.wasPlayingBeforeHidden = false
            console.log('창이 다시 포커스를 받아서 음악을 재개합니다.')
          }
        }, 100)
      }
    })
  }

  private pauseMusic() {
    if (this.audio && this.isPlaying) {
      this.audio.pause()
      this.isPlaying = false
      this.updateButton()
    }
  }

  private resumeMusic() {
    if (this.audio && !this.isPlaying) {
      this.audio.play().then(() => {
        this.isPlaying = true
        this.updateButton()
      }).catch(error => {
        console.log('음악 재개 실패:', error)
        this.wasPlayingBeforeHidden = false
      })
    }
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
    
    // 이벤트 리스너 정리
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    window.removeEventListener('blur', this.handleVisibilityChange)
    window.removeEventListener('focus', this.handleVisibilityChange)
  }
}

// 전역 배경음악 인스턴스
export const backgroundMusic = new BackgroundMusic()
