import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

type GetOptions = Parameters<InstanceType<typeof HttpClient>['get']>[1];

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://66c9c0a459f4350f064d5742.mockapi.io/api/'

  constructor(private httpClient: HttpClient) {
  }

  get<Return>(endpoint: string, options?: GetOptions) {
    return lastValueFrom<Return>(this.httpClient.get<Return>(this.baseUrl + endpoint, {...options}));
  }

  post<Return>(endpoint: string, body: unknown) {
    return lastValueFrom<Return>(this.httpClient.post<Return>(this.baseUrl + endpoint, body));
  }

  put<Return>(endpoint: string, body: unknown) {
    return lastValueFrom<Return>(this.httpClient.put<Return>(this.baseUrl + endpoint, body));
  }

  delete<Return>(endpoint: string) {
    return lastValueFrom<Return>(this.httpClient.delete<Return>(this.baseUrl + endpoint));
  }
}
