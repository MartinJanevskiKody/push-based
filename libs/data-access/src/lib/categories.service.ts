import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DUMMYJSON_BASE_URL } from './api-base-url';
import { Category } from '@push-based/types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(DUMMYJSON_BASE_URL);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/products/categories`);
  }

  getCategoryList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/category-list`);
  }
}
