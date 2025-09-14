import { Cover } from './Cover'
import { Letter } from './Letter'
import { Gallery } from './Gallery'
import { Location } from './Location'
import { Contact } from './Contact'
import { CongratulationModal } from './CongratulationModal.js'

export function WeddingApp(): string {
  return `
    <div class="wedding-app">
      ${Cover()}
      ${Letter()}
      ${Gallery()}
      ${Location()}
      ${Contact()}
      ${CongratulationModal()}
    </div>
  `
}
