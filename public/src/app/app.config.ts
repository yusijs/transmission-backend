export const API_URL = (window.location.port === '4200') ? 'http://localhost:3000/api/' : window.location.host;
export const API_KEY = localStorage.getItem('api_key');
