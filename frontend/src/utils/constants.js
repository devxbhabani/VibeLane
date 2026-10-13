const rawApiUrl = import.meta.env.VITE_API_BASE_URL || '/api/v1';
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');
export const APP_NAME = 'VibeLane';
