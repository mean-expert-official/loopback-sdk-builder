const helpers = require('./../helpers');

exports.buildModuleImports = (models, isIo, driver) => {
  let imports = [
    { module: 'JSONSearchParams', from: './services/core/search.params' },
    { module: 'ErrorHandler', from: './services/core/error.service' },
    { module: 'LoopBackAuth', from: './services/core/auth.service' },
    { module: 'LoggerService', from: './services/custom/logger.service' },
    { module: 'SDKModels', from: './services/custom/SDKModels' },
    { module: 'InternalStorage, SDKStorage', from: './storage/storage.swaps' },
    { module: 'HttpModule', from: '@angular/http' },
    { module: 'CommonModule', from: '@angular/common' },
    { module: 'NgModule, ModuleWithProviders', from: '@angular/core' }
  ];

  switch (driver) {
    case 'ng2web':
      imports.push({ module: 'CookieBrowser', from: './storage/cookie.browser' });
      imports.push({ module: 'StorageBrowser', from: './storage/storage.browser' });
      if (isIo === 'enabled') {
        imports.push({ module: 'SocketBrowser', from: './sockets/socket.browser' });
      }
      break;
    case 'ng2universal':
      imports.push({ module: 'CookieBrowser', from: './storage/cookie.browser' });
      imports.push({ module: 'CookieNode', from: './storage/cookie.node' });
      imports.push({ module: 'StorageBrowser', from: './storage/storage.browser' });
      if (isIo === 'enabled') {
        imports.push({ module: 'SocketBrowser', from: './sockets/socket.browser' });
        imports.push({ module: 'SocketNode', from: './sockets/socket.node' });
      }
      break;
    case 'ng2native':
      imports.push({ module: 'StorageNative', from: './storage/storage.native' });
      imports.push({ module: 'NativeScriptHttpModule', from: 'nativescript-angular/http'});
      if (isIo === 'enabled') {
        imports.push({ module: 'SocketNative', from: './sockets/socket.native' });
      }
      break;
  }


  if (isIo === 'enabled') {
    imports = imports.concat([
      { module: 'SocketDriver', from: './sockets/socket.driver' },
      { module: 'SocketConnection', from: './sockets/socket.connections' },
      { module: 'RealTime', from: './services/core/real.time' }
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
    { module: 'JSONSearchParams', from: './search.params' },
    { module: 'ErrorHandler', from: './error.service' },
    { module: 'LoopBackAuth', from: './auth.service' },
    { module: 'LoopBackConfig', from: '../../lb.config' },
    { module: 'LoopBackFilter, AccessToken', from: '../../models/BaseModels' },
    { module: 'SDKModels', from: '../custom/SDKModels' },
    { module: 'Observable, Subject', from: 'rxjs' },
    { module: 'catchError, map', from: 'rxjs/operators' },
  ];

  if (isIo === 'enabled') {
    imports.push({ module: 'SocketConnection', from: '../../sockets/socket.connections' });
  }

  return helpers.buildImports(imports);
}

/**
 * @method buildNgModuleImports
 * @description
 * Define import statement for the SDK NG Modules
 */
exports.buildNgModuleImports = (models, environment, isIo, driver) => {
  let imports = ['LoopBackAuth', 'LoggerService', 'JSONSearchParams', 'SDKModels'];
  if (isIo === 'enabled') { imports.push('RealTime'); }
  Object.keys(models).forEach(modelName => imports.push(`${helpers.capitalize(modelName)}Api`));
  switch (environment) {
    case 'browser':
      if (driver === 'ng2web' ||  driver === 'ng2universal') {
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

/**
 * @method buildMethodParams
 * @description
 * Set which params should be defined for the given remote method
 */
exports.buildMethodParams = (model, methodName, params, isIo, models) => {
  //if (model.isUser && methodName === 'logout') return '';
  let output = new Array();
  let relations = helpers.getModelRelations(model);
  let availableClasses = relations.map((relationName, index) =>
    model.sharedClass.ctor.relations[relationName].targetClass
  );

  params = params.filter(param => {
    return !helpers.paramIsContext(param) && !helpers.paramIsFunction(param)
  });

  relations.forEach(relationName => {
    if (model.sharedClass.ctor.relations[relationName].modelThrough) {
      let throughName = helpers.capitalize(
        model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name
      );
      // Only add through models when they are Public
      if (models[throughName]) {
        availableClasses.push(helpers.capitalize(
          model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name
        ));
      }
    }
  }
  );
  if (isIo) params = params.filter(param => !param.arg.match(/(fk|data|options)/));
  params.forEach((param, i, arr) => {
    let type, isArray = false;
    if (param.type === 'object') {
      type = param.arg === 'filter' ? 'LoopBackFilter' : 'any';
    } else {
      type = param.type !== 'AccessToken' && param.type !== 'any'
        ? helpers.capitalize(param.type) : 'any';
    }
    if (!type.match(/(^any$|LoopBackFilter)/) && availableClasses.indexOf(type) < 0) {
      type = 'any';
    }
    let value = '';
    // Accept Array on createMany method.
    if (methodName.match(/createMany/) && param.arg === 'data') {
      isArray = true;
    }
    // Set default value, usually will be {}, but on login we include user
    // Should not be undefined or will create request issues
    if (!param.required && (model.isUser && methodName === 'login') && param.arg === 'include') {
      type = 'any';
      value = " = 'user'";
    } else if (type.match(/(any|LoopBackFilter)/)) {
      value = !param.required ? ` = ${isArray ? '[]' : '{}'}` : '';
    } else {
      value = !param.required ? ` = ${isArray ? `new Array<${type}>()` : `new ${type}()`}` : '';
    }
    output.push(`${param.arg}`);
  });

  // When login, there is a property not coming from LoopBack that is needed.
  // so we need to add a rememberMe property to temporal o permanent store the user
  if ((model.isUser && methodName === 'login')) {
    output.push(`rememberMe = true`);
  }

  // When login, there is a property not coming from LoopBack that is needed.
  // so we need to add a rememberMe property to temporal o permanent store the user
  // UPDATE: it seems it is now coming from loopback, so now is duplicated
  /*if ((model.isUser && methodName === 'login')) {
    output.push(`rememberMe: boolean = true`);
  }*/

  if (!isIo) {
    output.push(`customHeaders`);
  }
  return output.join(', ');
}

/**
 * @method buildServiceImports
 * @description
 * Define import statement for those model who are related to other scopes
 * IMPORTANT: This method have a very specific flow, changing it may create
 * multiple issues on multiple different use cases.
 */
exports.buildServiceImports = (model, loadAccessToken, isIo, models) => {
  let modelName = helpers.capitalize(model.name);
  let imports = [
    { module: 'SDKModels', from: './SDKModels' },
    { module: 'BaseLoopBackApi', from: '../core/base.service' },
    { module: 'LoopBackConfig', from: '../../lb.config' },
    {
      module: `LoopBackFilter, ${model.isUser ? `SDKToken${(loadAccessToken && model.isUser) ? ', AccessToken' : ''}` : ''}`,
      from: '../../models/BaseModels'
    },
    { module: 'JSONSearchParams', from: '../core/search.params' },
    { module: 'ErrorHandler', from: '../core/error.service' },
    { module: 'Observable, Subject', from: 'rxjs' },
    { module: modelName, from: `../../models/${modelName}` },
  ];
  if (isIo === 'enabled') {
    imports.push({ module: 'SocketConnection', from: '../../sockets/socket.connections' });
  }
  let loaded = {}; loaded[model.name] = true;
  helpers.getModelRelations(model).forEach((relationName, i) => {
    let targetClass = model.sharedClass.ctor.relations[relationName].targetClass;
    // It is imperative to check first for through models, else we may miss some
    // Through Models. This is because multiple relationships to the same model may have
    // different Through models, in the next validation we avoid duplicating models, which
    // can lead to miss some through models.
    // Finally we will be adding through models only if these are Public
    if (
      model.sharedClass.ctor.relations[relationName].modelThrough &&
      model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name !== 'Model' &&
      models[model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name]
    ) {
      let through = helpers.capitalize(model.sharedClass.ctor.relations[relationName].modelThrough.sharedClass.name);
      if (!loaded[through]) {
        loaded[through] = true;
        imports.push({ module: through, from: `../../models/${through}` });
      }
    }
    // Now and after the through model was included is the right time to verify if the current model
    // was loaded by another relationship, this way we don't duplicate the class during imports'
    if (!loaded[targetClass]) {
      loaded[targetClass] = true;
      imports.push({ module: targetClass, from: `../../models/${targetClass}` });
    }
  });

  return helpers.buildImports(imports);
}