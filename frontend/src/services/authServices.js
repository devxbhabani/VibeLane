const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const signupUser = async ({ name, email, password }) => {
	const res = await fetch(`${API_URL}/auth/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email, password }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || data.message || "Signup failed");
	return data;
};

export const verifyotpUser = async ({ email, otp }) => {
	const res = await fetch(`${API_URL}/auth/verifyotp`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, otp }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || data.message || "OTP verification failed");
	return data;
};

export const loginUser = async ({ email, password }) => {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.error || data.message || "Login failed");
	return data;
};
