import ducks from '..';

describe('Ducks tests', () => {
  const reducersRoot = ducks(
    { phoneData: { transactions: [], loading: false } },
    { type: null }
  );

  it('Should contain phoneData reducer', () => {
    expect(reducersRoot).toHaveProperty('phoneData');
  });
});
