import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { InstangularAppComponent } from '../app/instangular.component';

beforeEachProviders(() => [InstangularAppComponent]);

describe('App: Instangular', () => {
  it('should create the app',
      inject([InstangularAppComponent], (app: InstangularAppComponent) => {
    expect(app).toBeTruthy();
  }));

});
