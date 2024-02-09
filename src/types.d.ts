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

export interface DateRate extends DateInfo {
  data: {
    payload: {
      rates: ({ currency: CurrencyInfo } & BuySellInfo)[];
    };
  };
}

export interface DateRangeRate extends DateInfo {
  data: {
    payload: {
      rates: ({ currency: CurrencyInfo } & BuySellInfo)[];
    }[];
  };
}

export type StandardRate = DateInfo & CurrencyInfo & BuySellInfo;
