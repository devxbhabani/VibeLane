const API_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

// fetch user profile
export const getUserProfile = async (userId) => {
	const res = await fetch(`${API_URL}/user/${userId}/profile`);
	const data = await res.json();
	if (!res.ok)
		throw new Error(data.error || data.message || "Failed to load profile.");
	return data.user;
};

// update user profile
export const updateUserProfile = async (userId, profileData) => {
	const res = await fetch(`${API_URL}/user/${userId}/profile`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(profileData),
	});

	const data = await res.json();
	if (!res.ok)
		throw new Error(
			data.error || data.message || "Failed to update profile.",
		);
	return data.user;
};

// fetch past orders for this particulat user
export const getUserOrders = async (userId) => {
	const res = await fetch(`${API_URL}/user/${userId}/orders`);
	const data = await res.json();
	if (!res.ok)
		throw new Error(data.error || data.message || "Failed to load orders");
	return data.orders || [];
};

// store new order on checkout
export const createUserOrder = async (orderPayload) => {
	const res = await fetch(`${API_URL}/user/orders`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(orderPayload),
	});
	const data = await res.json();
	if (!res.ok)
		throw new Error(data.error || data.message || "Failed to record order");
	return data.order;
};
