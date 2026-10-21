import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BENEFITS } from '../../data/site-content';

@Component({
  selector: 'app-benefits',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits {
  protected readonly benefits = BENEFITS;
}
