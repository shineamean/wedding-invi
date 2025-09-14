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
  // PhotoSwipe gallery initialization will be added later
  console.log('Gallery initialized')
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
