/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/throw';
/**
 * Default error handler
 */
@Injectable()
export class ErrorHandler {
  // ErrorObservable when rxjs version < rc.5
  // ErrorObservable<string> when rxjs version = rc.5
  // I'm leaving any for now to avoid breaking apps using both versions
  public handleError(errorResponse: HttpErrorResponse): any {
    return Observable.throw(errorResponse.error.error || 'Server error');
  }
}
