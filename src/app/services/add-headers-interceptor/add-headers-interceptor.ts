import {inject} from "@angular/core";
import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {StorageService} from "../storage/storage.service";
import {StorageKeys} from "../storage/storage.types";

export const addHeadersInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = inject(StorageService).getItem(StorageKeys.Token);
  if (!token) {
    return next(req);
  }

  req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
  return next(req);
}
