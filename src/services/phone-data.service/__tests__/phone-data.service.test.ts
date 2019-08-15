import PhoneDataService from '../phone-data.service';

describe('Phone Data service tests', () => {
  it('Should load asynchronously some mocked data', async () => {
    const data = await PhoneDataService.fetch();

    expect(data.length).toBeGreaterThan(0);
  });
});
