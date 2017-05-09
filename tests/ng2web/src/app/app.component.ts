import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from './shared/sdk/services';
import { RealTime } from './shared/sdk/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'LoopBack SDK Builder Test Application';

  constructor(
    private logger: LoggerService,
    private realTime: RealTime,
    private router: Router
  ) {
    this.logger.info('LoopBack SDK Builder - Test Application');
    this.realTime.onReady().subscribe(() => {
      console.log('NgApp has been connected');
    });
    this.realTime.onDisconnect().subscribe((error: string) => {
      console.log('Disconnected', error);
    });
    this.realTime.onUnAuthorized().subscribe((error: string) => {
      this.router.navigate(['/access-ngrx']);
    });
    this.realTime.onAuthenticated().subscribe((error: string) => {
      console.log('I am authorized');
    });
  }
}
