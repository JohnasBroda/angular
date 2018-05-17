import { trigger, state, style, animate, transition, group, query, } from '@angular/animations';

export const sideNavToggle = trigger('sideNavToggle', [
    transition('hide => show', [
        group([
            query('.sidenav', [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 })),
            ]),
            query('.main', [
                style({ width: '100%' }),
                animate(500, style({ width: 'calc(100% - 250px)' })),
            ]),
        ])
    ]),
    transition('active => inactive', [
        group([
            query('.sidenav', [
                style({ width: '250px' }),
                animate(500, style({ width: 0 })),
            ]),
            query('.main', [
                style({ width: 'calc(100% - 250px)' }),
                animate(500, style({ width: '100%' })),
            ]),
        ])
    ]),
]);
