import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }
  showSuccess(message: string) {
    this.toastr.success(message, 'Success', {
      enableHtml: true, // Enable HTML content in toastr
      closeButton: true, // Show close button
      timeOut: 10000, // Set timeout for auto close (optional)
      positionClass: 'toast-top-right', // Set position (optional)});
      progressBar: true,
      disableTimeOut: false, // Keep this false if you want auto-close
      tapToDismiss: false, // Disable hiding on click
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Error', {
      enableHtml: true, // Enable HTML content in toastr
      closeButton: true, // Show close button
      timeOut: 5000, // Set timeout for auto close (optional)
      positionClass: 'toast-top-right', // Set position (optional)});
      progressBar: true,
      disableTimeOut: false, // Keep this false if you want auto-close
      tapToDismiss: false, // Disable hiding on click
    })
  }

  showInfo(message: string) {
    this.toastr.info(message, 'Info', {
      enableHtml: true, // Enable HTML content in toastr
      closeButton: true, // Show close button
      timeOut: 5000, // Set timeout for auto close (optional)
      positionClass: 'toast-top-right', // Set position (optional)});
      progressBar: true,
      disableTimeOut: false, // Keep this false if you want auto-close
      tapToDismiss: false, // Disable hiding on click
    });
  }

  showWarning(message: string) {
    this.toastr.warning(message, 'Warning', {
      enableHtml: true, // Enable HTML content in toastr
      closeButton: true, // Show close button
      timeOut: 5000, // Set timeout for auto close (optional)
      positionClass: 'toast-top-right',// Set position (optional)});
      progressBar: true,
      disableTimeOut: false, // Keep this false if you want auto-close
      tapToDismiss: false, // Disable hiding on click
    });
  }
}
