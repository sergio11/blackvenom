import { InstangularPage } from './app.po';

describe('instangular App', function() {
  let page: InstangularPage;

  beforeEach(() => {
    page = new InstangularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
