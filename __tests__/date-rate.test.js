import { test } from 'vitest';
import assert from 'assert';
import { dateRate } from '../dist/nrb-forex.js';

test('it contains multiple rates', () => {
  dateRate({ date: '2024-02-10' }).then((data) => {
    assert.equal(data.rates.length > 0, true);
  });
});

test('it contains a rate for CHF', () => {
  dateRate({ date: '2024-02-10' }).then((data) => {
    assert.equal(
      data.rates.find((rate) => rate.currency === 'CHF'),
      true,
    );
  });
});

test('it contains a rate for MYR', () => {
  dateRate({ date: '2024-02-10', iso3: 'MYR' }).then((data) => {
    assert.equal(data.rate.currency === 'MYR', true);
  });
});
