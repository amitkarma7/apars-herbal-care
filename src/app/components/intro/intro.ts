import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Reveal } from '../../shared/reveal';

interface Principle {
  readonly title: string;
  readonly text: string;
}

@Component({
  selector: 'app-intro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  templateUrl: './intro.html',
  styleUrl: './intro.css',
})
export class Intro {
  protected readonly principles: readonly Principle[] = [
    {
      title: 'Handcrafted',
      text: 'Prepared by hand with traditional herbs, the way herbal oils have long been made at home.',
    },
    {
      title: 'Pure base oils',
      text: 'Pure coconut oil and cold-pressed sesame oil, enriched with castor oil and vitamin E.',
    },
    {
      title: 'Made with natural herbs',
      text: 'Bhringraj, amla, brahmi, hibiscus, curry leaves, fenugreek, neem and aloe vera in every bottle.',
    },
  ];
}
