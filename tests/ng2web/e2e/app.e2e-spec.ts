import { Ng2webPage } from './app.po';

describe('ng2web App', () => {
  let page: Ng2webPage;

  beforeEach(() => {
    page = new Ng2webPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
