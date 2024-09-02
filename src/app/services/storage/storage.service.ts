import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  set(key: string, data: unknown) {
    try {
      const serializedData = JSON.stringify(data);
      sessionStorage.setItem(key, serializedData)
    } catch (e) {
      console.debug(`Error while saving data to store ${e}`)
    }

  }
}
