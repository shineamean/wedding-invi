import { weddingInfo } from '../data/wedding-info'

export function Cover(): string {
  const { bride, groom, ceremony } = weddingInfo
  
  return `
    <section id="cover" class="cover">
      <div class="cover-content">
        <div class="couple-names">
          <h1 class="groom-name">${groom.name}</h1>
          <div class="heart">♥</div>
          <h1 class="bride-name">${bride.name}</h1>
        </div>
        
        <div class="couple-names-en">
          <span class="names-en">${groom.nameEn} & ${bride.nameEn}</span>
        </div>
        
        <div class="wedding-date">
          <p class="date">${ceremony.date}</p>
          <p class="time">${ceremony.time}</p>
          <p class="venue">${ceremony.venue}</p>
        </div>
        
        <div class="scroll-indicator">
          <span>아래로 스크롤해주세요</span>
          <div class="arrow">↓</div>
        </div>
      </div>
      
      <div class="cover-background">
        <div class="background-overlay"></div>
      </div>
    </section>
  `
}
