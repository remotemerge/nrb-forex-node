import { test, expect } from 'bun:test';
import type { StandardRate } from '../src/types';
import { liveRate } from '../src';

test('it contains multiple rates', async () => {
  const res = <StandardRate>await liveRate();
  expect(res.rates!.length > 0).toBe(true);
});

test('it contains a rate for USD', async () => {
  const res = <StandardRate>await liveRate();
  const usdRate = res.rates!.find((rate) => rate.currency.iso3 === 'USD');
  expect(usdRate!.currency.iso3).toBe('USD');
});

test('it contains a rate for EUR', async () => {
  const res = <StandardRate>await liveRate('EUR');
  expect(res.rate!.currency.iso3).toBe('EUR');
});
