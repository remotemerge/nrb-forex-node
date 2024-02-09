import { apiUrl } from './helper/config';
import { apiError } from './helper/message';
import { DateRate, StandardRate } from './types';

const liveRate = async (
  inputIso3 = '',
): Promise<StandardRate | StandardRate[]> => {
  const res = await fetch(`${apiUrl}/app-rate`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Load the data from the response
  const data = <StandardRate[]>await res.json();

  // Filter the data based on the iso3 parameter
  if (inputIso3) {
    const [match] = data.filter(
      (rate) => rate.iso3.toUpperCase() === inputIso3.toUpperCase(),
    );
    return match;
  }
  return data;
};

const dayRate = async (
  inputDate: string,
  inputIso3 = '',
): Promise<StandardRate | StandardRate[]> => {
  const res = await fetch(`${apiUrl}/rate?date=${inputDate}`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Load the data from the response
  const dayRes = <DateRate>await res.json();

  // Extract date data
  const { date, published_on, modified_on, rates } = dayRes.data.payload;

  // Merge the date with rates
  const data = rates.map(({ buy, sell, currency }) => ({
    ...currency,
    ...{ buy: +buy, sell: +sell },
    ...{ date, published_on, modified_on },
  }));

  // Filter the data based on the iso3 parameter
  if (inputIso3) {
    const [match] = data.filter(
      (rate) => rate.iso3.toUpperCase() === inputIso3.toUpperCase(),
    );
    return match;
  }
  return data;
};

export { liveRate, dayRate };
