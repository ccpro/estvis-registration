import { EstvisRegisterAPage } from './app.po';

describe('estvis-register-a App', () => {
  let page: EstvisRegisterAPage;

  beforeEach(() => {
    page = new EstvisRegisterAPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
