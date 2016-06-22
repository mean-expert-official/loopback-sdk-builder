[![NPM](https://nodei.co/npm/loopback-sdk-builder.png?stars&downloads)](https://nodei.co/npm/loopback-sdk-builder/) [![NPM](https://nodei.co/npm-dl/loopback-sdk-builder.png)](https://nodei.co/npm/loopback-sdk-builder/)


LoopBack SDK Builder
==================

The LoopBack SDK Builder is a community driven module forked from the official `loopback-sdk-angular` and maintained by [@johncasarrubias](http://twitter.com/johncasarrubias).

# Fork Reasons

Since the launch of [Angular 2 - Beta (now RC)](http://angular.io) the community has been requesting support for this version of the framework with a really slow response from the `StrongLoop Team` with many doubts if they will continue supporting the generator.

[Read Here The GitHub Thread](https://github.com/strongloop/loopback-sdk-angular/issues/188)

Also, the official proposed solution does not seems to be fully compatible with todays needs. For instance, the "same" Angular 2 SDK won't work the same depending on the environment you are running (NativeScript, Web, AngularUniversal).

Since Angular 2 does not rely on a browser DOM, the SDK implementations may be different according the environment.

[Read about the New Angular 2 Ecosystem](https://t.co/DrV18TztdR)

# Disclaimer

I really don't have any plan to support Angular 1, I'm not trying to compete with the official module.

If you want to build a SDK for Angular 1 please use the official.

[loopback-sdk-angular](https://www.npmjs.org/loopback-sdk-angular)

# Coincidences

The client is dynamic, in other words it automatically includes all the
LoopBack models and methods you've defined on your server.
You don't have to manually write any static code.

See the official [LoopBack AngularJS SDK
documentation](http://docs.strongloop.com/display/LB/AngularJS+JavaScript+SDK)
for more information.

# Features

- Built in LoopBack Authentication.
- Built in Interfaces and Models.
- Built in API Calls.
- Built in PubSub support for the [loopback-component-pubsub](https://www.npmjs.com/package/loopback-component-pubsub).
- Built in Platform Specific Drivers (Angular2 for web, NativeScript2, Angular Universal).
- Built in CLI Tool for builder.
- Built in Logger Service.
- Fully Typed (TypeScript).
- As small as 100k per generated SDK (Will increase depending on number of models).

# Installation

```sh
$ cd to/api/project
$ npm install --save-dev loopback-sdk-builder@2.0.0-beta10
```

# LoopBack SDK CLI Options

```sh
Options:
  -l, --library  Client's library (angular2, react <todo>, ...)                          [default: "angular2"]
  -d, --driver   Platform specific drivers (ng4web, nativescript2, ng2universal <todo>)  [default: "ng4web"]
  -i, --io       Enable PubSub functionality for loopback-component-pubsub               [default: "disabled"]
```

#### Client Requirements
The following package needs to be installed in your client application.

- [@angular/http](npmjs.com/package/@angular/http)
 
#### Generate Angular 2 SDK for Web 

The default options will create an Angular 2 SDK for Web.

```sh
$ ./node_modules/.bin/lb-sdk server/server.js /path/to/client/sdk
```

Is equivalent to

```sh
$ ./node_modules/.bin/lb-sdk server/server.js /path/to/client/sdk -l angular2 -d ng4web -i disabled
```

#### Generate NativeScript 2 SDK

```sh
$ ./node_modules/.bin/lb-sdk server/server.js /path/to/client/sdk -d nativescript2
```

Is equivalent to

```sh
$ ./node_modules/.bin/lb-sdk server/server.js /path/to/client/sdk -l angular2 -d nativescript2 -i disabled
```


## Enable Real Time Communication

The Angular2 and NativeScript generators currently implement socket connectivity when using [loopback-component-pubsub](https://www.npmjs.com/package/loopback-component-pubsub).

#### Requirements
The following package needs to be installed in your client application.

- [nativescript-socket.io](npmjs.com/package/nativescript-socket.io) when using the NativeScript2 version
- [socket.io-client](https://www.npmjs.com/package/socket.io-client) when using the Angular 2 for Web version

To enable you will need to add the `--io enabled` or `-i enabled` flag.

#### Angular 2 for Web 

```sh
$ ./node_modules/.bin/lb-sdk server/server.js /path/to/client/sdk -d ng4web -i enabled
```

#### NativeScript 2

```sh
$ ./node_modules/.bin/lb-sdk server/server.js /path/to/client/sdk -d nativescript2 -i enabled
```

# Optional Use

Add a script within package.json

```json
{
  "scripts": {
    "build:sdk": "./node_modules/.bin/lb-sdk server/server path/to/ng2-app/src/shared/sdk -d [ng4web | nativescript2] -i [enabled | disabled]"
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

- Start working in version valid for Angular Universal
- Redux and ngrx support
- React Support

## Tutorials

- [The Ultimate Guide for Building Real Time Applications](http://mean.expert/2016/06/09/angular-2-ultimate-real-time/)
- [StrongLoop - NativeScript 2 Todo Tutorial](https://t.co/7YobnH5Iil)

## Mailing List

Discuss features and ask questions on [Twitter](https://twitter.com/johncasarrubias).
