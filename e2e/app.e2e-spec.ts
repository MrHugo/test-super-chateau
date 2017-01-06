import { LastSuperChateauPage } from './app.po';

describe('last-super-chateau App', function() {
  let page: LastSuperChateauPage;

  beforeEach(() => {
    page = new LastSuperChateauPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
