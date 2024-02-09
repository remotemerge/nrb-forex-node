import { apiUrl } from './helper/config';
import { apiError } from './helper/message';
import { DateRate, LiveRate, StandardRate, StandardRates } from './types';

/**
 * @description Fetches live rates from the API
 * @param iso3
 */
const liveRate = async ({
  iso3 = '',
}: {
  iso3: string;
}): Promise<StandardRate | StandardRates> => {
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
  if (iso3) {
    const [rate] = rates.filter(
      (rate) => rate.iso3.toUpperCase() === iso3.toUpperCase(),
    );
    return { date, published_on, modified_on, rate };
  }
  return { date, published_on, modified_on, rates };
};

/**
 * @description Fetches rates for a specific date from the API
 * @param date
 * @param iso3
 */
const dayRate = async ({
  date: inputDate,
  iso3 = '',
}: {
  date: string;
  iso3: string;
}): Promise<StandardRate | StandardRates> => {
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
  if (iso3) {
    const [rate] = data.filter(
      (rate) => rate.iso3.toUpperCase() === iso3.toUpperCase(),
    );
    return { date, published_on, modified_on, rate };
  }
  return { date, published_on, modified_on, rates: data };
};

export { liveRate, dayRate };
