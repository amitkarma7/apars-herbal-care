import { DestroyRef, Directive, ElementRef, afterNextRender, inject, signal } from '@angular/core';

/**
 * Fades an element up when it first scrolls into view.
 * Applies automatically to any element with the `reveal` class in a component that imports it.
 * Set `--i` on siblings (for example `[style.--i]="$index"`) to stagger them.
 * Elements are only hidden before reveal when <html> has the `anim` class, which index.html adds
 * when the browser supports IntersectionObserver and the visitor has not asked for reduced motion.
 */
@Directive({
  selector: '.reveal',
  host: { '[class.in]': 'visible()' },
})
export class Reveal {
  protected readonly visible = signal(false);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
