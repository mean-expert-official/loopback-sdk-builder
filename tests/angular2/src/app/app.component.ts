import { Component } from '@angular/core';
import { LoggerService } from './shared/sdk/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoopBack SDK Builder Test Application';

  constructor(private logger: LoggerService) {
    this.logger.info('LoopBack SDK Builder - Test Application');
  }
}
