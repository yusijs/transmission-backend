export const API_URL = (window.location.port === '4200') ? 'http://localhost:3000/api/' : '/api/';
export const API_KEY = localStorage.getItem('api_key');
