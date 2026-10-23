import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CAUTIONS, LABEL_DIRECTIONS_HINDI, USAGE_STEPS } from '../../data/site-content';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-how-to-use',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  templateUrl: './how-to-use.html',
  styleUrl: './how-to-use.css',
})
export class HowToUse {
  protected readonly steps = USAGE_STEPS;
  protected readonly hindi = LABEL_DIRECTIONS_HINDI;
  protected readonly cautions = CAUTIONS;
}
