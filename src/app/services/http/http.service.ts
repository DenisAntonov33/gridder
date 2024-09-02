import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

type GetOptions = Parameters<InstanceType<typeof HttpClient>['get']>[1];

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://66c9c0a459f4350f064d5742.mockapi.io/api/'

  constructor(private httpClient: HttpClient) { }

  get<Return>(endpoint: string, options?: GetOptions) {
    return this.httpClient.get<Return>(this.baseUrl + endpoint, { ...options })
  }

  post<Return>(endpoint: string, body: unknown) {
    return lastValueFrom(this.httpClient.post<Return>(this.baseUrl + endpoint, body))
  }
}
