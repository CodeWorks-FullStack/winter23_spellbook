import { appState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";
import { sandboxApi } from "./AxiosService.js"

class SandboxSpellsService {
  async updateSpell(spellId) {
    // NOTE we're using findIndex because we need the index AND the acutal object stored at that index
    const spellIndex = appState.mySpells.findIndex(s => s.id == spellId)
    // NOTE use the index to pull out the acutal spell with bracket notation
    const foundSpell = appState.mySpells[spellIndex]
    // NOTE                                                                  VVVV send the data to my api to be changed
    const res = await sandboxApi.put(`/joe_the_mighty/spells/${spellId}`, { prepared: !foundSpell.prepared })
    console.log('[edit spell]', res.data);
    // NOTE splice the old one out of my appstate and replace it with updated one from the api
    appState.mySpells.splice(spellIndex, 1, new Spell(res.data))
    appState.emit('mySpells')
  }
  async destroySpell(spellId) {
    const res = await sandboxApi.delete(`/joe_the_mighty/spells/${spellId}`)
    console.log('[delete spell]', res.data);
    // NOTE find the index of the spell matching the id we passed down here
    let spellIndex = appState.mySpells.findIndex(spell => spell.id == spellId)
    // NOTE splice him out of the appState
    appState.mySpells.splice(spellIndex, 1)
    // NOTE trigger evenet listener
    appState.emit('mySpells')
    appState.spell = null
  }
  setActiveSpell(spellId) {
    let foundSpell = appState.mySpells.find(spell => spell.id == spellId)
    // console.log(foundSpell);
    appState.spell = foundSpell
  }
  async getMySpells() {
    const res = await sandboxApi.get('joe_the_mighty/spells')
    console.log('[get my spells]', res.data);
    // NOTE res.data is an array, so we have to map over it and turn the pojos into our class model
    // @ts-ignore
    appState.mySpells = res.data.map(s => new Spell(s))
  }
  async createSpell() {
    const res = await sandboxApi.post('/joe_the_mighty/spells', appState.spell)
    console.log('[create spell]', res.data);
    // NOTE build out our class model with res.data
    let createdSpell = new Spell(res.data)
    // NOTE store it in our spells array so that our list updates
    appState.mySpells.push(createdSpell)
    // NOTE trigger event listener to redraw our list of spells
    appState.emit('mySpells')
    // NOTE set our active spell to the one that came back from the sandbox api so that our template redraws
    appState.spell = createdSpell
  }

}

export const sandboxSpellsService = new SandboxSpellsService()