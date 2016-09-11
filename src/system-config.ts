/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'moment': 'vendor/moment/moment.js',
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  'ng2-translate': 'vendor/ng2-translate',
  'angular2-fontawesome': 'vendor/angular2-fontawesome',
  '@ngrx': 'vendor/@ngrx'
};

/** User packages configuration. */
const packages: any = {
  'rxjs': {main: 'Rx'},
  '@angular/core': {main: 'bundles/core.umd.min.js'},
  '@angular/common': {main: 'bundles/common.umd.min.js'},
  '@angular/compiler': {main: 'bundles/compiler.umd.min.js'},
  '@angular/platform-browser': {main: 'bundles/platform-browser.umd.min.js'},
  '@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'},
  '@angular/http': {main: 'bundles/http.umd.min.js'},
  'ng2-bootstrap': { defaultExtension: 'js' },
  'ng2-translate': { defaultExtension: 'js' },
  'angular2-fontawesome': { defaultExtension: 'js' },
  '@ngrx/core': {
    main: 'index.js',
    format: 'cjs'
   },
   '@ngrx/store': {
      main: 'index.js',
      format: 'cjs'
    },
   '@ngrx/effects': {
     main: 'index.js',
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
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/forms',
  // Thirdparty barrels.
  'rxjs',
  'zone.js',
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
