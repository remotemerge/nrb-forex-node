import { apiUrl } from './helper/config';
import { apiError } from './helper/message';
import { DateRate, LiveRate, StandardRate, StandardRates } from './types';

const liveRate = async (
  currency = '',
): Promise<StandardRate | StandardRates> => {
  const res = await fetch(`${apiUrl}/app-rate`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Load the data from the response
  const rateData = <LiveRate[]>await res.json();
  const [{ date, published_on, modified_on }] = rateData;

  const rates = rateData.map(({ iso3, name, unit, buy, sell }) => ({
    ...{ iso3, name, unit, buy: +buy, sell: +sell },
  }));

  // Filter the data based on the iso3 parameter
  if (currency) {
    const [rate] = rates.filter(
      (rate) => rate.iso3.toUpperCase() === currency.toUpperCase(),
    );
    return { date, published_on, modified_on, rate };
  }
  return { date, published_on, modified_on, rates };
};

const dayRate = async (
  inputDate: string,
  currency = '',
): Promise<StandardRate | StandardRates> => {
  const res = await fetch(`${apiUrl}/rate?date=${inputDate}`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Load the data from the response
  const rateData = <DateRate>await res.json();

  // Extract date data
  const { date, published_on, modified_on, rates } = rateData.data.payload;

  // Merge the date with rates
  const data = rates.map(({ buy, sell, currency }) => ({
    ...currency,
    ...{ buy: +buy, sell: +sell },
  }));

  // Filter the data based on the iso3 parameter
  if (currency) {
    const [rate] = data.filter(
      (rate) => rate.iso3.toUpperCase() === currency.toUpperCase(),
    );
    return { date, published_on, modified_on, rate };
  }
  return { date, published_on, modified_on, rates: data };
};

export { liveRate, dayRate };
