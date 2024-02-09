/**
 * Set NRB API URL
 */
let apiUrl = '/api/forex/v1';
if (import.meta.env.PROD) {
  apiUrl = import.meta.env.VITE_NRB_API_URL;
}

export { apiUrl };
