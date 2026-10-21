import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import { NAV_LINKS } from '../../data/site-content';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '(document:keydown.escape)': 'close()',
    '(window:resize)': 'onResize()',
  },
})
export class Header {
  protected readonly brand = SITE_CONFIG.brand;
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);

  protected toggle(): void {
    this.menuOpen.update((open) => !open);
  }

  protected close(): void {
    this.menuOpen.set(false);
  }

  protected onResize(): void {
    if (this.menuOpen() && window.innerWidth > 900) {
      this.close();
    }
  }
}
