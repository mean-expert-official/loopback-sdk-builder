const helpers = require('./../helpers');
exports.buildModuleImports = (models, isIo, driver) => {
  let imports = [
    { module: 'JSONSearchParams', from: './services/core/search.params'},
    { module: 'ErrorHandler', from: './services/core/error.service'},
    { module: 'LoopBackAuth', from: './services/core/auth.service'},
    { module: 'LoggerService', from: './services/custom/logger.service'},
    { module: 'SDKModels', from: './services/custom/SDKModels'},
    { module: 'InternalStorage, SDKStorage', from: './storage/storage.swaps'},
    { module: 'HttpModule', from: '@angular/http'},
    { module: 'CommonModule', from: '@angular/common'},
    { module: 'NgModule, ModuleWithProviders', from: '@angular/core'}
  ];

  switch (driver) {
    case 'ng2web':
      imports.push({ module: 'CookieBrowser', from: './storage/cookie.browser'});
      imports.push({ module: 'StorageBrowser', from: './storage/storage.browser'});
      if (isIo === 'enabled') {
        imports.push({ module: 'SocketBrowser', from: './sockets/socket.browser'});
      }
    break;
    case 'ng2universal':
      imports.push({ module: 'CookieBrowser', from: './storage/cookie.browser'});
      imports.push({ module: 'CookieNode', from: './storage/cookie.node'});
      imports.push({ module: 'StorageBrowser', from: './storage/storage.browser'});
        if (isIo === 'enabled') {
          imports.push({ module: 'SocketBrowser', from: './sockets/socket.browser'});
          imports.push({ module: 'SocketNode', from: './sockets/socket.node'});
        }
    break;
    case 'ng2native':
      imports.push({ module: 'StorageNative', from: './storage/storage.native'});
        if (isIo === 'enabled') {
          imports.push({ module: 'SocketNative', from: './sockets/socket.native'});
        }
    break;
  }


  if (isIo === 'enabled') {
    imports = imports.concat([
      { module: 'SocketDriver', from: './sockets/socket.driver'},
      { module: 'SocketConnection', from: './sockets/socket.connections'},
      { module: 'RealTime', from: './services/core/real.time'}
    ]);
  }

  Object.keys(models).forEach(modelName => {
    let name = helpers.capitalize(modelName);
    imports.push({ module: `${name}Api`, from: `./services/custom/${name}` });
  });

  return helpers.buildImports(imports);
}

  /**
   * @method buildNgProviders
   * @description
   * Define import statement for the SDK NG Modules
   */
  exports.buildNgProviders = (isIo) => {
    let imports = ['ErrorHandler'];
    if (isIo === 'enabled') { imports.push('SocketConnection'); }
    return imports.join(',\n    ');
  }

  /**
   * @method buildServiceDI
   * @description
   * Define import statement for the SDK NG Modules
   */
  exports.buildServiceDI = (isIo) => {
    let dependencies = ['@Inject(Http) protected http: Http'];
    if (isIo === 'enabled') {
        dependencies.push('@Inject(SocketConnection) protected connection: SocketConnection');
    }
    dependencies = dependencies.concat([
      '@Inject(SDKModels) protected models: SDKModels',
      '@Inject(LoopBackAuth) protected auth: LoopBackAuth',
      '@Inject(JSONSearchParams) protected searchParams: JSONSearchParams',
      '@Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler'
    ])
    return dependencies.join(',\n    ');
  }

  /**
   * @method buildBaseServiceImports
   * @description
   * Define import statement for the SDK Module
   **/
  exports.buildBaseServiceImports = (isIo) => {
    let imports = [
      { module: 'Injectable, Inject, Optional', from: '@angular/core'},
      { module: 'Http, Headers, Request, RequestOptions', from: '@angular/http'},
      { module: 'NgModule, ModuleWithProviders', from: '@angular/core'},
      { module: 'JSONSearchParams', from: './search.params'},
      { module: 'ErrorHandler', from: './error.service'},
      { module: 'LoopBackAuth', from: './auth.service'},
      { module: 'LoopBackConfig', from: '../../lb.config'},
      { module: 'LoopBackFilter, AccessToken', from: '../../models/BaseModels'},
      { module: 'SDKModels', from: '../custom/SDKModels'},
      { module: 'Observable', from: 'rxjs/Observable' },
      { module: 'Subject', from: 'rxjs/Subject' },
      { module: 'ErrorObservable', from: 'rxjs/observable/ErrorObservable' },
      { module: 'rxjs/add/operator/catch' },
      { module: 'rxjs/add/operator/map' },
    ];

    if (isIo === 'enabled') {
      imports.push({ module: 'SocketConnection', from: '../../sockets/socket.connections'});
    }

    return helpers.buildImports(imports);
  }

/**
 * @method buildObservableType
 * @description
 * Define observable type
 */
exports.buildObservableType = (model, method) => {
  let type = 'any';
  if (
    method.name.match(/(^createMany$|^find)/g) ||
    (
      typeof method.returns === 'object' &&
      (String(method.returns.type).toLowerCase() === 'array' || Array.isArray(method.returns.type))
    )
  ) type = `${model.name}[]`;
  if (method.name.match(/(^create$|upsert|^findBy|^findOne$)/g)) type = model.name;
  return type;
}

  /**
   * @method buildNgModuleImports
   * @description
   * Define import statement for the SDK NG Modules
   */
  exports.buildNgModuleImports = (models, environment, isIo, driver) => {
    let imports = ['LoopBackAuth', 'LoggerService', 'JSONSearchParams', 'SDKModels'];
    if (isIo === 'enabled') { imports.push('RealTime'); }
    Object.keys(models).forEach(modelName => imports.push(`${ helpers.capitalize(modelName) }Api`));
    switch (environment) {
      case 'browser':
        if (driver === 'ng2web' || driver === 'ng2universal') {
          imports.push('internalStorageProvider');
          imports.push('{ provide: SDKStorage, useClass: StorageBrowser }');
          if (isIo === 'enabled') {
            imports.push('{ provide: SocketDriver, useClass: SocketBrowser }');
          }
        }
      break;
      case 'node':
        if (driver === 'ng2universal') {
          imports.push('{ provide: InternalStorage, useClass: CookieNode }');
          if (isIo === 'enabled') {
            imports.push('{ provide: SocketDriver, useClass: SocketNode }');
          }
        }
      break;
      case 'nativescript':
        if (driver === 'ng2native') {
          imports.push('{ provide: InternalStorage, useClass: StorageNative }');
          imports.push('{ provide: SDKStorage, useClass: StorageNative }');
          if (isIo === 'enabled') {
            imports.push('{ provide: SocketDriver, useClass: SocketNative }');
          }
        }
      break;
    }
    return imports.join(',\n        ');
  }