import { test, assert } from 'vitest';
import { StandardRate } from '../dist/types';
import { liveRate } from '../dist/nrb-forex.js';

test('it contains multiple rates', async () => {
  const res = <StandardRate>await liveRate();
  assert.equal(res.rates!.length > 0, true);
});

test('it contains a rate for USD', async () => {
  const res = <StandardRate>await liveRate();
  const usdRate = res.rates!.find((rate) => rate.currency.iso3 === 'USD');
  assert.equal(usdRate!.currency.iso3, 'USD');
});

test('it contains a rate for EUR', async () => {
  const res = <StandardRate>await liveRate('EUR');
  assert.equal(res.rate!.currency.iso3, 'EUR');
});
