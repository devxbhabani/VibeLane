const API_URL =
	import.meta.env.VITE_API_BASE_URL ||
	import.meta.env.VITE_API_URL ||
	"http://localhost:5000/api/v1";

// get auth headers
const getAuthHeaders = () => {
	const token =
		localStorage.getItem("vibelane_token") ||
		localStorage.getItem("token");
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
};

export const fetchAllOrders = async () => {
	const res = await fetch(`${API_URL}/admin/orders`, {
		method: "GET",
		headers: getAuthHeaders(),
	});
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
	return data.orders || [];
};

export const updateOrderStatusApi = async (orderId, status) => {
	const res = await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
		method: "PUT",
		headers: getAuthHeaders(),
		body: JSON.stringify({ status }),
	});

	const data = await res.json();
	if (!res.ok) throw new Error(data.message || "Failed to update status");
	return data.order;
};
