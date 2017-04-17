import { BootScript } from '@mean-expert/boot-script';
import * as net from 'net';
declare var process: any;
@BootScript()
class NG2Finder {

    constructor(app: any) {
      if (process.NODE_ENV === 'ci') {
        console.log('Waiting for port 9876 to be taken');
        let testing: boolean  = false;
        let interval: any = setInterval(() => {
          this.isPortTaken(9876, (err: Error, taken: boolean) => {
            if (!testing && taken) {
              console.log('Port 9876 has been taken');
              testing = true;
            }
            if (testing && !taken) {
              console.log('Port 9876 has been released');
              process.exit();
            }
          })
        }, 1000);
      }
    }

    isPortTaken(port: number, next: Function) {
      let tester = net.createServer()
      .once('error', (err: any) => {
        if (err.code != 'EADDRINUSE') return next(err)
        next(null, true)
      })
      .once('listening', function() {
        tester.once('close', function() { next(null, false) })
        .close()
      })
      .listen(port)
    }
}

module.exports = NG2Finder;
