import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CAUTIONS, LABEL_DIRECTIONS_HINDI, USAGE_STEPS } from '../../data/site-content';

@Component({
  selector: 'app-how-to-use',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './how-to-use.html',
  styleUrl: './how-to-use.css',
})
export class HowToUse {
  protected readonly steps = USAGE_STEPS;
  protected readonly hindi = LABEL_DIRECTIONS_HINDI;
  protected readonly cautions = CAUTIONS;
}
