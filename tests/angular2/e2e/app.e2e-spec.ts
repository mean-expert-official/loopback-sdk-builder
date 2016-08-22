import { Angular2Page } from './app.po';

describe('angular2 App', function() {
  let page: Angular2Page;

  beforeEach(() => {
    page = new Angular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
