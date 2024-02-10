import { test, assert } from 'vitest';
import { StandardRate } from '../dist/types';
import { dateRate } from '../dist/nrb-forex.js';

test('it contains multiple rates', async () => {
  const res = <StandardRate>await dateRate({ date: '2024-02-10' });
  assert.equal(res.rates!.length > 0, true);
});

test('it contains a rate for CHF', async () => {
  const res = <StandardRate>await dateRate({ date: '2024-02-10' });
  const swissRate = res.rates!.find((rate) => rate.currency.iso3 === 'CHF');
  assert.equal(swissRate!.currency.iso3, 'CHF');
});

test('it contains a rate for MYR', async () => {
  const res = <StandardRate>await dateRate({ date: '2024-02-10', iso3: 'MYR' });
  assert.equal(res.rate!.currency.iso3, 'MYR');
});
