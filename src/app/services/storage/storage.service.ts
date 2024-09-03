import {Injectable} from '@angular/core';
import {StorageKeys} from "./storage.types";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  getItem<Return>(key: StorageKeys): Return | undefined {
    try {
      const serializedData: string | null = sessionStorage.getItem(key);

      if (!serializedData) return undefined;

      return JSON.parse(serializedData);
    } catch (e) {
      console.debug('Error while retrieving data from storage >>', e)
      return undefined;
    }
  }

  setItem(key: StorageKeys, data: unknown) {
    try {
      const serializedData = JSON.stringify(data);
      sessionStorage.setItem(key, serializedData)
    } catch (e) {
      console.debug(`Error while saving data to store ${e}`)
    }
  }

  removeItem(key: StorageKeys): void {
    sessionStorage.removeItem(key);
  }
}
