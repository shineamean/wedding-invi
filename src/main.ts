import './styles/global.css'
import { WeddingApp } from './components/WeddingApp'
import { initNaverMap } from './components/NaverMap'
import './components/BackgroundMusic'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = WeddingApp()
    
    // Initialize components after DOM is ready
    initializeGallery()
    initializeSmoothScroll()
    initContactToggle()
    initCongratulationModal()
    initNaverMap()
    
    // Background music is automatically initialized via import
  }
})

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
