import { apiUrl } from './config';
import {
  ApiDateRangeRate,
  ApiDateRate,
  ApiLiveRate,
  DateRangeRate,
  RangeQuery,
  StandardRate,
} from './types';

// Set generic error message
const apiError = 'The NRB API is not available or the request failed.';

/**
 * @description Fetches live rates from the API
 * @param iso3 - Currency code like 'USD'
 */
const liveRate = async (iso3 = ''): Promise<StandardRate> => {
  const res = await fetch(`${apiUrl}/app-rate`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Parsing the rate data from the response
  const rateData = <ApiLiveRate[]>await res.json();
  const [{ date, published_on, modified_on }] = rateData;

  // Formatting rates data
  const rates = rateData.map(({ iso3, name, unit, buy, sell }) => {
    return { currency: { iso3, name, unit }, buy, sell };
  });

  // Filtering rates based on the provided currency
  if (iso3) {
    const [rate] = rates.filter((rate) => {
      return rate.currency.iso3.toUpperCase() === iso3.toUpperCase();
    });
    return { date, published_on, modified_on, rate };
  }
  return { date, published_on, modified_on, rates };
};

/**
 * @description Fetches rates for a specific date from the API
 * @param date - Date to fetch rates in the format 'YYYY-MM-DD'
 * @param iso3 - Currency code like 'USD'
 */
const dateRate = async ({
  date: inputDate,
  iso3 = '',
}: {
  date: string;
  iso3?: string;
}): Promise<StandardRate> => {
  const res = await fetch(`${apiUrl}/rate?date=${inputDate}`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Parsing the rate data from the response
  const rateData = <ApiDateRate>await res.json();
  const { date, published_on, modified_on, rates } = rateData.data.payload;

  // Filtering rates based on the provided currency
  if (iso3) {
    const [rate] = rates.filter((rate) => {
      return rate.currency.iso3.toUpperCase() === iso3.toUpperCase();
    });
    return { date, published_on, modified_on, rate };
  }
  return { date, published_on, modified_on, rates };
};

/**
 * @description Fetches rates for a date range from the API
 * @param from - Start date in the format 'YYYY-MM-DD'
 * @param to - End date in the format 'YYYY-MM-DD'
 * @param page - Current page number
 * @param perPage - Number of items per page
 */
const dateRangeRate = async ({
  from,
  to,
  page = 1,
  perPage = 10,
}: RangeQuery): Promise<DateRangeRate> => {
  const params = `from=${from}&to=${to}&page=${page}&per_page=${perPage}`;
  const res = await fetch(`${apiUrl}/rates?${params}`);
  if (!res.ok) {
    throw new Error(apiError);
  }

  // Parsing the rate data from the response
  const resData = <ApiDateRangeRate>await res.json();
  const { pages } = resData.pagination;
  const { payload } = resData.data;

  return { payload, pagination: { page, total: pages } };
};

export { liveRate, dateRate, dateRangeRate };
