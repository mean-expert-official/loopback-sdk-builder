
import { Observable } from 'rxjs/Observable';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/observable/throw';
/**
 * Default error handler
 */

export class ErrorHandler {
  // ErrorObservable when rxjs version < rc.5
  // ErrorObservable<string> when rxjs version = rc.5
  // I'm leaving any for now to avoid breaking apps using both versions
  handleError(error) {
    return Observable.throw(error.json().error || 'Server error');
  }
}

