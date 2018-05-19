import { trigger, state, style, animate, transition, group } from '@angular/animations';

export const sideNavTrigger = trigger('sideNavTrigger', [
    state('inactive', style({
      width: 0,
    })),
    state('active', style({
      width: '250px',
    })),
    transition(':enter', [
      animate(400)
    ]),
    transition(':leave', [
      animate(400)
    ]),
  ]);
