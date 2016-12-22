import { BootScript } from '@mean-expert/boot-script';

import * as Mocha from 'mocha';
import * as fs    from 'fs';
import * as path  from 'path';

@BootScript()
class TestSuite {

    private mocha: Mocha;
    private root: string = path.join(__dirname, '..', '..', 'tests');
  
    constructor(app: any) {
      if (process.env.NODE_ENV !== 'testing') return;
      app.on('started', () => {
        this.setup();
        this.run();
      });
    }

    setup(): void {
      console.log('Setting up Mocha Environment.');
      this.mocha = new Mocha();
      fs.readdirSync(this.root)
        .filter((file: any)  => file.substr(-3) === '.ts')
        .forEach((file: any) => this.mocha.addFile(path.join(this.root, file)));
    }

    run(): void {
      console.log('Running Mocha Tests.');
      this.mocha.run((failures: any) => {
        console.log('Running Mocha Done');
        process.exit(failures);
      });
    }

}

module.exports = TestSuite;
