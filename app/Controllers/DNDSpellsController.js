import { appState } from "../AppState.js"
import { Spell } from "../Models/Spell.js"
import { dndSpellsService } from "../Services/DNDSpellsService.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawSpells() {
  let template = ''
  // NOTE dndApi sends us an array of partial data, use a static template to render the data on the page since we can't build out our class yet
  appState.dndSpells.forEach(s => template += Spell.DNDListTemplate(s))
  setHTML('dnd-spells', template)

}

function _drawSpell() {
  // NOTE check if there is a spell in the appState
  if (appState.spell) {
    // NOTE if there is a spell, draw the spell's template
    setHTML('spell', appState.spell.BigActiveJakeSpellTemplate)
  }
  else {
    // NOTE if there's not a spell, draw our placeholder
    _drawGandalf()
  }
}


function _drawGandalf() {
  setHTML('spell', Spell.DancingGandalf())
}

export class DNDSpellsController {
  constructor () {
    this.getSpells()
    // NOTE draw our placeholder on page load
    _drawGandalf()
    appState.on('dndSpells', _drawSpells)
    appState.on('spell', _drawSpell)
  }

  async getSpells() {
    try {
      await dndSpellsService.getSpells()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async getSpellByIndex(index) {
    try {
      await dndSpellsService.getSpellByIndex(index)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}