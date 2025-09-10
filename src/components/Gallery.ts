import { galleryImages } from '../data/wedding-info'

export function Gallery(): string {
  const imageGrid = galleryImages.map((image, index) => `
    <div class="gallery-item" data-index="${index}">
      <img src="${image.src}" alt="${image.alt}" 
           loading="lazy" 
           decoding="async"
           fetchpriority="${index < 3 ? 'high' : 'low'}"
           onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'placeholder-img\\'>📷<br/>사진 준비중</div>'" />
    </div>
  `).join('')
  
  return `
    <section id="gallery" class="gallery">
      <div class="container">
        <h2 class="section-title">Gallery</h2>
        <p class="gallery-subtitle">우리의 소중한 순간들</p>
        
        <div class="gallery-grid">
          ${imageGrid}
        </div>
        
      </div>
    </section>
  `
}
