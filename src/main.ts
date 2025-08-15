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
