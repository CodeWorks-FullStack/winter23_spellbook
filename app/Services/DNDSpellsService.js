import { appState } from "../AppState.js";
import { Spell } from "../Models/Spell.js";
import { dndApi } from "./AxiosService.js";

class DNDSpellsService {
  async getSpellByIndex(index) {
    const res = await dndApi.get(index)
    console.log('[get by index]', res.data);
    // NOTE res.data is a single object, do not map!
    appState.spell = new Spell(res.data)
    console.log('got the spell!', appState.spell)
  }

  async getSpells() {
    const res = await dndApi.get()
    console.log('[get dnd spells]', res.data)
    appState.dndSpells = res.data.results
  }

}

export const dndSpellsService = new DNDSpellsService()