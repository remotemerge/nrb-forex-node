import { test, assert } from 'vitest';
import { DateRangeRate } from '../dist/types';
import { dateRangeRate } from '../dist/nrb-forex.js';

test('it contains multiple days records', async () => {
  const res = <DateRangeRate>await dateRangeRate({
    from: '2024-02-02',
    to: '2024-02-10',
    page: 1,
    perPage: 5,
  });

  assert.equal(res.payload.length > 0, true);
});

test('it contains a rate for KRW', async () => {
  const res = <DateRangeRate>await dateRangeRate({
    from: '2024-02-02',
    to: '2024-02-10',
    page: 1,
    perPage: 5,
  });

  const [firstData] = res.payload;
  const koreanRate = firstData.rates.find(
    (rate) => rate.currency.iso3 === 'KRW',
  );

  assert.equal(koreanRate!.currency.iso3, 'KRW');
});
