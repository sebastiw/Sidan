import { ClWebPage } from './app.po';

describe('cl-web App', function() {
  let page: ClWebPage;

  beforeEach(() => {
    page = new ClWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
