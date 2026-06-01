import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '@push-based/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'lib-products-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage {
  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);

  protected readonly category = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('category') ?? '')),
    { initialValue: '' },
  );

  protected readonly query = signal('');

  protected readonly productsResource = rxResource({
    params: () => ({ category: this.category(), term: this.query().trim() }),
    stream: ({ params }) => {
      if (params.term) {
        return this.productsService.searchProducts(params.term);
      }
      if (params.category) {
        return this.productsService.getProductsByCategory(params.category);
      }
      return this.productsService.getProducts();
    },
    defaultValue: { products: [], total: 0, skip: 0, limit: 0 },
  });

  protected onSearch(value: string): void {
    this.query.set(value);
  }
}
