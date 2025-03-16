import axios from 'axios';

export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_NEST_API}`,
    headers: {
        'Content-Type': 'application/json',
    },
});
