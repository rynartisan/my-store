import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private router: Router,
    @Inject(Injector) private readonly injector: Injector,
  ) {}

  private get toast() {
    return this.injector.get(ToastrService);
  }

  handleError(error: Error): void {
    console.error(error);
    this.toast.error(error.message); // This prints the whole stack trace, I have no idea why.
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/']);
  }
}
