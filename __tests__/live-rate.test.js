import { test } from 'vitest';
import assert from 'assert';
import { liveRate } from '../dist/nrb-forex.js';

test('it contains multiple rates', () => {
  liveRate().then((data) => {
    assert.equal(data.rates.length > 0, true);
  });
});

test('it contains a rate for USD', () => {
  liveRate().then((data) => {
    assert.equal(
      data.rates.find((rate) => rate.currency === 'USD'),
      true,
    );
  });
});

test('it contains a rate for EUR', () => {
  liveRate('EUR').then((data) => {
    assert.equal(data.rate.currency === 'EUR', true);
  });
});
