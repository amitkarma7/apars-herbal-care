import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BotanicalIcon as BotanicalIconName } from '../../data/site-content';

/** Hand-drawn line illustrations for each ingredient. Decorative: names are always shown as text beside them. */
@Component({
  selector: 'app-botanical-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './botanical-icon.css',
  template: `
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      @switch (name()) {
        @case ('coconut') {
          <circle class="g" cx="32" cy="34" r="21" />
          <circle class="paper" cx="32" cy="34" r="14.5" />
          <path d="M18 24c4-5 9-7 14-7" />
          <circle class="dot" cx="28" cy="31" r="1.6" />
          <circle class="dot" cx="36" cy="31" r="1.6" />
          <circle class="dot" cx="32" cy="38" r="1.6" />
        }
        @case ('sesame') {
          <g class="g">
            <path d="M32 10c5 6 5 14 0 20c-5-6-5-14 0-20z" />
            <path d="M32 10c5 6 5 14 0 20c-5-6-5-14 0-20z" transform="rotate(-40 32 44) translate(-2 4)" />
            <path d="M32 10c5 6 5 14 0 20c-5-6-5-14 0-20z" transform="rotate(42 32 44) translate(2 4)" />
            <path d="M32 10c5 6 5 14 0 20c-5-6-5-14 0-20z" transform="translate(0 22)" />
          </g>
          <path d="M32 14v12M32 36v12" />
        }
        @case ('castor') {
          <path
            class="f"
            d="M32 9l5 16 15-8-8 15 12 8H40l-4 14-4-12-4 12-4-14H8l12-8-8-15 15 8z"
          />
          <path d="M32 11v31M32 40l-14-8M32 40l14-8M32 40l-10 10M32 40l10 10M32 42v16" />
        }
        @case ('bhringraj') {
          <g class="paper">
            @for (angle of petals; track angle) {
              <ellipse cx="32" cy="15" rx="2.8" ry="6.5" [attr.transform]="'rotate(' + angle + ' 32 23)'" />
            }
          </g>
          <circle class="g" cx="32" cy="23" r="4" />
          <path d="M32 30v28" />
          <path class="f" d="M32 46c-8 0-14-4-16-9c7-1 13 2 16 9z" />
          <path class="f" d="M32 40c8 0 13-4 15-9c-7-1-12 2-15 9z" />
        }
        @case ('amla') {
          <circle class="f" cx="25" cy="38" r="13" />
          <circle class="f" cx="41" cy="30" r="11" />
          <path d="M25 25c-4 8-4 18 0 26M25 25c4 8 4 18 0 26M41 19c-3 7-3 15 0 22M41 19c3 7 3 15 0 22" />
          <path d="M41 19c1-4 3-7 6-9M47 10c3 0 6 2 7 4c-3 1-6 0-7-4z" />
        }
        @case ('brahmi') {
          <path d="M32 58c-3-14 3-26 0-50" />
          <g class="f">
            <ellipse cx="23" cy="47" rx="7" ry="5" transform="rotate(-20 23 47)" />
            <ellipse cx="41" cy="44" rx="7" ry="5" transform="rotate(20 41 44)" />
            <ellipse cx="24" cy="31" rx="6" ry="4.5" transform="rotate(-20 24 31)" />
            <ellipse cx="40" cy="28" rx="6" ry="4.5" transform="rotate(20 40 28)" />
            <ellipse cx="26" cy="16" rx="5" ry="3.8" transform="rotate(-20 26 16)" />
            <ellipse cx="38" cy="13" rx="5" ry="3.8" transform="rotate(20 38 13)" />
          </g>
        }
        @case ('hibiscus') {
          <g class="r">
            @for (angle of fivePetals; track angle) {
              <path d="M32 31c-8-4-12-12-8-18c3-4 13-4 16 0c4 6 0 14-8 18z" [attr.transform]="'rotate(' + angle + ' 32 31)'" />
            }
          </g>
          <path d="M32 31l12-14" />
          <circle class="g" cx="44" cy="17" r="2" />
          <circle class="g" cx="41" cy="15" r="1.4" />
          <circle class="g" cx="46" cy="20" r="1.4" />
        }
        @case ('curry-leaves') {
          <path d="M12 54L52 12" />
          <g class="f">
            @for (pos of leafPairs; track pos) {
              <ellipse [attr.cx]="pos - 5" [attr.cy]="66 - pos - 5" rx="7" ry="3.4" [attr.transform]="'rotate(-80 ' + (pos - 5) + ' ' + (66 - pos - 5) + ')'" />
              <ellipse [attr.cx]="pos + 5" [attr.cy]="66 - pos + 5" rx="7" ry="3.4" [attr.transform]="'rotate(-10 ' + (pos + 5) + ' ' + (66 - pos + 5) + ')'" />
            }
          </g>
          <ellipse class="f" cx="53" cy="10" rx="6" ry="3" transform="rotate(-45 53 10)" />
        }
        @case ('fenugreek') {
          <g class="g">
            <rect x="18" y="30" width="9" height="6" rx="2.5" transform="rotate(-25 22 33)" />
            <rect x="29" y="34" width="9" height="6" rx="2.5" transform="rotate(15 33 37)" />
            <rect x="23" y="41" width="9" height="6" rx="2.5" transform="rotate(-5 27 44)" />
            <rect x="35" y="44" width="9" height="6" rx="2.5" transform="rotate(30 39 47)" />
            <rect x="15" y="44" width="9" height="6" rx="2.5" transform="rotate(20 19 47)" />
            <rect x="27" y="50" width="9" height="6" rx="2.5" transform="rotate(-20 31 53)" />
          </g>
          <path d="M40 30c2-8 6-14 12-18" />
          <path class="f" d="M46 18c-1-5 1-9 5-10c1 4-1 8-5 10zM50 15c4-2 8-1 10 2c-4 2-8 1-10-2z" />
        }
        @case ('aloe') {
          <g class="f">
            <path d="M32 56c-1-16 0-32 0-48c3 16 3 32 2 48z" />
            <path d="M30 56c-4-14-10-26-20-36c12 6 20 20 22 36z" />
            <path d="M34 56c4-14 10-26 20-36c-12 6-20 20-22 36z" />
            <path d="M28 57c-6-8-14-12-22-12c9-1 18 3 24 11z" />
            <path d="M36 57c6-8 14-12 22-12c-9-1-18 3-24 11z" />
          </g>
          <path d="M16 26l-2 1M20 32l-2 1M48 26l2 1M44 32l2 1" />
        }
        @case ('neem') {
          <path d="M32 58C32 40 30 24 32 6" />
          <g class="f">
            @for (y of neemRows; track y) {
              <path [attr.d]="'M32 ' + y + 'c-5-4-12-5-18-3c5 4 12 5 18 3z'" />
              <path [attr.d]="'M32 ' + (y - 4) + 'c5-4 12-5 18-3c-5 4-12 5-18 3z'" />
            }
            <path d="M32 6c-3 4-3 9 0 12c3-3 3-8 0-12z" />
          </g>
        }
        @case ('vitamin-e') {
          <path class="g" d="M32 8c9 13 16 22 16 32a16 16 0 0 1-32 0c0-10 7-19 16-32z" />
          <path d="M28 33h8M28 33v12h8M28 39h6" />
          <path d="M22 40c0 5 3 9 7 10" />
        }
      }
    </svg>
  `,
})
export class BotanicalIcon {
  readonly name = input.required<BotanicalIconName>();

  protected readonly petals = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
  protected readonly fivePetals = [0, 72, 144, 216, 288];
  protected readonly leafPairs = [22, 32, 42];
  protected readonly neemRows = [50, 40, 30, 20];
}
