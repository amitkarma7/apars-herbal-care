import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';
import { NAV_LINKS } from '../../data/site-content';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly brand = SITE_CONFIG.brand;
  protected readonly contact = SITE_CONFIG.contact;
  protected readonly developer = SITE_CONFIG.developer;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
