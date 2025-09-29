// 커스텀 알림 모달 컴포넌트

export interface AlertConfig {
  title?: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

export class CustomAlert {
  private static instance: CustomAlert | null = null
  
  static getInstance(): CustomAlert {
    if (!CustomAlert.instance) {
      CustomAlert.instance = new CustomAlert()
    }
    return CustomAlert.instance
  }

  show(config: AlertConfig): void {
    const { title, message, type = 'info', duration = 3000 } = config
    
    // 기존 알림이 있다면 제거
    this.removeExisting()
    
    // 알림 엘리먼트 생성
    const alertElement = this.createAlertElement(title, message, type)
    
    // DOM에 추가
    document.body.appendChild(alertElement)
    
    // 애니메이션으로 표시
    requestAnimationFrame(() => {
      alertElement.classList.add('show')
    })
    
    // 자동 제거
    setTimeout(() => {
      this.removeAlert(alertElement)
    }, duration)
  }

  private createAlertElement(title: string | undefined, message: string, type: string): HTMLElement {
    const alertDiv = document.createElement('div')
    alertDiv.className = `custom-alert custom-alert-${type}`
    
    alertDiv.innerHTML = `
      <div class="custom-alert-content">
        ${title ? `<div class="custom-alert-title">${title}</div>` : ''}
        <div class="custom-alert-message">${message}</div>
        <button class="custom-alert-close" onclick="this.closest('.custom-alert').remove()">
          ×
        </button>
      </div>
    `
    
    return alertDiv
  }

  private removeExisting(): void {
    const existing = document.querySelector('.custom-alert')
    if (existing) {
      existing.remove()
    }
  }

  private removeAlert(alertElement: HTMLElement): void {
    alertElement.classList.add('hide')
    setTimeout(() => {
      if (alertElement.parentElement) {
        alertElement.remove()
      }
    }, 300)
  }
}

// 전역 함수로 쉽게 사용할 수 있게 설정
declare global {
  interface Window {
    showAlert: (config: AlertConfig) => void
  }
}

window.showAlert = (config: AlertConfig) => {
  CustomAlert.getInstance().show(config)
}
