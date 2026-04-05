import { test, expect } from 'bun:test';
import type { StandardRate } from '../src/types';
import { dateRate } from '../src';

test('it contains multiple rates', async () => {
  const res = <StandardRate>await dateRate({ date: '2024-02-10' });
  expect(res.rates!.length > 0).toBe(true);
});

test('it contains a rate for CHF', async () => {
  const res = <StandardRate>await dateRate({ date: '2024-02-10' });
  const swissRate = res.rates!.find((rate) => rate.currency.iso3 === 'CHF');
  expect(swissRate!.currency.iso3).toBe('CHF');
});

test('it contains a rate for MYR', async () => {
  const res = <StandardRate>await dateRate({ date: '2024-02-10', iso3: 'MYR' });
  expect(res.rate!.currency.iso3).toBe('MYR');
});
