import './styles/global.css'
import { WeddingApp } from './components/WeddingApp'
import { initNaverMap } from './components/NaverMap'
import { galleryImages } from './data/wedding-info'
import './components/BackgroundMusic'

document.addEventListener('DOMContentLoaded', () => {
  // 인앱 브라우저 회피 체크 (페이지 로드 즉시 실행)
  avoidInAppBrowser()
  
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = WeddingApp()
    
    // Start preloading images immediately
    preloadGalleryImages()
    
    // Initialize components after DOM is ready
    initializeGallery()
    initializeSmoothScroll()
    initContactToggle()
    initCongratulationModal()
    initNaverMap()
    
    // Background music is automatically initialized via import
  }
})

// 전역 함수 타입 정의
declare global {
  interface Window {
    copyLink: () => void
  }
}

// 인앱 브라우저 감지 및 회피 함수들
function isKakaoTalkInAppBrowser(): boolean {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('kakaotalk')
}

function isLineInAppBrowser(): boolean {
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('line')
}

function avoidInAppBrowser(): void {
  const currentUrl = window.location.href
  
  // 이미 리다이렉트 파라미터가 있으면 무한 루프 방지
  if (currentUrl.includes('openExternalBrowser=1') || currentUrl.includes('redirected=1')) {
    console.log('이미 리다이렉트된 상태입니다.')
    return
  }
  
  // 카카오톡 인앱 브라우저 회피
  if (isKakaoTalkInAppBrowser()) {
    console.log('🚀 카카오톡 인앱 브라우저 감지됨. 외부 브라우저로 리다이렉트합니다.')
    
    try {
      // 카카오톡 외부 브라우저 열기 스킴 사용
      const redirectUrl = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'redirected=1'
      window.location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(redirectUrl)
    } catch (error) {
      console.warn('카카오톡 외부 브라우저 열기 실패:', error)
    }
    return
  }
  
  // 라인 인앱 브라우저 회피
  if (isLineInAppBrowser()) {
    console.log('📱 라인 인앱 브라우저 감지됨. 외부 브라우저로 리다이렉트합니다.')
    
    try {
      // 라인 외부 브라우저 열기 파라미터 추가
      const separator = currentUrl.includes('?') ? '&' : '?'
      window.location.href = currentUrl + separator + 'openExternalBrowser=1'
    } catch (error) {
      console.warn('라인 외부 브라우저 열기 실패:', error)
    }
    return
  }
  
  console.log('✅ 일반 브라우저에서 접속됨')
}

// 링크 복사 함수  
window.copyLink = function() {
  const url = window.location.href
  
  navigator.clipboard.writeText(url).then(() => {
    alert('청첩장 주소가 클립보드에 복사되었습니다! 📋')
  }).catch(() => {
    prompt('아래 주소를 복사해주세요:', url)
  })
}

function initializeGallery() {
  const galleryTrack = document.querySelector('.gallery-track') as HTMLElement
  const indicators = document.querySelectorAll('.gallery-indicator') as NodeListOf<HTMLButtonElement>
  
  if (!galleryTrack) {
    console.log('Gallery elements not found')
    return
  }

  let currentIndex = 0
  const totalSlides = indicators.length

  function updateGallery() {
    // Move the track
    const translateX = -currentIndex * 100
    galleryTrack.style.transform = `translateX(${translateX}%)`
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex)
    })
  }

  function goToSlide(index: number) {
    currentIndex = Math.max(0, Math.min(index, totalSlides - 1))
    updateGallery()
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1)
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1)
    }
  }

  // Event listeners
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToSlide(index))
  })

  // Side area navigation
  const sideAreas = document.querySelectorAll('.gallery-side-area') as NodeListOf<HTMLElement>
  sideAreas.forEach(area => {
    area.addEventListener('click', (e) => {
      e.preventDefault()
      const direction = area.getAttribute('data-direction')
      if (direction === 'prev') {
        prevSlide()
      } else if (direction === 'next') {
        nextSlide()
      }
    })
  })

  // Touch/swipe support
  let startX = 0
  let isDragging = false

  galleryTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX
    isDragging = true
  }, { passive: true })

  galleryTrack.addEventListener('touchmove', (e) => {
    if (!isDragging) return
    e.preventDefault()
  }, { passive: false })

  galleryTrack.addEventListener('touchend', (e) => {
    if (!isDragging) return
    isDragging = false
    
    const endX = e.changedTouches[0].clientX
    const deltaX = startX - endX
    const threshold = 50

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }, { passive: true })

  // Mouse drag support
  let mouseStartX = 0
  let isMouseDragging = false

  galleryTrack.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX
    isMouseDragging = true
    galleryTrack.style.cursor = 'grabbing'
    e.preventDefault()
  })

  document.addEventListener('mousemove', (e) => {
    if (!isMouseDragging) return
    e.preventDefault()
  })

  document.addEventListener('mouseup', (e) => {
    if (!isMouseDragging) return
    isMouseDragging = false
    galleryTrack.style.cursor = 'grab'
    
    const deltaX = mouseStartX - e.clientX
    const threshold = 50

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  })

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.activeElement?.closest('.gallery')) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        nextSlide()
      }
    }
  })

  // Auto-play (optional - can be enabled)
  // setInterval(() => {
  //   if (currentIndex === totalSlides - 1) {
  //     goToSlide(0)
  //   } else {
  //     nextSlide()
  //   }
  // }, 5000)

  // Initialize
  updateGallery()
  console.log('Gallery slider initialized')
}

function initializeSmoothScroll() {
  // Add smooth scroll behavior for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
      if (href) {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    })
  })
}

function initContactToggle() {
  // Contact toggle functionality
  const toggleButtons = document.querySelectorAll('.toggle-btn')
  const groomContacts = document.getElementById('groom-contacts')
  const brideContacts = document.getElementById('bride-contacts')
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const clickedButton = e.currentTarget as HTMLButtonElement
      const side = clickedButton.getAttribute('data-side')
      
      // Remove active class from all buttons
      toggleButtons.forEach(btn => btn.classList.remove('active'))
      
      // Add active class to clicked button
      clickedButton.classList.add('active')
      
      // Show/hide contact sections
      if (side === 'groom') {
        if (groomContacts) groomContacts.style.display = 'block'
        if (brideContacts) brideContacts.style.display = 'none'
      } else if (side === 'bride') {
        if (groomContacts) groomContacts.style.display = 'none'
        if (brideContacts) brideContacts.style.display = 'block'
      }
    })
  })
}

function initCongratulationModal() {
  // Modal elements
  const modal = document.getElementById('congratulation-modal')
  const openBtn = document.getElementById('congratulation-btn')
  const closeBtn = document.getElementById('modal-close')
  const overlay = document.getElementById('modal-overlay')
  const modalToggleButtons = document.querySelectorAll('.modal-toggle-btn')
  const modalGroomContacts = document.getElementById('modal-groom-contacts')
  const modalBrideContacts = document.getElementById('modal-bride-contacts')
  
  // Open modal
  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active')
      document.body.style.overflow = 'hidden'
    })
  }
  
  // Close modal functions
  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active')
      document.body.style.overflow = 'auto'
    }
  }
  
  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal)
  }
  
  // Close modal on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeModal)
  }
  
  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal()
    }
  })
  
  // Modal toggle functionality
  modalToggleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const clickedButton = e.currentTarget as HTMLButtonElement
      const side = clickedButton.getAttribute('data-side')
      
      // Remove active class from all modal toggle buttons
      modalToggleButtons.forEach(btn => btn.classList.remove('active'))
      
      // Add active class to clicked button
      clickedButton.classList.add('active')
      
      // Show/hide modal contact sections
      if (side === 'groom') {
        if (modalGroomContacts) modalGroomContacts.style.display = 'block'
        if (modalBrideContacts) modalBrideContacts.style.display = 'none'
      } else if (side === 'bride') {
        if (modalGroomContacts) modalGroomContacts.style.display = 'none'
        if (modalBrideContacts) modalBrideContacts.style.display = 'block'
      }
    })
  })
}

// Preload gallery images for better performance
function preloadGalleryImages() {
  console.log('Starting to preload gallery images...')
  
  // Load first few images immediately (high priority)
  const priorityImages = galleryImages.slice(0, 3)
  const remainingImages = galleryImages.slice(3)
  
  // Function to load a batch of images
  const loadImageBatch = (images: typeof galleryImages, startIndex: number, isPriority: boolean = false) => {
    return images.map((imageInfo, batchIndex) => {
      const actualIndex = startIndex + batchIndex
      return new Promise<void>((resolve) => {
        const img = new Image()
        
        img.onload = () => {
          console.log(`✅ ${isPriority ? '[HIGH]' : '[NORMAL]'} Loaded image ${actualIndex + 1}/${galleryImages.length}: ${imageInfo.src}`)
          resolve()
        }
        
        img.onerror = () => {
          console.warn(`❌ Failed to load image ${actualIndex + 1}/${galleryImages.length}: ${imageInfo.src}`)
          resolve() // Still resolve to not block other images
        }
        
        // Set image source to start loading
        img.src = imageInfo.src
        
        // Set size hints for better memory usage
        if (imageInfo.width && imageInfo.height) {
          img.width = imageInfo.width
          img.height = imageInfo.height
        }
      })
    })
  }
  
  // Load priority images first
  const priorityPromises = loadImageBatch(priorityImages, 0, true)
  
  // Load priority images immediately
  Promise.allSettled(priorityPromises).then((priorityResults) => {
    const prioritySuccessful = priorityResults.filter(result => result.status === 'fulfilled').length
    console.log(`🚀 Priority images loaded: ${prioritySuccessful}/${priorityImages.length}`)
    
    // Dispatch event for priority images loaded
    const priorityEvent = new CustomEvent('priorityImagesLoaded', {
      detail: { successful: prioritySuccessful, total: priorityImages.length }
    })
    document.dispatchEvent(priorityEvent)
  })
  
  // Load remaining images with a slight delay to not block priority images
  setTimeout(() => {
    const remainingPromises = loadImageBatch(remainingImages, 3, false)
    
    Promise.allSettled(remainingPromises).then((remainingResults) => {
      const remainingSuccessful = remainingResults.filter(result => result.status === 'fulfilled').length
      console.log(`📷 Remaining images loaded: ${remainingSuccessful}/${remainingImages.length}`)
      
      // Calculate total results
      const totalSuccessful = priorityImages.length + remainingSuccessful // Assuming priority images loaded successfully
      const totalFailed = galleryImages.length - totalSuccessful
      
      console.log(`🖼️ All image preloading completed: ${totalSuccessful} successful, ${totalFailed} failed`)
      
      // Dispatch event for all images loaded
      const allEvent = new CustomEvent('galleryImagesPreloaded', {
        detail: { successful: totalSuccessful, failed: totalFailed, total: galleryImages.length }
      })
      document.dispatchEvent(allEvent)
    })
  }, 100) // Small delay to ensure priority images get bandwidth first
}
