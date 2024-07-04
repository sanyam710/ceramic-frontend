import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  toast: { message: string, alertClass: string } | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
  }

  hideToast(): void {
    this.toastService.hideToast();
  }
}