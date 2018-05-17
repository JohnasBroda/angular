import { trigger, state, style, animate, transition, group, useAnimation, query } from '@angular/animations';

export const mainTrigger = trigger('mainTrigger', [
    state('expanded', style({
      'padding-left': 0,
    })),
    state('collapsed', style({
      'padding-left': '250px',
    })),
    transition('expanded => collapsed', [
      group([
        animate(400),
        query('@sideNavTrigger', [
          style({width: '250px'}),
          animate(400)
        ])
      ])
    ]),
    transition('collapsed => expanded', [
      group([
        animate(400),
        query('@sideNavTrigger', [
          style({width: 0}),
          animate(400)
        ])
      ])
    ]),
  ]);
