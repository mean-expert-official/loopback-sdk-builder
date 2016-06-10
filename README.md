[![NPM](https://nodei.co/npm/loopback-sdk-builder.png?stars&downloads)](https://nodei.co/npm/loopback-sdk-builder/) [![NPM](https://nodei.co/npm-dl/loopback-sdk-builder.png)](https://nodei.co/npm/loopback-sdk-builder/)


LoopBack SDK Builder
==================

**NOTE: The loopback-sdk-builder module supersedes [loopback-sdk-angular](https://www.npmjs.org/loopback-sdk-angular). Please update your package.json accordingly.**

The LoopBack SDK Builder is a fork of the official `loopback-sdk-angular` extended by the community and maintained by [Jonathan Casarrubias](http://twitter.com/johncasarrubias).

**IMPORTANT** This is in active development, currently nativescript is the most mature version of the generator.

# Fork Reasons

Since the launch of [Angular 2 - Beta (now RC)](http://angular.io) the community has been requesting support for this version of the framework with a really slow response from the `StrongLoop Team` with many doubts if they will continue supporting the generator.

[Read Here The GitHub Thread](https://github.com/strongloop/loopback-sdk-angular/issues/188)

Also, the official proposed solution does not seems to be fully compatible with todays needs. For instance, the "same" Angular 2 SDK won't work the same depending on the environment you are running (NativeScript, Web, AngularUniversal).

Since Angular 2 does not rely on a browser DOM, the SDK implementations may be different according the environment.

[Read about the New Angular 2 Ecosystem](https://t.co/DrV18TztdR)

# Coincidences

The client is dynamic, in other words it automatically includes all the
LoopBack models and methods you've defined on your server.
You don't have to manually write any static code.

See the official [LoopBack AngularJS SDK
documentation](http://docs.strongloop.com/display/LB/AngularJS+JavaScript+SDK)
for more information.

# Differences

With the `loopback-sdk-builder` you can create Software Development Kits for the different environments you can run Angular.
#### Angular 2 (TypeScript)

- Angular 2 for Web: $ lb-ng server/server.js path/to/app/sdk/intex.ts -l angular2 (Working but not optimal and not web sockets)
- Angular Universal: $lb-ng server/server.js path/to/app/sdk/intex.ts -l universal (TODO)
- NativeScript 2: $ lb-ng server/server.js path/to/app/sdk/intex.ts -l nativescript2 (In Active Development)
  
In the other hand, currently the `LoopBack SDK for Nativescript2` natively implements Socket communication when implementing the [loopback-component-pubsub](https://www.npmjs.com/package/loopback-component-pubsub) module.

In the near future I will be adding native support for socket communication over web platforms.

# Installation

```sh
$ cd to/api/project
$ npm install --save-dev loopback-sdk-builder-cli loopback-sdk-builder
```

# Use

```sh
$ cd to/api/project
$ ./node_modules/.bin/lb-ng server/server path/to/client/sdk/folder/index.ts -l [nativescript2 | angular2]
```

# Optional Use

Add a script within package.json

```json
{
  "scripts": {
    "build:sdk": "./node_modules/.bin/lb-ng server/server path/to/client/sdk/folder/index.ts -l [nativescript2 | angular2]"
  }
}
```

#### then:

```sh
$ cd to/api/project
$ npm run build:sdk
```

Awesome you now can build SDK for different platforms!!! 

# TODO

- Finish NativeScript Generator (Most Active development)
- Implement equivalent functionality from NativeScript2 to Angular2 for web (WebSockets and LoopBackConfig).
- Start working in version valid for Angular Universal
- Redux and ngrx support
- React Support

## Tutorials

[The Ultimate Guide for Building Real Time Applications](http://mean.expert/2016/06/09/angular-2-ultimate-real-time/)
[StrongLoop - NativeScript 2 Todo Tutorial](https://t.co/7YobnH5Iil) [@johncasarrubias](http://twitter.com/johncasarrubias)

## Mailing List

Discuss features and ask questions on [Twitter](https://twitter.com/johncasarrubias).
