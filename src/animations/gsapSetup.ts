import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function initGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  });
}

export { gsap, ScrollTrigger };
