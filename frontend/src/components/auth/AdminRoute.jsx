import React from "react";
import { useApp } from "../../context/AppContext";
import { Outlet, Navigate } from "react-router-dom";

function AdminRoute() {
	const { user, loading } = useApp();
	if (loading) return <div>Loading...</div>;
	// Must be logged in AND have role === 'admin'
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (user.role !== "admin") {
		return <Navigate to="/" replace />;
	}
	return <Outlet />;
}

export default AdminRoute;
