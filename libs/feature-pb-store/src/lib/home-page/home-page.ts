import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

interface Category {
  readonly slug: string;
  readonly name: string;
  readonly icon: string;
}

@Component({
  selector: 'lib-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly query = signal('');
  protected readonly cartCount = signal(3);

  private readonly categories = signal<readonly Category[]>([
    { slug: 'electronics', name: 'Electronics', icon: '\u{1F50C}' },
    { slug: 'jewelery', name: 'Jewelery', icon: '\u{1F48D}' },
    { slug: "men's clothing", name: "Men's Clothing", icon: '\u{1F455}' },
    { slug: "women's clothing", name: "Women's Clothing", icon: '\u{1F457}' },
    { slug: 'home', name: 'Home & Living', icon: '\u{1F6CB}\u{FE0F}' },
    { slug: 'sports', name: 'Sports', icon: '\u{26BD}' },
    { slug: 'beauty', name: 'Beauty', icon: '\u{1F484}' },
    { slug: 'books', name: 'Books', icon: '\u{1F4DA}' },
  ]);

  protected readonly filteredCategories = computed(() => {
    const term = this.query().trim().toLowerCase();
    if (!term) {
      return this.categories();
    }
    return this.categories().filter((category) =>
      category.name.toLowerCase().includes(term),
    );
  });

  protected onSearch(value: string): void {
    this.query.set(value);
  }
}
