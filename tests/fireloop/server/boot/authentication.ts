import { BootScript } from '@mean-expert/boot-script';

@BootScript()
class Authentication {
    constructor(app: any) {
        app.enableAuth();
    }
}

module.exports = Authentication;