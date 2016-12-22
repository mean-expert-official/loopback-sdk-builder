import { BootScript } from '@mean-expert/boot-script';

@BootScript()
class Root {
    constructor(app: any) {
        var router = app.loopback.Router();
        router.get('/', app.loopback.status());
        app.use(router);
    }
}

module.exports = Root;
