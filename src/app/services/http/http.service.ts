import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

type GetOptions = Parameters<InstanceType<typeof HttpClient>['get']>[1];

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://66c9c0a459f4350f064d5742.mockapi.io/api/'

  constructor(private httpClient: HttpClient) { }

  get<T>(endpoint: string, options?: GetOptions) {
    return this.httpClient.get<T>(this.baseUrl + endpoint, { ...options })
  }
}
