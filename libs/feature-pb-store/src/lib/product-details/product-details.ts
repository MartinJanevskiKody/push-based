import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '@push-based/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'lib-product-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);

  protected readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: 0 },
  );

  protected readonly productResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.productsService.getProductById(params),
  });
}
