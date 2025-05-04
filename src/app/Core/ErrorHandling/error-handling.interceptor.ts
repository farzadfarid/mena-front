import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../Services/toast.service';



// @Injectable()
// export class ErrorHandlingInterceptor implements HttpInterceptor {

//   constructor(private messageService: ToastService) { }

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         let errorMessage = 'An unknown error occurred';
//         if (error.error instanceof ErrorEvent) {
//           // Client-side error
//           errorMessage = `Error: ${error.error.message}`;
//           this.messageService.showError(errorMessage);
//         } else {
//           // Server-side error
//           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//           this.messageService.showError(errorMessage);
//         }

//         return throwError(error);
//       })
//     );
//   }
// }