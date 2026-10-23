import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BENEFITS } from '../../data/site-content';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-benefits',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits {
  protected readonly benefits = BENEFITS;
}
