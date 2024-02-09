/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NRB_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface CurrencyInfo {
  iso3: string;
  name: string;
  unit: number;
}

interface DateInfo {
  date: string;
  published_on: string;
  modified_on: string;
}

interface BuySellInfo {
  buy: number;
  sell: number;
}

export type LiveRate = DateInfo & CurrencyInfo & BuySellInfo;

export interface DateRate {
  data: {
    payload: DateInfo & {
      rates: ({ currency: CurrencyInfo } & BuySellInfo)[];
    };
  };
}

export interface DateRangeRate {
  data: {
    payload: DateInfo &
      {
        rates: ({ currency: CurrencyInfo } & BuySellInfo)[];
      }[];
  };
}

// Response for single currency filter
export type StandardRate = DateInfo & { rate?: CurrencyInfo & BuySellInfo };

// Response for all currency
export type StandardRates = DateInfo & {
  rates?: (CurrencyInfo & BuySellInfo)[];
};
