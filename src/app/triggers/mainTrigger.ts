import { trigger, state, style, animate, transition, group, useAnimation } from '@angular/animations';

export const mainTrigger = trigger('mainTrigger', [
    state('expanded', style({
      'padding-left': 0,
    })),
    state('collapsed', style({
      'padding-left': '250px',
    })),
    transition('expanded <=> collapsed', [
      group([
        animate(400),
        useAnimation(),
      ])
    ]),
  ]);
