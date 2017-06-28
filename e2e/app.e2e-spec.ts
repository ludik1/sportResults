import { SportResultsPage } from './app.po';

describe('sport-results App', function() {
  let page: SportResultsPage;

  beforeEach(() => {
    page = new SportResultsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
