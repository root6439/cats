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

export const slideInAnimation = trigger('routeAnimations', [
  transition('1 => 2', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate(`${animationTime} ${animationType}`, style({ left: '-100%' })),
      ]),
      query(':enter', [
        animate(`${animationTime} ${animationType}`, style({ left: '0%' })),
      ]),
    ]),
  ]),
  transition('2 => 1', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate(`${animationTime} ${animationType}`, style({ left: '100%' })),
      ]),
      query(':enter', [
        animate(`${animationTime} ${animationType}`, style({ left: '0%' })),
      ]),
    ]),
  ]),
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate(
          `${animationTime} ${animationType}`,
          style({ left: '100%', opacity: 0 })
        ),
      ]),
      query(':enter', [
        animate(`${animationTime} ${animationType}`, style({ left: '0%' })),
      ]),
      query('@*', animateChild()),
    ]),
  ]),
]);
