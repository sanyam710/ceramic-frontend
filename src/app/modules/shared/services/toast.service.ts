// toast.service.ts
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
// import { ToastComponent } from '../toast/toast.component';
import { BehaviorSubject, timer, take, asapScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{ message: string; alertClass: string } | null>(null);

  toast$ = this.toastSubject.asObservable();

  showToast(message: string, alertClass: string, duration: number = 3000): void {
    this.toastSubject.next({ message, alertClass });

    // Automatically hide the toast after the specified duration
    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        this.hideToast();
      });
  }

  hideToast(): void {
    this.toastSubject.next(null);
  }
}
