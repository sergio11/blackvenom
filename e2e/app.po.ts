export class InstangularPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('instangular-app h1')).getText();
  }
}
