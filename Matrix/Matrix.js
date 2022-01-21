/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Matrix extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Ball3", "./Matrix/costumes/Ball3.svg", {
        x: 23.81109046936038,
        y: 23.850749969482422
      })
    ];

    this.sounds = [
      new Sound("Pad", "./Matrix/sounds/Pad.wav"),
      new Sound("Pad F", "./Matrix/sounds/Pad F.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.audioEffects.volume = 20;

    this.vars.cloneId = 300;
    this.vars.r = 200.0000000000017;
    this.vars.rtn = 0;
  }

  *whenGreenFlagClicked() {
    this.audioEffects.volume = 20;
    this.stage.vars.pattern = [];
    /* TODO: Implement music_setTempo */ null;
    /* TODO: Implement music_setInstrument */ null;
    this.visible = false;
    this.size = 20;
    this.goto(0, 0);
    this.stage.vars.playId = 0;
    this.vars.cloneId = 0;
    this.vars.r = 80;
    for (let i = 0; i < 3; i++) {
      for (let i = 0; i < 100; i++) {
        this.effects.color += 0.25;
        this.vars.cloneId += 1;
        this.vars.r += 0.4;
        this.createClone();
        yield;
      }
      this.vars.r += 0;
      yield;
    }
    yield* this.wait(1);
    while (!null) {
      yield* this.startSound(this.random(1, 2));
      this.stage.vars.playId = 300;
      while (!(this.stage.vars.playId < 1)) {
        this.stage.vars.playId += -1;
        yield* this.wait(0.13);
        yield;
      }
      yield* this.wait(0.01);
      this.stage.vars.playId = 0;
      yield* this.wait(1);
      yield* this.startSound(this.random(1, 2));
      yield* this.wait(2);
      this.stage.vars.n = 0;
      for (let i = 0; i < 300; i++) {
        this.stage.vars.n += 1;
        this.stage.vars.pattern.splice(
          this.stage.vars.n - 1,
          1,
          this.random(0, 1)
        );
        if (this.stage.vars.pattern[this.stage.vars.n - 1] == 1) {
          this.broadcast(2);
          /* TODO: Implement music_playNoteForBeats */ null;
        }
        yield;
      }
      yield* this.wait(2);
      yield;
    }
  }

  *startAsClone() {
    this.vars.rtn = 0;
    this.audioEffects.volume = 20;
    this.visible = true;
    /* TODO: Implement music_playNoteForBeats */ null;
    this.stage.vars.pattern.splice(this.vars.cloneId - 1, 0, this.random(0, 1));
    while (!null) {
      this.vars.rtn += 0.4;
      this.vars.r += 0;
      this.goto(
        Math.cos(this.scratchToRad(this.vars.cloneId * 3 + this.vars.rtn)) *
          this.vars.r,
        Math.sin(
          this.scratchToRad(
            this.vars.cloneId * (this.vars.rtn * 0.001) + this.vars.rtn
          )
        ) * this.vars.r
      );
      if (this.vars.cloneId == this.stage.vars.playId) {
        if (this.stage.vars.pattern[this.vars.cloneId - 1] == 1) {
          this.size = 175;
          this.effects.brightness = 100;
          this.broadcast("musica");
          /* TODO: Implement music_restForBeats */ null;
        } else {
          this.size = 50;
          this.effects.brightness = 100;
          /* TODO: Implement music_restForBeats */ null;
        }
      } else {
        if (this.stage.vars.pattern[this.vars.cloneId - 1] == 1) {
          this.size = 30;
          this.effects.brightness = 30;
        } else {
          this.size = 5;
          this.effects.brightness = -100;
        }
      }
      yield;
    }
  }
}
