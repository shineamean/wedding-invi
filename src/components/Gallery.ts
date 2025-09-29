import { galleryImages } from '../data/wedding-info'

export function Gallery(): string {
  const imageSlides = galleryImages.map((image, index) => {
    const aspectRatio = image.width / image.height
    const isLandscape = aspectRatio > 1
    
    return `
    <div class="gallery-slide ${isLandscape ? 'landscape' : 'portrait'}" 
         data-index="${index}">
      <img src="${image.src}" alt="${image.alt}" 
           decoding="async"
           fetchpriority="${index < 3 ? 'high' : 'auto'}"
           data-loading="false"
           data-loaded="true"
           onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'placeholder-img\\'>📷<br/>사진 준비중</div>'" />
    </div>
  `}).join('')
  
  return `
    <section id="gallery" class="gallery">
      <div class="container">
        <h2 class="section-title">Gallery</h2>
        <p class="gallery-subtitle">우리의 소중한 순간들</p>
        
        <div class="gallery-slider">
          <div class="gallery-track">
            ${imageSlides}
          </div>
          <div class="gallery-side-areas">
            <div class="gallery-side-area gallery-side-left" data-direction="prev" aria-label="이전 사진으로 이동"></div>
            <div class="gallery-side-area gallery-side-right" data-direction="next" aria-label="다음 사진으로 이동"></div>
          </div>
        </div>
        
        <div class="gallery-indicators">
          ${galleryImages.map((_, index) => `
            <button class="gallery-indicator ${index === 0 ? 'active' : ''}" 
                    data-index="${index}" 
                    aria-label="${index + 1}번째 사진으로 이동"></button>
          `).join('')}
        </div>
        
      </div>
    </section>
  `
}
