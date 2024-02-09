interface ApiCurrencyInfo {
  iso3: string;
  name: string;
  unit: number;
}

interface ApiDateInfo {
  date: string;
  published_on: string;
  modified_on: string;
}

interface ApiBuySellInfo {
  buy: number;
  sell: number;
}

export interface ApiLiveRate
  extends ApiDateInfo,
    ApiCurrencyInfo,
    ApiBuySellInfo {}

export interface ApiDateRate {
  data: {
    payload: ApiDateInfo & {
      rates: Array<{ currency: ApiCurrencyInfo } & ApiBuySellInfo>;
    };
  };
}

export interface ApiDateRangeRate {
  data: {
    payload: ApiDateInfo &
      {
        rates: Array<{ currency: ApiCurrencyInfo } & ApiBuySellInfo>;
      }[];
  };
  pagination: { page: number; pages: number };
}

// Range query parameters
export interface RangeQuery {
  from: string;
  to: string;
  page: number;
  perPage: number;
}

// Response for single currency filter
export type StandardRate = ApiDateInfo & {
  rate?: { currency: ApiCurrencyInfo } & ApiBuySellInfo;
  rates?: Array<{ currency: ApiCurrencyInfo } & ApiBuySellInfo>;
};

// Response for all currencies
export type DateRangeRate = {
  payload: ApiDateInfo &
    {
      rates: Array<{ currency: ApiCurrencyInfo } & ApiBuySellInfo>;
    }[];
  pagination: { page: number; total: number };
};
