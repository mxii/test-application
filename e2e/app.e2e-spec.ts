import { TestApplicationPage } from './app.po';

describe('test-application App', function() {
  let page: TestApplicationPage;

  beforeEach(() => {
    page = new TestApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
