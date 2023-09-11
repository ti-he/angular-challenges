import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading$ = new BehaviorSubject<boolean>(false);

  setIsLoading(value: boolean) {
    this.isLoading$.next(value);
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }
}
