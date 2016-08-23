![LoopBack SDK Builder](https://storage.googleapis.com/mean-expert-images/sdk-builder.jpg)

LoopBack SDK Builder
==================

The [@mean-expert/loopback-sdk-builder](https://www.npmjs.com/package/@mean-expert/loopback-sdk-builder) is a community driven module forked from the official `loopback-sdk-angular` and refactored to support [Angular 2](http://angular.io).

The [LoopBack SDK Builder](https://www.npmjs.com/package/@mean-expert/loopback-sdk-builder) will explore your [LoopBack Application](http://loopback.io) and will automatically build everything you need to start writing your [Angular 2 Applications](http://angular.io) right away. From Interfaces and Models to API Services and Real-time communications.

# Installation

````sh
$ cd to/loopback/project
$ npm install --save-dev @mean-expert/loopback-sdk-builder
````

# Documentation

[LINK TO WIKI DOCUMENTATION](https://github.com/mean-expert-official/loopback-sdk-builder/wiki)

# Features

- Support for Angular 2 (Final API w/ NgModules & Backwards compatibility < RC5).
- Support for TypeScript (Fully Typed).
- Built in Interfaces and Models.
- Extendable Models for custom logic.
- Enables Support for Real-Time Applications [loopback-component-pubsub](https://www.npmjs.com/package/loopback-component-pubsub)
- Built in LoopBack Authentication.
- Built in Support for LoopBack Query Language [Querying Data](https://docs.strongloop.com/display/public/LB/Querying+data)
- Built in API Servics.
- Built in Platform Specific Drivers (Angular2 for web, NativeScript2, [~~Angular Universal~~](https://github.com/mean-expert-official/loopback-sdk-builder/issues/36)).
- Built in CLI Tool for builder.
- Built in Logger Service.
- Blacklist mechanism to select which models or methods generate.
- Ability to point models to different url domains (not global baseUrl)
- IO Heartbeating to avoid disconnections.
- Small foot print 100k per generated SDK (Will increase depending on number of models).

# Contact

Discuss features and ask questions on [@johncasarrubias at Twitter](https://twitter.com/johncasarrubias).
