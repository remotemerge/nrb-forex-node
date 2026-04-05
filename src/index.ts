import type {
  ApiDateRangeRate,
  ApiDateRate,
  ApiLiveRate,
  DateRangeRate,
  RangeQuery,
  StandardRate,
} from './types';

const apiUrl = process.env.NRB_API_URL || '/api/forex/v1';

const apiError = 'The NRB API is not available or the request failed.';

/**
 * Fetches the latest currency exchange rates from Nepal Rastra Bank.
 *
 * @param currencyCode - ISO 4217 currency code (e.g., 'USD', 'EUR'). If omitted, returns all available rates.
 * @returns Exchange rate(s) with date and timestamp information.
 * @throws Error if the API request fails.
 */
const liveRate = async (currencyCode = ''): Promise<StandardRate> => {
  const response = await fetch(`${apiUrl}/app-rate`);

  if (!response.ok) {
    throw new Error(apiError);
  }

  const apiResponse = <ApiLiveRate[]>await response.json();
  const [{ date, published_on, modified_on }] = apiResponse;

  const formattedRates = apiResponse.map(({ iso3, name, unit, buy, sell }) => {
    return { currency: { iso3, name, unit }, buy, sell };
  });

  if (currencyCode) {
    const matchedRate = formattedRates.find(
      (rate) => rate.currency.iso3.toUpperCase() === currencyCode.toUpperCase(),
    );
    return { date, published_on, modified_on, rate: matchedRate };
  }

  return { date, published_on, modified_on, rates: formattedRates };
};

/**
 * Fetches currency exchange rates for a specific date from Nepal Rastra Bank.
 *
 * @param params - Query parameters for the date-specific rate lookup.
 * @param params.date - Date in 'YYYY-MM-DD' format.
 * @param params.iso3 - ISO 4217 currency code (e.g., 'USD', 'EUR'). If omitted, returns all rates for the date.
 * @returns Exchange rate(s) for the specified date.
 * @throws Error if the API request fails.
 */
const dateRate = async ({
  date,
  iso3: currencyCode = '',
}: {
  date: string;
  iso3?: string;
}): Promise<StandardRate> => {
  const response = await fetch(`${apiUrl}/rate?date=${date}`);

  if (!response.ok) {
    throw new Error(apiError);
  }

  const apiResponse = <ApiDateRate>await response.json();
  const {
    date: rateDate,
    published_on,
    modified_on,
    rates,
  } = apiResponse.data.payload;

  if (currencyCode) {
    const matchedRate = rates.find(
      (rate) => rate.currency.iso3.toUpperCase() === currencyCode.toUpperCase(),
    );
    return { date: rateDate, published_on, modified_on, rate: matchedRate };
  }

  return { date: rateDate, published_on, modified_on, rates };
};

/**
 * Fetches currency exchange rates for a date range from Nepal Rastra Bank.
 *
 * @param params - Query parameters for the date range lookup.
 * @param params.from - Start date in 'YYYY-MM-DD' format.
 * @param params.to - End date in 'YYYY-MM-DD' format.
 * @param params.page - Page number for paginated results (default: 1).
 * @param params.perPage - Number of records per page (default: 10).
 * @returns Paginated list of exchange rates for the specified date range.
 * @throws Error if the API request fails.
 */
const dateRangeRate = async ({
  from,
  to,
  page = 1,
  perPage = 10,
}: RangeQuery): Promise<DateRangeRate> => {
  const queryParams = `from=${from}&to=${to}&page=${page}&per_page=${perPage}`;
  const response = await fetch(`${apiUrl}/rates?${queryParams}`);

  if (!response.ok) {
    throw new Error(apiError);
  }

  const apiResponse = <ApiDateRangeRate>await response.json();
  const { pages } = apiResponse.pagination;
  const { payload } = apiResponse.data;

  return { payload, pagination: { page, total: pages } };
};

export { liveRate, dateRate, dateRangeRate };
