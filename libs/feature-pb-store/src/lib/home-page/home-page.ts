import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '@push-based/data-access';

const CATEGORY_ICONS: Record<string, string> = {
  beauty: '\u{1F485}',
  fragrances: '\u{1F9F4}',
  furniture: '\u{1F6CB}\u{FE0F}',
  groceries: '\u{1F6D2}',
  'home-decoration': '\u{1F3E1}',
  'kitchen-accessories': '\u{1F373}',
  laptops: '\u{1F4BB}',
  'mens-shirts': '\u{1F455}',
  'mens-shoes': '\u{1F45E}',
  'mens-watches': '\u{231A}',
  'mobile-accessories': '\u{1F50C}',
  motorcycle: '\u{1F3CD}\u{FE0F}',
  'skin-care': '\u{1F9F4}',
  smartphones: '\u{1F4F1}',
  'sports-accessories': '\u{26BD}',
  sunglasses: '\u{1F576}\u{FE0F}',
  tablets: '\u{1F4DF}',
  tops: '\u{1F457}',
  vehicle: '\u{1F697}',
  'womens-bags': '\u{1F45C}',
  'womens-dresses': '\u{1F45A}',
  'womens-jewellery': '\u{1F48D}',
  'womens-shoes': '\u{1F460}',
  'womens-watches': '\u{231A}',
};

@Component({
  selector: 'lib-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly categoriesService = inject(CategoriesService);

  protected readonly query = signal('');
  protected readonly cartCount = signal(3);

  protected readonly categoriesResource = rxResource({
    stream: () => this.categoriesService.getCategories(),
    defaultValue: [],
  });

  protected readonly filteredCategories = computed(() => {
    const term = this.query().trim().toLowerCase();
    const categories = this.categoriesResource.value();
    if (!term) {
      return categories;
    }
    return categories.filter((category) =>
      category.name.toLowerCase().includes(term),
    );
  });

  protected onSearch(value: string): void {
    this.query.set(value);
  }

  protected iconFor(slug: string): string {
    return CATEGORY_ICONS[slug] ?? '\u{1F6CD}\u{FE0F}';
  }
}
