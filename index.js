import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Matrix from "./Matrix/Matrix.js";
import Glk from "./Glk/Glk.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Matrix: new Matrix({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 20,
    visible: false
  }),
  Glk: new Glk({
    x: -95.82497704226469,
    y: -5.3137456991987575,
    direction: -87.5315419699775,
    costumeNumber: 1,
    size: 50,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
