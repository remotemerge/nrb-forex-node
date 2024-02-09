/**
 * Set NRB API URL
 */
const { PROD: appEnv } = import.meta.env;
let { VITE_NRB_API_URL: apiUrl } = import.meta.env;

if (!appEnv) {
  apiUrl = '/api/forex/v1';
}

export { apiUrl };
