import { appState } from "../AppState.js"
import { sandboxSpellsService } from "../Services/SandboxSpellsService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function _drawMySpells() {
  let template = ''
  let mySpells = appState.mySpells
  mySpells.forEach(s => template += s.SandboxListTemplate)
  setHTML('my-spells', template)

  let preparedSpellCount = mySpells.filter(spell => spell.prepared).length
  setText('spell-count', preparedSpellCount)
}


export class SandboxSpellsController {
  constructor () {
    this.getMySpells()
    appState.on('mySpells', _drawMySpells)
  }

  async createSpell() {
    try {
      await sandboxSpellsService.createSpell()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async getMySpells() {
    try {
      await sandboxSpellsService.getMySpells()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async destroySpell(spellId) {
    try {
      if (await Pop.confirm('Are you sure you forgot how to cast this spell?')) {
        await sandboxSpellsService.destroySpell(spellId)
      }
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async updateSpell(spellId) {
    try {
      await sandboxSpellsService.updateSpell(spellId)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  // NOTE our spells are already stored in our appState as built out classes, no need to call to API
  setActiveSpell(spellId) {
    try {
      sandboxSpellsService.setActiveSpell(spellId)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}