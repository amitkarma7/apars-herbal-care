import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Benefits } from './components/benefits/benefits';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { HowToUse } from './components/how-to-use/how-to-use';
import { Ingredients } from './components/ingredients/ingredients';
import { Intro } from './components/intro/intro';
import { ProductHighlight } from './components/product-highlight/product-highlight';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';
import { Seo } from './services/seo';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Header, Hero, Intro, Ingredients, Benefits, HowToUse, ProductHighlight, Contact, Footer, WhatsappButton],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(Seo).apply();
  }
}
