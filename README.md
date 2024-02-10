# NRB Forex API

[![Package](https://img.shields.io/npm/v/@sapkotamadan/nrb-forex?logo=npm)](https://www.npmjs.com/package/@sapkotamadan/nrb-forex)
![Build](https://img.shields.io/github/actions/workflow/status/remotemerge/nrb-forex-node/production.yml?logo=github)
![Downloads](https://img.shields.io/npm/dt/@sapkotamadan/nrb-forex)
![License](https://img.shields.io/npm/l/@sapkotamadan/nrb-forex)

The **NRB Forex API** package provides a simple and intuitive interface for accessing exchange rates published by the Nepal Rastra Bank (NRB). It offers a range of functions to retrieve live exchange rates, historical exchange rates for a specific date, and exchange rates within a custom date range. This package is designed to facilitate seamless integration of NRB exchange rates into various financial applications, such as accounting software, e-commerce platforms, and financial dashboards.

<hr />

### Installation

You can add this package to your project using npm or yarn. Run one of the following commands:

```bash
npm install @sapkotamadan/nrb-forex
```

or if you prefer yarn:

```bash
yarn add @sapkotamadan/nrb-forex
```

or if you prefer pnpm:

```bash
pnpm add @sapkotamadan/nrb-forex
```

<hr />

### Live Exchange Rates

Accessing realtime exchange rates is vital for many financial applications. With this package, you can effortlessly fetch live exchange rates by invoking the `liveRate` function, you instantly receive current exchange rates for various currencies. This functionality is crucial for applications requiring dynamic currency conversion, such as e-commerce platforms, financial dashboards, and travel booking systems.

```javascript
import { liveRate } from '@sapkotamadan/nrb-forex';

liveRate().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

The sample response for the `liveRate` function is as follows:

```json
{
  "date": "2024-02-10",
  "published_on": "2024-02-10 00:00:01",
  "modified_on": "2024-02-09 17:45:15",
  "rates": [
    {
      "currency": {
        "iso3": "USD",
        "name": "U.S. Dollar",
        "unit": 1
      },
      "buy": "132.56",
      "sell": "133.16"
    },
    "..."
  ]
}
```

Optionally, you can also specify the currency code to retrieve the exchange rate for a specific currency. The following example demonstrates how to fetch the exchange rate for the European Euro (EUR):

```javascript
import { liveRate } from '@sapkotamadan/nrb-forex';

liveRate({ iso3: 'EUR' }).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

The sample response for the `liveRate` function with a specified currency is as follows:

```json
{
  "date": "2024-02-10",
  "published_on": "2024-02-10 00:00:01",
  "modified_on": "2024-02-09 17:45:15",
  "rate": {
    "currency": {
      "iso3": "EUR",
      "name": "European Euro",
      "unit": 1
    },
    "buy": "142.74",
    "sell": "143.39"
  }
}
```

<hr />

### Exchange Rates for a Specific Date

In certain scenarios, you may need to retrieve historical exchange rates for a specific date. This package provides a convenient solution for such requirements. Utilizing the `dateRate` function, you can effortlessly obtain the exchange rate for any past date by specifying the desired date. This feature is invaluable for financial analysis, accounting applications, and historical data visualization, enabling users to track currency fluctuations over time accurately.

```javascript
import { dateRate } from '@sapkotamadan/nrb-forex';

dateRate({ date: '2024-02-10' }).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

The sample response for the `dateRate` function is as follows:

```json
{
  "date": "2024-02-10",
  "published_on": "2024-02-10 00:00:01",
  "modified_on": "2024-02-09 17:45:15",
  "rates": [
    {
      "currency": {
        "iso3": "USD",
        "name": "U.S. Dollar",
        "unit": 1
      },
      "buy": "132.56",
      "sell": "133.16"
    },
    "..."
  ]
}
```

Optionally, you can also specify the currency code to retrieve the exchange rate for a specific currency on the given date. The following example demonstrates how to fetch the exchange rate for the Swiss Franc (CHF) on February 10, 2024:

```javascript
import { dateRate } from '@sapkotamadan/nrb-forex';

dateRate({ date: '2024-02-10', iso3: 'CHF' }).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

The sample response for the `dateRate` function with a specified currency is as follows:

```json
{
  "date": "2024-02-10",
  "published_on": "2024-02-10 00:00:01",
  "modified_on": "2024-02-09 17:45:15",
  "rate": {
    "currency": {
      "iso3": "CHF",
      "name": "Swiss Franc",
      "unit": 1
    },
    "buy": "151.41",
    "sell": "152.10"
  }
}
```

<hr />

### Exchange Rate for a Date Range

For more comprehensive analysis or reporting purposes, you might need to gather exchange rates within a specified date range. The package offers seamless support for fetching exchange rates over a custom date range using the `dateRangeRate` function. By specifying the start and end dates, along with optional parameters like pagination, you can retrieve a series of exchange rates tailored to your requirements. This functionality is particularly beneficial for generating financial reports, conducting trend analysis, and developing forecasting models, empowering users to derive valuable insights from historical currency data.

```javascript
import { dateRangeRate } from '@sapkotamadan/nrb-forex';

dateRangeRate({ from: '2024-02-02', to: '2024-02-10', page: 1, perPage: 5 }).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

The sample response for the `dateRangeRate` function is as follows:

```json
{
  "payload": [
    {
      "date": "2024-02-02",
      "published_on": "2024-02-02 00:00:13",
      "modified_on": "2024-02-01 17:24:05",
      "rates": [
        {
          "currency": {
            "iso3": "USD",
            "name": "U.S. Dollar",
            "unit": 1
          },
          "buy": "132.45",
          "sell": "133.05"
        },
        "..."
      ]
    },
    "...",
    {
      "date": "2024-02-10",
      "published_on": "2024-02-10 00:00:01",
      "modified_on": "2024-02-09 17:45:15",
      "rates": [
        {
          "currency": {
            "iso3": "USD",
            "name": "U.S. Dollar",
            "unit": 1
          },
          "buy": "132.56",
          "sell": "133.16"
        },
        "..."
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "total": 2
  }
}
```

<hr />

### Legal Disclaimer

This package retrieves exchange rates from the Nepal Rastra Bank (NRB) and presents them as provided. Please note that exchange rates are subject to frequent changes without prior notice. The package does not warrant the accuracy, completeness, or reliability of the data. Users are strongly advised to seek guidance from a qualified financial advisor or conduct comprehensive research before relying on the exchange rates provided by this package for any financial decisions. The package author and contributors disclaim any liability for any loss or damage arising from the use of this package or the data it provides.