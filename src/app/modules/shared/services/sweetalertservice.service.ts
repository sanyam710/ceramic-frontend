import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  async warning(title: string, text: string, confirmText: string ='Yes, delete it!'): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-info waves-effect waves-light',
        cancelButton: 'btn btn-danger w-xs ms-md-3',
      },
      confirmButtonText: confirmText,
      buttonsStyling: false,
      showCloseButton: true,
    });
  }
  status(title: string, text: string, type: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: type
    });
  }
}
