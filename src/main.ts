import './styles/global.css'
import { WeddingApp } from './components/WeddingApp'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML = WeddingApp()
    
    // Initialize components after DOM is ready
    initializeGallery()
    initializeSmoothScroll()
  }
})

function initializeGallery() {
  // PhotoSwipe gallery initialization will be added later
  console.log('Gallery initialized')
}

function initializeSmoothScroll() {
  // Add smooth scroll behavior for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href') as string)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}
