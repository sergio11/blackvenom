/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'app': 'src/app',
  'main': 'main.js',
  '@angular/core': 'vendor/@angular/core/bundles/core.umd.js',
  '@angular/common': 'vendor/@angular/common/bundles/common.umd.js',
  '@angular/compiler': 'vendor/@angular/compiler/bundles/compiler.umd.js',
  '@angular/platform-browser': 'vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
  '@angular/platform-browser-dynamic': 'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
  '@angular/http': 'vendor/@angular/http/bundles/http.umd.js',
  '@angular/router': 'vendor/@angular/router/bundles/router.umd.js',
  '@angular/forms': 'vendor/@angular/forms/bundles/forms.umd.js',
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  'ng2-translate': 'vendor/ng2-translate',
  '@ngrx': 'vendor/@ngrx',
  'moment': 'vendor/moment/min/moment.min.js'
};

/** User packages configuration. */
const packages: any = {
  'app': {main: 'main', defaultExtension: 'js'},
  'rxjs': {main: 'Rx.js', defaultExtension: 'js'},
  'ng2-bootstrap': { defaultExtension: 'js' },
  'ng2-translate': { defaultExtension: 'js' },
  '@ngrx/core': {
    main: 'bundles/core.min.umd.js',
    format: 'cjs'
  },
  '@ngrx/store': {
    main: 'bundles/store.min.umd.js',
    format: 'cjs'
  },
  '@ngrx/effects': {
    main: 'bundles/effects.min.umd.js',
    format: 'cjs'
  },
  '@ngrx/store-devtools': {
    main: 'bundles/store-devtools.min.umd.js',
    format: 'cjs'
  },
  '@ngrx/store-log-monitor': {
    main: 'bundles/store-log-monitor.min.umd.js',
    format: 'cjs'
  }
};


////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  // Thirdparty barrels.
  'rxjs',
  '@ngrx/core',
  '@ngrx/store',
  '@ngrx/effects',
  // App specific barrels.
  'app/',
  'app/components/',
  'app/components/+home/',
  'app/components/header',
  'app/components/shared',
  'app/accounts/',
  'app/accounts/+login/',
  'app/accounts/+signup/'

  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
