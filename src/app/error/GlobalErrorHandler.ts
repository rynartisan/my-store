import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error: Error) {
    console.error(`Caught an error with message -> ${error.message}`);
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/']);
  }
}
