export class Spell {
  constructor (data) {
    this.id = data.id || null
    this.name = data.name
    this.description = data.description || data.desc.join('<br><br>')
    // NOTE formatting data can be tricky
    if (data.damage) {
      this.damage = typeof (data.damage) == 'string' ? data.damage : data.damage.damage_type.name
    }
    else {
      this.damage = 'N/A'
    }
    this.range = data.range
    this.components = data.components
    this.material = data.material
    this.ritual = data.ritual
    this.duration = data.duration
    this.concentration = data.concentration
    this.level = data.level
    this.prepared = data.prepared || false
  }

  get BigActiveJakeSpellTemplate() {
    return `
    <div class="col-8 m-auto p-4 spell-card rounded elevation-1 border border-dark border-2">
      <div class="d-flex justify-content-between">
        <h1>${this.name}</h1>
        <h1>
          ${this.ComputeButton}
        </h1>
      </div>
      <div class="d-flex justify-content-between">
        <h2>Damage Type: ${this.damage + ' 🐕'}</h2>
        <h2>Level: ${this.level}</h2>
      </div>
      <div class="d-flex justify-content-between">
        <h3>Range: ${this.range}</h3>
        <h3>Duration: ${this.duration}</h3>
      </div>
      <p class="mt-3 p-5 border border-danger border-5 rounded">
        ${this.description}
      </p>
    </div>
    `
  }

  get ComputeButton() {
    if (this.id) {
      return `
      <button onclick="app.sandboxSpellsController.destroySpell('${this.id}')" class="btn btn-outline-danger">Delete Spell</button>
      `
    }
    else {
      return `
      <button onclick="app.sandboxSpellsController.createSpell()" class="btn btn-outline-success">Save Spell</button>
      `
    }
  }

  get SandboxListTemplate() {
    return `
    <div class="col-12 text-center">
      <input ${this.prepared ? 'checked' : ''} onchange="app.sandboxSpellsController.updateSpell('${this.id}')" class="form-check-input fs-2" type="checkbox" value="" id="flexCheckDefault">
      
      <button onclick="app.sandboxSpellsController.setActiveSpell('${this.id}')" class="btn btn-outline-success mb-3 w-75 fw-bold">${this.name}</button>
    </div>
    `
  }

  static DNDListTemplate(spell) {
    return ` <div class="col-12 text-center">
    <button onclick="app.dndSpellsController.getSpellByIndex('${spell.index}')" class="btn mb-3 btn-outline-danger w-100 fw-bold">${spell.name}</button>
    </div>`
  }

  static DancingGandalf() {
    // NOTE placeholder
    return `
    <div class="col-8 m-auto">
      <img src="https://media.tenor.com/Ea0wZF4ms4wAAAAM/wizard-hader.gif" alt="gandalf" class="img-fluid gandalf">
    </div>
    `
  }
}