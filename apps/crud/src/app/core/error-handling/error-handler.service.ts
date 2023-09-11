import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);

  getErrorMessage(): Observable<string | null> {
    return this.errorMessageSubject.asObservable();
  }

  showError(errorMessage: string): void {
    this.errorMessageSubject.next(errorMessage);
  }
}
