/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Glk extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ball-e", "./Glk/costumes/ball-e.svg", {
        x: 27.6875,
        y: 10.375
      })
    ];

    this.sounds = [
      new Sound("Glk 01", "./Glk/sounds/Glk 01.wav"),
      new Sound("Glk 02", "./Glk/sounds/Glk 02.wav"),
      new Sound("Glk 03", "./Glk/sounds/Glk 03.wav"),
      new Sound("Glk 04", "./Glk/sounds/Glk 04.wav"),
      new Sound("Glk 05", "./Glk/sounds/Glk 05.wav"),
      new Sound("Glk 06", "./Glk/sounds/Glk 06.wav"),
      new Sound("Glk 07", "./Glk/sounds/Glk 07.wav"),
      new Sound("Glk 08", "./Glk/sounds/Glk 08.wav"),
      new Sound("Glk 09", "./Glk/sounds/Glk 09.wav"),
      new Sound("Glk 10", "./Glk/sounds/Glk 10.wav"),
      new Sound("Glk 11", "./Glk/sounds/Glk 11.wav"),
      new Sound("Glk 12", "./Glk/sounds/Glk 12.wav"),
      new Sound("Glk 13", "./Glk/sounds/Glk 13.wav")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "musica" },
        this.whenIReceiveMusica
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "musica" },
        this.whenIReceiveMusica2
      )
    ];

    this.audioEffects.volume = 40;

    this.vars.sound = "ON";
  }

  *whenIReceiveMusica() {
    if (this.vars.sound == "ON") {
      yield* this.startSound(this.random(6, 13));
    } else {
      null;
    }
  }

  *whenGreenFlagClicked() {
    this.audioEffects.volume = 40;
  }

  *whenIReceiveMusica2() {
    if (this.vars.sound == "OFF") {
      this.vars.sound = "ON";
    } else {
      this.vars.sound = "OFF";
    }
  }
}
