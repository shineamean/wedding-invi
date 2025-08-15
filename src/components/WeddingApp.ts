import { Cover } from './Cover'
import { Letter } from './Letter'
import { Gallery } from './Gallery'
import { Location } from './Location'
import { Contact } from './Contact'

export function WeddingApp(): string {
  return `
    <div class="wedding-app">
      ${Cover()}
      ${Letter()}
      ${Gallery()}
      ${Location()}
      ${Contact()}
    </div>
  `
}
