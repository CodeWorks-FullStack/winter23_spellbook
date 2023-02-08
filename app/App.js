import { DNDSpellsController } from "./Controllers/DNDSpellsController.js";
import { SandboxSpellsController } from "./Controllers/SandboxSpellsController.js";
import { ValuesController } from "./Controllers/ValuesController.js";

class App {
  dndSpellsController = new DNDSpellsController()
  sandboxSpellsController = new SandboxSpellsController()
}

window["app"] = new App();
