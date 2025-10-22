const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = {
	async request(endpoint: string, options: RequestInit = {}) {
		const auth = JSON.parse(localStorage.getItem('auth') || '{}');
		const token = auth?.access_token;

		const config: RequestInit = {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(token && { Authorization: `Bearer ${token}` }),
				...options.headers,
			},
		};

		const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

		if (response.status === 401) {
			// Token expired, redirect to login
			localStorage.removeItem('auth');
			window.location.href = '/auth/signin';
			return;
		}

		return response;
	},
};
