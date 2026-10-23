import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INGREDIENTS, KEY_HERBS } from '../../data/site-content';
import { BotanicalIcon } from '../botanical-icon/botanical-icon';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-ingredients',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, BotanicalIcon],
  templateUrl: './ingredients.html',
  styleUrl: './ingredients.css',
})
export class Ingredients {
  protected readonly keyHerbs = KEY_HERBS;
  protected readonly ingredients = INGREDIENTS;
}
