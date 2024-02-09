### Installation

To integrate the package seamlessly into your project, you can install it via npm or yarn. Execute the following command using npm:

```bash
npm install @sapkotamadan/nrb-forex
```

or using yarn:

```bash
yarn add @sapkotamadan/nrb-forex
```

### Live Exchange Rates

Accessing realtime exchange rates is vital for many financial applications. With this package, you can effortlessly fetch live exchange rates by invoking the `liveRate()` function, you instantly receive current exchange rates for various currencies. This functionality is crucial for applications requiring dynamic currency conversion, such as e-commerce platforms, financial dashboards, and travel booking systems.

```javascript
import { liveRate } from '@sapkotamadan/nrb-forex';

liveRate().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

### Exchange Rates for a Specific Date

In certain scenarios, you may need to retrieve historical exchange rates for a specific date. This package provides a convenient solution for such requirements. Utilizing the `dateRate()` function, you can effortlessly obtain the exchange rate for any past date by specifying the desired date. This feature is invaluable for financial analysis, accounting applications, and historical data visualization, enabling users to track currency fluctuations over time accurately.

```javascript
import { dateRate } from '@sapkotamadan/nrb-forex';

dateRate({ date: '2024-02-09', iso3: 'USD' }).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

### Exchange Rate for a Date Range

For more comprehensive analysis or reporting purposes, you might need to gather exchange rates within a specified date range. The package offers seamless support for fetching exchange rates over a custom date range using the `dateRangeRate()` function. By specifying the start and end dates, along with optional parameters like pagination, you can retrieve a series of exchange rates tailored to your requirements. This functionality is particularly beneficial for generating financial reports, conducting trend analysis, and developing forecasting models, empowering users to derive valuable insights from historical currency data.

```javascript
import { dateRangeRate } from '@sapkotamadan/nrb-forex';

dateRangeRate({ from: '2024-02-02', to: '2024-02-09', page: 1, perPage: 5 }).then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

The sample response for the `dateRangeRate()` function is as follows:

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
    {
      "date": "2024-02-09",
      "published_on": "2024-02-09 00:00:11",
      "modified_on": "2024-02-08 17:26:11",
      "rates": [
        {
          "currency": {
            "iso3": "USD",
            "name": "U.S. Dollar",
            "unit": 1
          },
          "buy": "132.44",
          "sell": "133.04"
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