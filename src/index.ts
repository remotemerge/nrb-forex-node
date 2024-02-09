import { apiUrl } from './helper/config';
import { apiError } from './helper/message';
import { DateRate, LiveRate, StandardRate, StandardRates } from './types';

/**
 * @description Fetches live rates from the API
 * @param currency
 */
const liveRate = async (
  currency = '',
): Promise<StandardRate | StandardRates> => {
  const res = await fetch(`${apiUrl}/app-rate`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Parsing the rate data from the response
  const rateData = <LiveRate[]>await res.json();
  const [{ date, published_on, modified_on }] = rateData;

  // Formatting rates data
  const rates = rateData.map(({ iso3, name, unit, buy, sell }) => ({
    ...{ iso3, name, unit, buy: +buy, sell: +sell },
  }));

  // Filtering rates based on the provided currency
  if (currency) {
    const [rate] = rates.filter(
      (rate) => rate.iso3.toUpperCase() === currency.toUpperCase(),
    );
    return { date, published_on, modified_on, rate };
  }
  return { date, published_on, modified_on, rates };
};

/**
 * @description Fetches rates for a specific date from the API
 * @param inputDate
 * @param currency
 */
const dayRate = async (
  inputDate: string,
  currency = '',
): Promise<StandardRate | StandardRates> => {
  const res = await fetch(`${apiUrl}/rate?date=${inputDate}`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Parsing the rate data from the response
  const rateData = <DateRate>await res.json();
  const { date, published_on, modified_on, rates } = rateData.data.payload;

  // Extracting and merging the rate data
  const data = rates.map(({ buy, sell, currency }) => ({
    ...currency,
    ...{ buy: +buy, sell: +sell },
  }));

  // Filtering rates based on the provided currency
  if (currency) {
    const [rate] = data.filter(
      (rate) => rate.iso3.toUpperCase() === currency.toUpperCase(),
    );
    return { date, published_on, modified_on, rate };
  }
  return { date, published_on, modified_on, rates: data };
};

export { liveRate, dayRate };
