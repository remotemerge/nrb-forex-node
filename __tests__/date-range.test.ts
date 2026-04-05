import { test, expect } from 'bun:test';
import type { DateRangeRate } from '../src/types';
import { dateRangeRate } from '../src';

test('it contains multiple days records', async () => {
  const res = <DateRangeRate>await dateRangeRate({
    from: '2024-02-02',
    to: '2024-02-10',
    page: 1,
    perPage: 5,
  });

  expect(res.payload.length > 0).toBe(true);
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

  expect(koreanRate!.currency.iso3).toBe('KRW');
});
