import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { copyFile, mkdir, writeFile } from 'fs/promises';

// use vars from package config
const pc = JSON.parse(readFileSync(`${resolve()}/package.json`, 'utf8'));
const { name, version, description, license, author, repository, bugs } = pc;

// configs for npm deployment
const configs = {
  name,
  version,
  description,
  private: pc.private,
  license,
  author,
  keywords: [
    'Bank Exchange Rates',
    'Central Bank Nepal',
    'Daily Live Rates',
    'Foreign Money Exchange',
    'Historical Data',
    'Interbank Market Rates',
    'Monthly Forecasts',
    'NRB Forex API',
    'Nepal Bank Exchange Rates',
    'Nepal Currency Conversion',
    'Nepal Currency Exchange Services',
    'Nepal Daily Exchange Rates',
    'Nepal Foreign Currency Conversion',
    'Nepal Foreign Exchange Rate',
    'Nepal Forex Services',
    'Nepal Money Transfer',
    'Nepal Online Currency Exchange',
    'Nepal Rastra Bank',
    'Rupee Exchange Rates',
  ],
  repository,
  bugs,
  engines: { node: '>=18.0.0' },
  types: 'index.d.ts',
  exports: {
    '.': { require: './nrb-forex.cjs', import: './nrb-forex.js' },
  },
  scripts: {
    start: 'echo "Thanks for using the package 🎉🎉🎉"',
    test: 'echo "Error: no test specified" && exit 1',
  },
};

// generate package.json in dist
const buildPath = join(resolve(), 'dist');
await mkdir(buildPath, { recursive: true });
await writeFile(
  join(buildPath, 'package.json'),
  JSON.stringify(configs),
  'utf-8',
);

// copy static files
await copyFile('.npmrc', `${buildPath}/.npmrc`);
await copyFile('README.md', `${buildPath}/README.md`);
await copyFile('LICENSE', `${buildPath}/LICENSE`);
