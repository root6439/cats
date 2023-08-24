import {
  trigger,
  transition,
  style,
  query,
  animateChild,
  group,
  animate,
} from '@angular/animations';

const animationTime = '500ms';
const animationType = 'ease-out';
const queryOptions = {
  optional: true,
};

export const slideInAnimation = trigger('routeAnimations', [
  transition('1 => 2', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      queryOptions
    ),
    query(':enter', [style({ left: '100%' })], queryOptions),
    query(':leave', animateChild(), queryOptions),
    group([
      query(
        ':leave',
        [
          animate(
            `${animationTime} ${animationType}`,
            style({ left: '-100%' })
          ),
        ],
        queryOptions
      ),
      query(
        ':enter',
        [animate(`${animationTime} ${animationType}`, style({ left: '0%' }))],
        queryOptions
      ),
    ]),
  ]),
  transition('2 => 1', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      queryOptions
    ),
    query(':enter', [style({ left: '-100%' })], queryOptions),
    query(':leave', animateChild(), queryOptions),
    group([
      query(
        ':leave',
        [animate(`${animationTime} ${animationType}`, style({ left: '100%' }))],
        queryOptions
      ),
      query(
        ':enter',
        [animate(`${animationTime} ${animationType}`, style({ left: '0%' }))],
        queryOptions
      ),
    ]),
  ]),
]);
