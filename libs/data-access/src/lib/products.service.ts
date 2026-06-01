import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DUMMYJSON_BASE_URL } from './api-base-url';
import { PaginatedProducts, Product, ProductQuery } from '@push-based/types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(DUMMYJSON_BASE_URL);

  getProducts(query?: ProductQuery): Observable<PaginatedProducts> {
    return this.http.get<PaginatedProducts>(`${this.baseUrl}/products`, {
      params: this.toParams(query),
    });
  }

  getProductsByCategory(
    slug: string,
    query?: ProductQuery,
  ): Observable<PaginatedProducts> {
    return this.http.get<PaginatedProducts>(
      `${this.baseUrl}/products/category/${encodeURIComponent(slug)}`,
      { params: this.toParams(query) },
    );
  }

  searchProducts(
    term: string,
    query?: ProductQuery,
  ): Observable<PaginatedProducts> {
    return this.http.get<PaginatedProducts>(`${this.baseUrl}/products/search`, {
      params: this.toParams(query).set('q', term),
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  private toParams(query?: ProductQuery): HttpParams {
    let params = new HttpParams();
    if (!query) {
      return params;
    }
    if (query.limit != null) {
      params = params.set('limit', query.limit);
    }
    if (query.skip != null) {
      params = params.set('skip', query.skip);
    }
    if (query.select?.length) {
      params = params.set('select', query.select.join(','));
    }
    if (query.sortBy) {
      params = params.set('sortBy', query.sortBy);
    }
    if (query.order) {
      params = params.set('order', query.order);
    }
    return params;
  }
}
